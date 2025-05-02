import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { singleCourse } from "../../services/courses";
import { buyCourse } from "../../services/payment";   
import star from '../../assets/icons/Star (3).png'
import clock from '../../assets/icons/Clock.png'
import clock1 from '../../assets/icons/Alarm (1).png'
import level from '../../assets/icons/bar-chart.png'
import file from '../../assets/icons/Notebook.png'
import divec from '../../assets/icons/Monitor.png'
import online from '../../assets/Stack.png'
import Button from "../../Ui/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { imgProfile } from "../../services/profileStd";
import { useTranslation } from "react-i18next";

export default function OneCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string>(""); 
  const [balance, setBalance] = useState<number | null>(null); 
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false);   
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const {t} = useTranslation();

  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
  
    if (balance !== null && balance >= course?.price) {
      try {
        const response = await buyCourse(course.id);
  
        if (response.status === "success") {
          setPaymentMessage(response.message || "تم الدفع بنجاح"); 
          setIsSuccessfulPayment(true);
          setBalance(balance - course.price); 
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
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const data = await singleCourse(Number(id));
        setCourse(data);
      } catch (error ) {
        setError("Error loading course");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchCourse();
  }, [id]);

  const renderStars = (rating: number | null) => {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: Math.round(rating ?? 0) }, (_, index) => (
          <img key={index} src={star} alt="star" className="w-5 h-5" />
        ))}
      </div>
    );
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className=" pt-[108px] h-screen items-center  justify-center pb-12 flex md:flex-row flex-col gap-4 px-4 lg:px-10 desktop:px-40">
        <div className=" md:w-3/4 w-full">
          <div className=" flex gap-6">
          <img
            src={`http://127.0.0.1:8000/storage/${course?.cover}`}
            alt={course?.title}
            className="  mb-5 "
           />
              <div>
                    <h2 className=" lg:text-4xl md:text-xl text-lg font-semibold mb-3.5">{course?.title}</h2>
                    <div className="mb-5 w-full flex justify-between items-center">
                      <p className=" text-gray-600 md:text-base text-sm font-semibold">
                        Created by: <span className=" text-black md:text-lg text-base">{course?.instructor}</span>
                      </p>
                      <div className=" flex items-center gap-1.5">
                        {renderStars(course?.rating)}
                        {course?.rating}
                      </div>
                    </div>
              </div>
          </div>
          <h3 className="mb-5 lg:text-2xl md:text-xl text-lg font-semibold">{t("Description")}</h3>
          <p className=" text-gray-800 lg:text-base text-sm">{course.description}</p>
        </div>
        {/* buy */}
        <div className=" shadow-sm bg-white  h-max rounded-sm w-full md:w-1/3">
          <div className="border-b  md:p-5 p-2.5">
            <div className="flex mb-2.5 justify-between items-center">
              <span className=" text-lg font-semibold">{course?.price}$</span>
              <span className=" text-sm text-violet-950 p-1 bg-violet-600/15">56% off</span>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={clock1} alt="" className=" md:w-5 w-4.5 "/>
              <span className="text-sm text-purple-600">2 days left at this price!</span>
            </div>
          </div>
          <div className="border-b  md:p-5 p-2.5">
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={clock} alt="clock" className=" md:w-5 w-4.5 " />
                <span className=" text-sm">Course Duration</span>
              </div>
              <span className=" text-sm text-gray-600">{course?.duration}weeks</span>
            </div>
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={level} alt="clock" className=" md:w-5 w-4.5 "/>
                <span className=" text-sm">Course Level</span>
              </div>
              <span className=" text-sm text-gray-600  ">{course?.level}</span>
            </div>
          </div>
          <div className="border-b  md:p-5 p-2.5 ">
            <Button
              text="Buy now"
              textColor="text-white w-full !text-lg !rounded-none"
              Bg="bg-violet-950"
              onClick={handlePayment}
            />
          </div>
          <div className="border-b md: md:p-5  p-2.5 ">
            <p className=" text-base mb-2.5 font-semibold">This course includes:</p>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={clock} alt="" className=" md:w-5 w-4.5 " />
              <span>Lifetime access</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={file} alt="" className=" md:w-5 w-4.5 " />
              <span>Free downloadable resources</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm ">
              <img src={divec} alt="" className=" md:w-5 w-4.5 "/>
              <span>Access on mobile , tablet and TV</span>
            </div>
            <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
              <img src={online} alt="" className=" md:w-5 w-4.5 "/>
              <span>100% online course</span>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:text-lg text-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">{paymentMessage}</p>
            {isSuccessfulPayment ? (
              <div className="flex justify-center gap-4">
                <button onClick={() => navigate("/courses")} className="px-4 py-2 bg-green-600 text-white rounded">
                Cancel
                </button>
                <button onClick={() => navigate(`/watch/${course?.id}`)} className="px-4 py-2 bg-blue-600 text-white rounded">
                  watch course
                  </button>
              </div>
            ) : (
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-600 text-white rounded">
                Close
              </button>
            )}
          </div>
        </div>)}
    </>
  );
}
