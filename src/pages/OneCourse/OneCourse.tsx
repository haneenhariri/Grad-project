import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { singleCourse } from "../../services/courses";
import { buyCourse } from "../../services/payment";
import star from "../../assets-webp/Star (3).webp";
import clock from "../../assets/icons/Clock.png";
import level from "../../assets/icons/bar-chart.png";
import file from "../../assets/icons/Notebook.png";
import divec from "../../assets/icons/Monitor.png";
import online from "../../assets-webp/Stack.webp";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { imgProfile } from "../../services/profileStd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export interface oneCourse
{
  id : number;
  title : string;
  description : string;
  duration: number;
  level : string;
  price : number;
  cover : string;
  course_language : string;
  instructor : 
  {
    id : number;
    name : string;
    profile_picture : string;
  };
  category :
  {
    id : number;
    name : string;
  };
  
}
export default function OneCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<oneCourse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { t } = useTranslation();
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState<boolean>(false);
  const lang = (localStorage.getItem("language") as "ar" | "en") || "en";

  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: `/oneCourse/${id}` } });
      return;
    }

    // التحقق مما إذا كان الطالب قد التحق بالكورس بالفعل
    if (isAlreadyEnrolled) {
      navigate(`/watch/${course?.id}`);
      return;
    }

    if (balance !== null && balance >= course?.price) {
      try {
        const response = await buyCourse(course.id);

        if (response.status === "success") {
          setPaymentMessage(response.message || "تم الدفع بنجاح");
          setIsSuccessfulPayment(true);
          setBalance(balance - course.price);
          setIsAlreadyEnrolled(true); // تحديث حالة الالتحاق
        } else {
          setPaymentMessage(response.message || "حدث خطأ أثناء معالجة الدفع.");
          setIsSuccessfulPayment(false);
        }
      } catch (error) {
        setPaymentMessage("خطأ في الاتصال بالخادم.");
        setIsSuccessfulPayment(false);
      }
    } else {
      setPaymentMessage("لا يوجد رصيد كافي في الحساب.");
      setIsSuccessfulPayment(false);
    }
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await imgProfile();
        setBalance(response.data.account.balance); // تحديث الرصيد من API

        // التحقق مما إذا كان الطالب مشترك بالفعل في هذا الكورس
        if (
          response.data.courses &&
          Array.isArray(response.data.courses) &&
          id
        ) {
          const isEnrolled = response.data.courses.some(
            (course: any) => course.id === Number(id)
          );
          setIsAlreadyEnrolled(isEnrolled);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const data = await singleCourse(Number(id), lang);
        setCourse(data);
      } catch (error) {
        setError("Error loading course");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchCourse();
  }, [id, isAuthenticated, lang]);

  const renderStars = (rating: number | null) => {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: Math.round(rating ?? 0) }, (_, index) => (
          <img key={index} src={star} alt="star" className="w-5 h-5" />
        ))}
      </div>
    );
  };
  const getAverageRating = (rates: { rate: number }[] = []) => {
    if (rates.length === 0) return 0;
    const total = rates.reduce((sum, r) => sum + r.rate, 0);
    return total / rates.length;
  };
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className=" pt-[108px] min-h-screen mt-10  pb-12 flex md:flex-row flex-col gap-6 px-4 lg:px-10 desktop:px-40">
        <div className=" md:w-3/4 w-full">
          <div>
            <h2 className=" lg:text-4xl md:text-xl text-lg font-semibold mb-6">
              {course?.title}
            </h2>
            <div className="mb-5 w-full flex justify-between items-center">
              <div className=" flex items-center gap-6">
                <img
                  className=" w-12 h-12 rounded-full"
                  src={`http://127.0.0.1:8000/storage/${course?.instructor.profile_picture}`}
                  alt=""
                />
                <p className=" flex flex-col text-gray-600 md:text-base text-sm font-semibold">
                  {t("Created by:")}{" "}
                  <span className=" text-black md:text-lg text-base">
                    {course?.instructor.name}
                  </span>
                </p>
              </div>
              <div className=" flex items-center gap-1.5">
                {renderStars(getAverageRating(course?.rates))}
                <span>{getAverageRating(course?.rates).toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={`http://127.0.0.1:8000/storage/${course?.cover}`}
              alt={course?.title}
              className=" w-full h-auto  mb-5 "
            />
          </div>
          <h3 className="mb-5 lg:text-2xl md:text-xl text-lg font-semibold">
            {t("Description")}
          </h3>
          <p className=" text-gray-800 lg:text-base text-sm">
            {course.description}
          </p>
        </div>
        {/* buy */}
        <div className=" shadow-sm bg-white  h-max rounded-sm w-full md:w-1/3">
          <div className="border-b  md:p-5 p-2.5">
            <div className="flex mb-2.5 justify-between items-center">
              <span className=" text-lg font-semibold">{course?.price}$</span>
            </div>
          </div>
          <div className="border-b  md:p-5 p-2.5">
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={clock} alt="clock" className=" md:w-5 w-4.5 " />
                <span className=" text-sm">{t("CourseDuration")}</span>
              </div>
              <span className=" text-sm text-gray-600">
                {course?.duration}{" "}
                {t("weeks")}
              </span>
            </div>
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={level} alt="clock" className=" md:w-5 w-4.5 " />
                <span className=" text-sm">{t("level")}</span>
              </div>
              <span className="text-sm text-gray-600">
                {t(`CoursesSection.levels.${course?.level}`)}
              </span>{" "}
            </div>
          </div>
          <div className="border-b md:p-5 p-2.5">
            {isAuthenticated ? (
              isAlreadyEnrolled ? (
                // إذا كان الطالب مسجل بالفعل، عرض زر المشاهدة
                <Link
                  to={`/watch/${course?.id}`}
                  className="w-full block text-center py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  {t("Watch Course")}
                </Link>
              ) : (
                // إذا لم يكن مسجل، عرض زر الدفع
                <button
                  onClick={handlePayment}
                  className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
                >
                  {t("Enroll Now")} - ${course?.price}
                </button>
              )
            ) : (
              // إذا لم يكن مسجل دخول، عرض زر تسجيل الدخول
              <Link
                to="/auth/login"
                state={{ from: `/oneCourse/${id}` }}
                className="w-full block text-center py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
              >
                {t("Login to Enroll")}
              </Link>
            )}
          </div>
          <div className="border-b md: md:p-5  p-2.5 ">
            <p className=" text-base mb-2.5 font-semibold">
              {t("This course includes:")}
            </p>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={clock} alt="" className=" md:w-5 w-4.5 " />
              <span>{t("Lifetime access")}</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={file} alt="" className=" md:w-5 w-4.5 " />
              <span>{t("Free downloadable resources")}</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm ">
              <img src={divec} alt="" className=" md:w-5 w-4.5 " />
              <span>{t("Access on mobile , tablet and TV")}</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={online} alt="" className=" md:w-5 w-4.5 " />
              <span>{t("100% online course")}</span>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed inset-0 w-full bg-black bg-opacity-50 md:text-lg text-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">{paymentMessage}</p>
            {isSuccessfulPayment ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/courses")}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => navigate(`/watch/${course?.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {t("Watch Course")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {t("cancel")}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
