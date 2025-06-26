import { NavLink, useParams } from 'react-router-dom'
import arrow from '../../assets-webp/ArrowLeft.webp'
import Button from '../../Ui/Button/Button';
import { useState } from 'react';
import ReviewModel from './ReviewModel';
interface HeadProps {
    title: string;
    lessonTitle : string;
}

export default function Head({title , lessonTitle} : HeadProps) {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleReview = () => {
        // Handle the review action
        setShowReviewModal(true);
      };
      const { id } = useParams();

  return (
    <>
    <div className="mt-[128px]  bg-white py-5 px-4 lg:px-10 desktop:px-40 flex lg:flex-row flex-col  gap-2 justify-start lg:justify-between items-start lg:items-center">
        <div className='flex md:flex-row flex-col md:gap-5 gap-2 md:items-center justify-center'>
            <NavLink to={'/courses'} className=" bg-gray-400/15 rounded-full flex justify-center items-center w-14 h-14">
                <img src={arrow} alt="arrow" />
            </NavLink>
            <div>
                <h2 className='lg:text-xl md:text-lg text-base font-bold'>{title} </h2>
                <span className='lg:text-lg md:text-base text-sm text-violet-900'>{lessonTitle}</span> 
            </div>
        </div>
        <div className='flex lg:mr-0 md:ml-20 lg:gap-5 gap-2 items-center'>
            <Button text='Write a Review' onClick={() => handleReview()} Bg='bg-btn text-white h-full' />
            <Button text='Next lecture' Bg='bg-gray-400/15 text-btn h-full' />
        </div>
    </div>
        <ReviewModel 
          showMode={showReviewModal} 
          setShowMode={setShowReviewModal}
          courseId={parseInt(id as string)}
        />
    </>
  )
}
