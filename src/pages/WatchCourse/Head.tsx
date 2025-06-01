import { NavLink, useParams } from 'react-router-dom'
import arrow from '../../assets/ArrowLeft.png'
import Button from '../../Ui/Button/Button';
import { useState } from 'react';
import ReviewModel from './ReviewModel';
interface HeadProps {
    title: string;
}

export default function Head({title} : HeadProps) {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleReview = () => {
        // Handle the review action
        setShowReviewModal(true);
      };
      const { id } = useParams();

  return (
    <>
    <div className="mt-[128px] bg-white py-5 px-10 flex justify-between items-center">
        <div className='flex gap-5 items-center justify-center'>
            <NavLink to={'/courses'} className=" bg-gray-400/15 rounded-full flex justify-center items-center w-14 h-14">
                <img src={arrow} alt="arrow" />
            </NavLink>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
        <div className='flex gap-5 items-center'>
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
