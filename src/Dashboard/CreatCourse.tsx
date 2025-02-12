import basic from '../assets/AddCourse/Stack (1).png';
import Adv from '../assets/AddCourse/ClipboardText.png';
import Cur from '../assets/AddCourse/MonitorPlay.png';
import Pub from '../assets/AddCourse/PlayCircle (1).png';
import up from '../assets/AddCourse/UploadSimple.png';
import img from '../assets/Image (28).png';
import Button from '../Ui/Button/Button';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AddCourse, allCategories } from '../services/courses';
import { showToast } from '../utils/toast';

export default function CreatCourse() {
  const [step, setStep] = useState(1);
  const [lessons, setLessons] = useState([{ title: '', description: '', files: [] }]);
  const [categories, setCategries] = useState([]);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const newLessons = [...lessons];
    newLessons[index][name] = value;
    setLessons(newLessons);
  };

  const handleLessonFileChange = (lessonIndex, fileIndex, e) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].files[fileIndex] = e.target.files[0];
    setLessons(newLessons);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await allCategories();
        setCategries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const [formData, setFormData] = useState({
    _method: "PUT",
    duration: "",
    level: "",
    title: "",
    description: "",
    price: "",
    category_id: "",
    cover: null as File | null,
  });

  const mutation = useMutation({
    mutationFn: AddCourse,
    onSuccess: (data) => {
      setCourseId(data?.id);
      setSubmitted(true);
    },
    onError: () => {
      showToast('Error', 'error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, cover: files[0] }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, category_id: value }));
  };

  const isFormValid = () => {
    return (
      formData.duration.trim() &&
      formData.description.trim() &&
      formData.level.trim() &&
      formData.title.trim() &&
      formData.price.trim() &&
      formData.category_id.trim() &&
      formData.cover !== null
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("duration", formData.duration);
    data.append("level", formData.level);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category_id", formData.category_id);
    if (formData.cover) {
      data.append("cover", formData.cover);
    }
    lessons.forEach((lesson, lessonIndex) => {
      data.append(`lessons[${lessonIndex}][title]`, lesson.title);
      data.append(`lessons[${lessonIndex}][description]`, lesson.description);
      lesson.files.forEach((file, fileIndex) => {
        if (file) {
          data.append(`lessons[${lessonIndex}][files][${fileIndex}]`, file);
        }
      });
    });
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <section className="h-screen flex justify-center items-center">
        <div className="text-center text-xl font-bold text-green-600">
          Your request has been successfully submitted and will be reviewed soon.
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-md">
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
            name='title'
            value={formData.title}
            onChange={handleChange}
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
                value={formData.category_id}
                onChange={handleCategoryChange}
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
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={'course level'}
                type="text"
                name='level'
                value={formData.level}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-1/2'>
              <label className="mb-2.5 font-medium text-base block" htmlFor="">
                Durations
              </label>
              <input
                onChange={handleChange}
                value={formData.duration}
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
                value={formData.price}
                onChange={handleChange}
                name='price'
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
                  <img src={formData.cover ? URL.createObjectURL(formData.cover) : img} alt="cover" />
                </div>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
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
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
                onChange={(e) => handleLessonChange(lessonIndex, e)}
                placeholder="Lesson Title"
                className="mb-2 w-full p-2 rounded-md"
              />
              <textarea
                name="description"
                value={lesson.description}
                onChange={(e) => handleLessonChange(lessonIndex, e)}
                placeholder="Lesson Description"
                className="mb-2 w-full p-2 rounded-md"
              />
              {lesson.files.map((file, fileIndex) => (
                <div key={fileIndex} className='mb-2'>
                  <input
                    type="file"
                    onChange={(e) => handleLessonFileChange(lessonIndex, fileIndex, e)}
                    className="mb-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newLessons = [...lessons];
                  newLessons[lessonIndex].files.push(null);
                  setLessons(newLessons);
                }}
                className="bg-violet-500 text-white p-2 rounded-md"
              >
                Add File
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setLessons([...lessons, { title: '', description: '', files: [] }])}
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
        <div className='p-5 '>
          <Button type='submit' text='Submit for review' onClick={() => handleSubmit} textColor='text-white font-bold bg-violet-950 ' />
        </div>
      )}
    </form>
  );
}