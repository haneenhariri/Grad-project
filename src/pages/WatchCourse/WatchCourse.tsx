import courseImg from '../../assets/Video Player.png';
import arrow from '../../assets/ArrowLeft.png';
import folder from '../../assets/icons/FolderNotchOpen.png';
import videoIcon from '../../assets/icons/PlayCircle.png';
import clock from '../../assets/icons/Clock.png';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Ui/Button/Button';
import { useEffect, useState } from 'react';
import fileIcon from '../../assets/FileText.png';
import { watchSingleCourse } from '../../services/courses';
import { showToast } from '../../utils/toast';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import { getSecureCookie, setSecureCookie } from '../../utils/cookiesHelper';

export default function WatchCourse() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const token = getSecureCookie('token'); // استرجاع التوكن

  const handleRating = (index: number) => {
    setRating(index + 1);
  };
  const submitRating = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/rates', {
        course_id: Number(id), // إرسال معرف الكورس
        rate: rating, // إرسال التقييم
        review: review, // إرسال المراجعة
      },{
        headers: {
          'Authorization': `Bearer ${token}`, // إضافة التوكن إلى الرؤوس
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        showToast("Rating submitted successfully!", 'success');
        setShowPopup(false);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      showToast("Failed to submit rating. Please try again.", 'error');
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      showToast("Please select a rating before submitting.", 'warning');
      return;
    }
    submitRating();
  };


  const markLessonAsCompleted = (lessonId: number) => {
    setCompletedLessons((prev) => new Set(prev).add(lessonId));
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await watchSingleCourse(Number(id));
        setCourse(data);
        if (data.lessons.length > 0) {
          setSelectedLesson(data.lessons[0]); // Set the first lesson as selected by default
        }
      } catch (error) {
        showToast("Error loading course", 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <Spinner />;

  const totalLessons = course?.lessons.length || 0;
  const completedPercentage = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;

  return (
    <section className="">
      <div className='py-2.5 px-4 lg:px-20 desktop:px-40 flex justify-between items-center bg-white'>
        <div className='flex items-center gap-5'>
          <button onClick={() => navigate('/courses')} className='flex rounded-full w-12 h-12 bg-White/95 justify-center items-center'>
            <img src={arrow} alt="" />
          </button>
          <div>
            <h2 className='text-2xl font-bold mb-3'>{course?.title}</h2>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1.5'>
                <img src={folder} alt="" className='w-5 h-5' />
                <span className='text-xs text-gray-600'>{course?.lessons.length} Sections</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <img src={videoIcon} alt="" className='w-5 h-5' />
                <span className='text-xs text-gray-600'>{course?.lessons.reduce((acc: number, lesson: any) => acc + lesson.files.length, 0)} lectures</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <img src={clock} alt="" className='w-5 h-5' />
                <span className='text-xs text-gray-600'>{course?.duration} mins</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2.5'>
          <Button onClick={() => setShowPopup(true)} text='Write a Review' Bg='bg-White/95' textColor='' />
          <Button text='Next lecture' Bg='bg-btn' textColor='text-white' />
        </div>
      </div>
      <div className='flex gap-6 px-4 lg:px-20 desktop:px-40 py-10 justify-between'>
        <div className="w-9/12">
          {/* عرض الفيديو إذا كان موجودًا */}
          {selectedLesson?.files?.some((file: any) => file.type === 'video') ? (
            <video
              controls
              className='w-full'
              onEnded={() => markLessonAsCompleted(selectedLesson.id)}
            >
              <source
                src={`http://127.0.0.1:8000/storage/${selectedLesson.files.find((file) => file.type === 'video').path}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div></div>
          )}

          <h2 className='my-6 text-2xl font-bold'>{selectedLesson?.title}</h2>

          <div className='border-y mb-10'>
            <button className='w-1/4 py-5 border-b border-b-violet-600'>Description</button>
            <button className='w-1/4 py-5'>Lectures Notes</button>
            <button className='w-1/4 py-5'>Attach File</button>
            <button className='w-1/4 py-5'>Comments</button>
          </div>

          <div>
            <h2 className='mb-3'>Lectures Description</h2>
            <p className='text-sm text-gray-700'>{selectedLesson?.description}</p>
          </div>

          {/* عرض الملفات إذا كانت موجودة */}
          {selectedLesson?.files?.some((file: any) => file.type !== 'video') && (
            <div>
              <h2 className='mb-5'>Attach Files ({selectedLesson?.files?.filter((file: any) => file.type !== 'video').length || 0})</h2>
              {selectedLesson?.files
                ?.filter((file: any) => file.type !== 'video')
                .map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white w-full mb-2">
                    <div className="flex items-center gap-2">
                      <img src={fileIcon} alt="" />
                      <div>
                        <p className="font-medium text-lg">{file.origin_name}</p>
                        <p className="text-sm text-gray-500">{file.extension}</p>
                      </div>
                    </div>
                    <a
                      href={`http://127.0.0.1:8000/storage/${file.path}`}
                      download
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-950 transition-all"
                    >
                      Download File
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className='w-5/12'>
          <div className='mb-4 flex justify-between items-center'>
            <h2>Course Contents</h2>
            <p className='text-sm text-[#23BD33]'>{Math.round(completedPercentage)}% Completed</p>
          </div>
          <div className='mt-7'>
            {course?.lessons.map((lesson: any) => (
              <div
                key={lesson.id}
                className={`p-4 border rounded-lg mb-2 cursor-pointer ${selectedLesson?.id === lesson.id ? 'bg-violet-50' : 'bg-white'}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <h3 className='font-medium'>{lesson.title}</h3>
                <p className='text-sm text-gray-500'>{lesson.files.length} files</p>
                {completedLessons.has(lesson.id) && (
                  <span className='text-sm text-green-600'>Completed</span>
                )}
              </div>
            ))}
          </div>
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
  );
}