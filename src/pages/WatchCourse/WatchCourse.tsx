import course from '../../assets/Video Player.png'
import arrow from '../../assets/ArrowLeft.png'
import folder from '../../assets/icons/FolderNotchOpen.png'
import video from '../../assets/icons/PlayCircle.png'
import clock from '../../assets/icons/Clock.png'
import { useNavigate } from 'react-router-dom'
import Button from '../../Ui/Button/Button'
import { useState } from 'react'
import file from '../../assets/FileText.png'
import progress from '../../assets/Course Progress.png'
import courseContact from '../../assets/Course Contents.png'
import Comment from '../../components/Comment/Comment'
export default function WatchCourse() {
  const navigate =  useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleRating = (index : number) => {
    setRating(index + 1); 
  };
  const handleSubmit = () => {
    console.log("Rating:", rating, "Review:", review);
    // Add your logic to save the rating and review
    setShowPopup(false);
  };
  return (
    <section className="">
      <div className='py-2.5 px-4 lg:px-20 desktop:px-40 flex justify-between items-center  bg-white'>
        <div className='flex items-center gap-5'>
          <button onClick={() => navigate('/courses')} className=' flex rounded-full w-12 h-12 bg-White/95 justify-center items-center'>
            <img src={arrow} alt="" />
          </button>
          <div>
            <h2 className='text-lg mb-3'>Complete Website Responsive Design: from Figma to Webflow to Website Design</h2>
            <div className=' flex items-center gap-4'>
                <div className='flex items-center gap-1.5'>
                  <img src={folder} alt="" className=' w-5 h-5' />
                  <span className=' text-xs text-gray-600'>6 Sections</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <img src={video} alt="" className=' w-5 h-5' />
                  <span className=' text-xs text-gray-600'>202 lectures</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <img src={clock} alt="" className=' w-5 h-5' />
                  <span className=' text-xs text-gray-600'>19h 37ms</span>
                </div>
            </div>
          </div>
        </div>
        <div className=' flex gap-2.5'>
          <Button onClick={() => setShowPopup(true)} text='Write a Review' Bg='bg-White/95 ' textColor=''  />
          <Button text='Next lecture' Bg='bg-btn ' textColor='text-white' />
        </div>
      </div>
      <div className='flex gap-6  px-4 lg:px-20 desktop:px-40 py-10  justify-between'>
      <div className="w-9/12">
        <img src={course} alt="" className='w-full' />
        <h2 className='my-6'>2. Sign up in Webflow</h2>
        <div className=' border-y mb-10 '>
          <button className=' w-1/4 py-5 border-b border-b-violet-600'>Description</button>
          <button className=' w-1/4 py-5 '>Lectures Notes</button>
          <button className=' w-1/4 py-5 '>Attach File</button>
          <button className=' w-1/4 py-5 '>Comments</button>
        </div>
        <div>
          <h2 className=' mb-3'>Lectures Description</h2>
          <p className='text-sm text-gray-700'>We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We’ll use the world’s most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuery.If that all sounds a little too fancy - don’t worry, this course is aimed at people new to web design and who have never coded before. We’ll start right at the beginning and work our way through step by step. </p>
        </div>
        <div className=' my-10'>
          <h2 className=' mb-3'>Lecture Notes</h2>
          <p className='text-sm text-gray-700'>We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We’ll use the world’s most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuery.If that all sounds a little too fancy - don’t worry, this course is aimed at people new to web design and who have never coded before. We’ll start right at the beginning and work our way through step by step. </p>
        </div>
        <div>
        <h2 className='mb-5'>Attach Files (01)</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white w-full ">
      {/* معلومات الملف */}
      <div className="flex items-center gap-2">
        {/* أيقونة PDF */}
        <img src={file} alt="" />
        <div>
          <p className="font-medium text-lg">Create account on webflow.pdf</p>
          <p className="text-sm text-gray-500">12.6 MB</p>
        </div>
      </div>
      {/* زر التحميل */}
      <a
        href="/home.pdf" 
        download
        className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-950 transition-all"
      >
        Download File
      </a>
         </div>

        </div>
      </div>
      <div className=' w-5/12'>
      <div className=' mb-4 flex justify-between items-center'>
      <h2>Course Contents</h2>
      <p className='text-sm text-[#23BD33]'>15% Completed</p>
      </div>
        <img src={progress} alt="" />
        <img src={courseContact} alt="" className=' h-auto w-full mt-7' />
      </div>
      
      <div>
        
      </div>
      </div>
      {showPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
          <div className='bg-white p-6 rounded shadow-md w-1/2'>
            <h3 className='text-lg font-bold mb-4 border-b pb-3'>Write a Review</h3>
            <div className='flex justify-center gap-1 mb-4'>
              {Array(5).fill(0).map((_, index) => (
                <span 
                  key={index} 
                  onClick={() => handleRating(index)} 
                  className={`cursor-pointer text-5xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                  ★
                </span>
              ))}
            </div>
            <label htmlFor="">Feedback</label>
            <textarea 
              className='w-full p-2 border rounded mt-2 h-32 mb-4' 
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}>
            </textarea>
            <div className='flex justify-end gap-2'>
              <button 
                onClick={() => setShowPopup(false)} 
                className='px-4 py-2 bg-gray-200 rounded'>
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className='px-4 py-2 bg-violet-950 text-white rounded'>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
