import img from '../assets/courses/Image (18).png'
import reat from '../assets/Rating.png'
import info from '../assets/Fun-Fact.png'
import Button from '../Ui/Button/Button'
import Ret from '../assets/Overall Course Rating.png'
import Revenue from '../assets/Profile View.png'

export default function CourseDetail() {
  return (
    <div className='mb-3'>
      <div className="items-center p-2.5 flex gap-2.5 bg-white rounded-lg">
      <img src={img}  className=" rounded-md w-1/3 h-48" />
      <div>
         <div className=' text-gray-600 text-sm flex gap-2.5'>
            <span>Uploaded: Jan 21, 2020</span>
            <span>Last Updated: Sep 11, 2021</span>
         </div>
         <h2 className='my-2 text-lg font-semibold'>Web Design Fundamentals</h2>
         <p className=' text-sm text-gray-600'>Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.</p>
         <div className=' mt-4 items-center text-sm flex justify-between gap-2.5'>
            <span>Created by: Kevin Gilbert</span>
            <img src={reat} alt="" />
         </div>
         <div className=' mt-4  text-sm flex items-center justify-between gap-2.5'>
            <div className=' flex flex-col text-sm text-gray-600'>
            <span>Course prices: $13.99</span>
            <span>USD dollar revenue : $131,800</span>
            </div>
            <Button text='Edit Course' Bg='bg-btn' textColor=' text-white'/>
         </div>
      </div>
      </div>
      <div className='flex justify-between gap-4 my-4'>
        <img src={Ret} alt="" className=' w-1/2 h-[400px]'  />
        <img src={Revenue} alt="" className=' w-1/2 h-[400px] '  />

      </div>
    </div>
  )
}
