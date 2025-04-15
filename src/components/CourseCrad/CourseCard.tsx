import { CouCard } from "../../types/interfaces";
import star from '../../assets/icons/Star (3).png';
import clock from '../../assets/icons/Clock (1).png';
import chart from '../../assets/bar-chart (1).png';
import Button from "../../Ui/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseCard({
  cover,
  price,
  title,
  rating,
  duration,
  mainCategoryName,
  index,
  totalCards,
  instructor,
  level,
  id
}: CouCard & { index: number; totalCards: number }) {
  const navigate = useNavigate();

  return (
    <div className="relative group min-h-[333px]  rounded-md">
      <img src={`http://127.0.0.1:8000/storage/${cover}`} alt={title} className="w-full h-44" />
      <div className=" h-fit">
      <div className="rounded-b-md bg-white p-3.5">
        <div className="flex justify-between mb-2">
          <div className="py-1 px-1.5 flex items-center bg-violet-600/10 text-xs rounded">
            {mainCategoryName}
          </div>
          <span className="text-violet-600 font-semibold">{price}$</span>
        </div>
        <h3 className="font-bold md:text-xl min-h-[3.5rem] rtl:text-lg  line-clamp-2 text-base">{title}</h3>
      </div>
      <div className="border-t flex justify-between items-center bg-white p-3.5">
        <div className="flex items-center gap-1 justify-center">
          <img src={star} alt="star" className="w-4.5 h-4.5" />
          <span className="text-sm">{rating}</span>
        </div>
        <span className="text-sm">{duration} week</span>
      </div>
      </div>
      <div
        className={`absolute top-0 -right-1/2 w-[300px] bg-white shadow-md lg:p-5 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10`}
      >
          <div className="py-1 px-1.5 w-max mb-2.5 flex items-center bg-violet-600/10 text-xs rounded">
            {mainCategoryName}
          </div>
          <h3 className="font-bold md:text-xl mb-2.5 rtl:text-lg text-base">{title}</h3>
          <div className=" mb-2.5">
              <p className=" text-base font-semibold text-gray-600">Course by : <span className=" font-bold text-violet-700 text-lg">{instructor}</span></p>
          </div>
          <div  className=" flex mb-2.5 items-center">
          <img src={star} alt="star" className="w-4.5 h-4.5" />
            <p className=" text-base font-semibold text-gray-600">Rating:</p>
            <div className="flex mx-2 items-center gap-1 justify-center">
            <span className="text-sm">{rating}</span>
            </div>
          </div>
          <div className=" flex mb-2.5 items-center gap-4">
            <div className=" flex items-center gap-1">
              <img src={chart} alt="level"  className="w-4.5 h-4.5"/>
              <p>{level}</p>
            </div>
            <div className=" flex items-center gap-1">
              <img src={clock} alt="level"  className="w-4.5 h-4.5"/>
              <p>{duration} weeks</p>
            </div>
          </div>
          <div className=" flex items-center gap-2">
          <p className=" text-base font-semibold text-gray-600">Price:</p>
          <span className="text-violet-600 text-lg font-semibold">{price}$</span>
          </div>
          <div className="my-2.5">
                        <Button
                          text="Add to Cart"
                          textColor="text-white w-full !text-lg !rounded-none"
                          Bg="bg-violet-950"
                         
                        />
          </div>
          <div className="my-2.5">
                        <Button
                          text="Course Detail"
                          textColor="text-white w-full !text-lg !rounded-none"
                          Bg="bg-violet-950"
                         onClick={() => navigate(`/oneCourse/${id}`)}
                        />
          </div>
      </div>
    </div>
  );
}
