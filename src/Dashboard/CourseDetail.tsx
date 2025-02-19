import basic from '../assets/AddCourse/Stack (1).png';
import Adv from '../assets/AddCourse/ClipboardText.png';
import Cur from '../assets/AddCourse/MonitorPlay.png';
import Pub from '../assets/AddCourse/PlayCircle (1).png';
import up from '../assets/AddCourse/UploadSimple.png';
import img from '../assets/Image (28).png';
import Button from '../Ui/Button/Button';
import { useEffect, useState } from 'react';
import { allCategories, watchSingleCourse } from '../services/courses';
import axios from 'axios';
import { getSecureCookie } from '../utils/cookiesHelper';
import { showToast } from '../utils/toast';
import { useParams } from 'react-router-dom';

interface LessonFile {
  path: File | null;
  type: "video" | "file";
}

interface Lesson {
  title: string;
  description: string;
  files: LessonFile[];
}

export default function EditCourse() {
  const [step, setStep] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState([]);
  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const [title, setTitle] = useState('');
  const [category_id, setCategory_id] = useState("");
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const token = getSecureCookie("token");
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      title: "Lesson 1",
      description: "Description",
      files: [
        {
          path: null,
          type: "video",
        },
      ],
    },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCover(file); // تعيين الملف الجديد
      setPreview(URL.createObjectURL(file)); // عرض الصورة المحددة
    }
  };

  const handleFileChange = (lessonIndex: number, fileIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex].files[fileIndex] = {
        path: file,
        type: file.type.startsWith("video") ? "video" : "file",
      };
      setLessons(updatedLessons);
    }
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: `Lesson ${lessons.length + 1}`,
        description: "Description",
        files: [
          {
            path: null,
            type: "video",
          },
        ],
      },
    ]);
  };

  const addFile = (lessonIndex: number) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].files.push({
      path: null,
      type: "video",
    });
    setLessons(updatedLessons);
  };

  const handleLessonChange = (index: number, field: string, value: string) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value,
    };
    setLessons(updatedLessons);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await watchSingleCourse(Number(id));
        setCourse(course);
        setTitle(course.title);
        setCategory_id(course.category_id);
        setLevel(course.level);
        setDuration(course.duration);
        setDescription(course.description);
        setPrice(course.price);
  
        // بناء المسار الكامل للصورة إذا كان المسار نسبيًا
        const fullCoverPath = course.cover
          ? `http://127.0.0.1:8000/storage/${course.cover}`
          : null;
        setCover(fullCoverPath); // تعيين المسار الكامل للصورة
        setPreview(fullCoverPath); // تعيين المسار الكامل للعرض
  
        setLessons(course.lessons || []);
      } catch (error) {
        showToast("Error loading course", 'error');
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await allCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
  
      // إضافة الحقول النصية إلى FormData
      formData.append('title', title);
      formData.append('category_id', category_id);
      formData.append('level', level);
      formData.append('duration', duration);
      formData.append('description', description);
      formData.append('price', price);
  
      // إضافة cover إذا كان ملفًا جديدًا
      if (cover instanceof File) {
        formData.append('cover', cover); // إضافة الملف الجديد
      }
  
      // إرسال بيانات الكورس
      const courseResponse = await axios.put(
        `http://127.0.0.1:8000/api/courses/${id}?_method=PUT`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // تأكد من أن الـ header صحيح
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      showToast("Course updated successfully", 'success');
    } catch (error) {
      console.error(error);
      showToast("Error updating course", 'error');
    }
  };
  return (
    <form onSubmit={send} className="bg-white rounded-md">
      {/* head */}
      <div className="flex items-center border-b">
        <div className={`${step == 1 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={basic} alt="Basic Information" />
          <span>Basic Information</span>
        </div>
        <div className={`${step == 2 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Adv} alt="Advance Information" />
          <span>Advance Information</span>
        </div>
        <div className={`${step == 3 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Cur} alt="Curriculum" />
          <span>Curriculum</span>
        </div>
        <div className={`${step == 4 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Pub} alt="Publish Course" />
          <span>Publish Course</span>
        </div>
      </div>
      <div className='p-5 flex border-b justify-between'>
        {step === 1 && (<h2 className='text-2xl font-semibold'>Basic Information</h2>)}
        {step === 2 && (<h2 className='text-2xl font-semibold'>Advance Information</h2>)}
        {step === 3 && (<h2 className='text-2xl font-semibold'>Course Curriculum</h2>)}
        {step === 4 && (<h2 className='text-2xl font-semibold'>Publish Course</h2>)}
        <div className='flex gap-5'>
          <Button text='Save' textColor='text-violet-950' Bg='bg-[#FFEEE8]' />
          <Button type='button' text='Save & Preview' onClick={handlePrev} textColor='text-violet-950' />
        </div>
      </div>
      {/* content */}
      {step === 1 && (
        <div className='p-5'>
          <label className="mb-2.5 font-medium text-base block" htmlFor="">
            Title
          </label>
          <input
            className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
            placeholder={'course title'}
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <div className='flex gap-2'>
            <div className='w-1/2'>
              <label className="mb-2.5 font-medium text-base block" htmlFor="">
                Course Category
              </label>
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="category_id"
                name="category_id"
                value={category_id}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setCategory_id(event.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-1/2'>
              <label className="mb-2.5 font-medium text-base block" htmlFor="">
                Course Level
              </label>
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="level"
                name='level'
                value={level}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setLevel(event.target.value)}
              >
                <option value="">Select Level</option>
                <option value={'beginner'}>beginner</option>
                <option value={'intermediate'}>intermediate</option>
                <option value={'advance'}>advance</option>
              </select>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-1/2'>
              <label className="mb-2.5 font-medium text-base block" htmlFor="">
                Durations
              </label>
              <input
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={'course duration'}
                type="text"
                name='duration'
              />
            </div>
            <div className='w-1/2'>
              <label className="mb-2.5 font-medium text-base block" htmlFor="">
                Price
              </label>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={'course price'}
                type="text"
                name='price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className='mt-5 flex justify-between'>
            <Button text='Cancel' textColor='border-gray border text-violet-950' />
            <Button text='Save & next' textColor='text-white' type='button' onClick={handleNext} Bg='bg-violet-950' />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className=''>
          <div className='p-5 border-b'>
            <label className="mb-2.5 font-medium text-base block" htmlFor="">
              Course Thumbnail
            </label>
            <div className='flex gap-5'>
              <div className="mb-5">
                <div
                  className="border-2 flex border-gray-300 bg-gray-200 w-48 h-48 p-4 rounded-sm text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => document.getElementById("cover")?.click()}
                >
                  <img src={preview || cover} alt="cover" />
                </div>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  accept="image/*,application/pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <p className='w-2/3 text-base text-gray-700'>Upload your course Thumbnail here. <span className='text-black font-bold text-lg'>Important guidelines:</span> 1200x800 pixels or 12:8 Ratio. Supported format:<span className='text-black font-bold text-lg'>.jpg, .jpeg, or .png</span> </p>
                <div className='flex mt-5 gap-2 text-violet-500 font-semibold bg-[#FFEEE8] w-max p-2.5'>
                  <p>Upload image</p>
                  <img src={up} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className='p-5 border-b'>
            <label className="mb-2.5 font-medium text-base block" htmlFor="">
              Course Descriptions
            </label>
            <textarea
              name="description"
              className="mb-5 w-full h-40 p-4 placeholder:text-base bg-White/95 rounded-md"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className='mt-5 flex justify-between'>
              <Button text='Cancel' textColor='border-gray border text-violet-950' />
              <Button text='Save Course' type='button' textColor='text-white' onClick={handleNext} Bg='bg-violet-950' />
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className='p-5'>
          <div className='flex flex-col gap-5'>
            {lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className='bg-gray-100 p-4 rounded-md'>
                <input
                  type="text"
                  name="title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(lessonIndex, "title", e.target.value)}
                  placeholder="Lesson Title"
                  className="mb-2 w-full p-2 rounded-md"
                />
                <textarea
                  name="description"
                  value={lesson.description}
                  onChange={(e) => handleLessonChange(lessonIndex, "description", e.target.value)}
                  placeholder="Lesson Description"
                  className="mb-2 w-full p-2 rounded-md"
                />
                {lesson.files.map((file, fileIndex) => (
                  <div key={fileIndex} className='mb-2'>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(lessonIndex, fileIndex, e)}
                      className="mb-2"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFile(lessonIndex)}
                  className="bg-violet-500 text-white p-2 rounded-md"
                >
                  Add File
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLesson}
              className="bg-violet-500 text-white p-2 rounded-md"
            >
              Add Lesson
            </button>
          </div>
          <div className='mt-5 flex justify-between'>
            <Button text='Cancel' type='button' textColor='border-gray border text-violet-950' />
            <Button text='Save Course' type='button' textColor='text-white' onClick={handleNext} Bg='bg-violet-950' />
          </div>
        </div>
      )}
      {step === 4 && (
        <div className='p-5 h-screen '>
          <Button type='submit' text='Submit for review' textColor='text-white font-bold bg-violet-950 ' />
        </div>
      )}
    </form>
  );
}