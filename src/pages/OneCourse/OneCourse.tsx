import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  singleCourse } from "../../services/courses";
import star from '../../assets/icons/Star (3).png'
import clock from '../../assets/icons/Clock.png'
import clock1 from '../../assets/icons/Alarm (1).png'
import level from '../../assets/icons/bar-chart.png'
import file from '../../assets/icons/Notebook.png'
import divec from '../../assets/icons/Monitor.png'
import online from '../../assets/Stack.png'
import Button from "../../Ui/Button/Button";
export default function OneCourse() {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const data = await singleCourse(Number(id));
          setCourse(data);
        } catch (error) {
          setError("Error");
        } finally {
          setLoading(false);
        }
      };
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
    }
    if (loading) return <p>Lodaing...</p>;
    if (error) return <p>{error}</p>;
  return (
    <section className="pt-7.5 pb-12 flex gap-4 px-4 lg:px-20 desktop:px-40">
      <div className=" w-3/4">
      <h2 className=" text-4xl font-semibold mb-3.5">{course?.title}</h2>
      <div className="mb-5 w-full flex justify-between items-center">
        <p className=" text-gray-600 text-base font-semibold">Created by: <span className=" text-black text-lg">{course?.instructor}</span></p>
        <div className=" flex items-center gap-1.5">
        {renderStars(course?.rating)}
        {course?.rating}
        </div>
      </div>
      <img src={`http://127.0.0.1:8000/storage/${course?.cover}`} alt={course?.title} className="w-full mb-5 h-1/2" />
      <h3 className="mb-5 text-2xl font-semibold">Description</h3>
      <p className=" text-gray-800 text-base">{course.description}</p>
      </div>
      {/* buy*/}
      <div className=" shadow-sm bg-white  h-max rounded-sm w-1/3">
        <div className="border-b p-5">
            <div className="flex mb-2.5 justify-between items-center">
              <span className=" text-lg font-semibold">{course?.price}$</span>
              <span className=" text-sm text-violet-950 p-1 bg-violet-600/15">56% off</span>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={clock1} alt="" />
              <span className="text-sm text-purple-600">2 days left at this price!</span>
            </div>
        </div>
        <div className="border-b p-5">
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={clock} alt="clock" />
                <span className=" text-sm">Course Duration</span>
              </div>
              <span className=" text-sm text-gray-600">{course?.duration}weeks</span>
            </div>
            <div className="flex mb-2.5 justify-between items-center">
              <div className=" flex gap-1 items-center">
                <img src={level} alt="clock" />
                <span className=" text-sm">Course Level</span>
              </div>
              <span className=" text-sm text-gray-600  ">{course?.level}</span>
            </div>
        </div>
        <div className="border-b p-5 ">
          <Button text="Buy now" textColor="text-white w-full !text-lg !rounded-none" Bg="bg-violet-950"/>
        </div>
        <div className="border-b p-5 ">
          <p className=" text-base mb-2.5 font-semibold">This course includes:</p>
          <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
            <img src={clock} alt="" />
            <span>Lifetime access</span>
          </div>
          <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
            <img src={file} alt="" />
            <span>Free downloadable resources</span>
          </div>
          <div className="mb-2 flex gap-1 items-center text-sm ">
            <img src={divec} alt="" />
            <span>Access on mobile , tablet and TV</span>
          </div>
          <div className="mb-2 flex gap-1 items-center text-sm text-violet-500">
            <img src={online} alt="" />
            <span>100% online course</span>
          </div>
        </div>
      </div>
    </section>
  )
}
