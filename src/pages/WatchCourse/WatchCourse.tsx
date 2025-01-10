import course from '../../assets/courses/Full Image.png'
import arrow from '../../assets/ArrowLeft.png'
import folder from '../../assets/icons/FolderNotchOpen.png'
import video from '../../assets/icons/PlayCircle.png'
import clock from '../../assets/icons/Clock.png'
import { useNavigate } from 'react-router-dom'
import Button from '../../Ui/Button/Button'
import { useState } from 'react'

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
      <div className='py-2.5 flex justify-between items-center px-8 bg-white'>
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
      <div className='flex gap-6  p-8  justify-between'>
      <div className="w-9/12">
        <img src={course} alt="" className='w-full' />
        <div>
        <h2>Attach Files (01)</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white w-full max-w-lg">
      {/* معلومات الملف */}
      <div className="flex items-center">
        {/* أيقونة PDF */}
        
        <div>
          <p className="font-medium text-lg">Create account on webflow.pdf</p>
          <p className="text-sm text-gray-500">12.6 MB</p>
        </div>
      </div>

      {/* زر التحميل */}
      <a
        href="/home.pdf" 
        download
        className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all"
      >
        Download File
      </a>
    </div>
        </div>
      </div>

      <div>
        
      </div>
      </div>
      {showPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
          <div className='bg-white p-6 rounded shadow-md w-96'>
            <h3 className='text-lg font-bold mb-4'>Write a Review</h3>
            <div className='flex gap-1 mb-4'>
              {Array(5).fill(0).map((_, index) => (
                <span 
                  key={index} 
                  onClick={() => handleRating(index)} 
                  className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                  ★
                </span>
              ))}
            </div>
            <textarea 
              className='w-full p-2 border rounded mb-4' 
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
                className='px-4 py-2 bg-blue-600 text-white rounded'>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
