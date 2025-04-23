import basic from '../../assets/AddCourse/Stack (1).png';
import Adv from '../../assets/AddCourse/ClipboardText.png';
import Cur from '../../assets/AddCourse/MonitorPlay.png';
import Pub from '../../assets/AddCourse/PlayCircle (1).png';
import up from '../../assets/AddCourse/UploadSimple.png';
import img from '../../assets/Image (28).png';
import Button from '../../Ui/Button/Button';
import { useEffect, useState } from 'react';
import { allCategories } from '../../services/courses';
import axios from 'axios';
import { getSecureCookie } from '../../utils/cookiesHelper';
import { showToast } from '../../utils/toast';
import { Category, Lesson, SubCategory } from '../../types/interfaces';
import Spinner from '../../components/Spinner/Spinner';
import Label from '../../Ui/Label/Label';
import { useTranslation } from 'react-i18next';
 

export default function CreateCourse() {
  const {t} = useTranslation()
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category_id, setCategory_id] = useState("");
  const [subCategory_id, setSubCategory_id] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [price, setPrice] = useState('');
  const [courseLanguage,setCourseLanguage] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const token = getSecureCookie("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      titleAr: "الدرس الأول",
      titleEn: "Lesson 1",
      descriptionAr: "وصف الدرس الأول",
      descriptionEn: "Lesson 1 description",
      files: [
        {
          path: null,
          type: "video" 
        },
      ],
    },
  ]);

  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCover(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLessonChange = (
    lessonIndex: number,
    field: keyof Omit<Lesson, 'files'>,
    value: string
  ) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex][field] = value;
    setLessons(updatedLessons);
  };

  const handleFileChange = (
    lessonIndex: number,
    fileIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedLessons = [...lessons];
      const fileType = file.type.includes("video") ? "video" : "file";
      updatedLessons[lessonIndex].files[fileIndex] = {
        path: file,
        type: fileType,
      };
      setLessons(updatedLessons);
    }
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        titleAr: `الدرس ${lessons.length + 1}`,
        titleEn: `Lesson ${lessons.length + 1}`,
        descriptionAr: "وصف الدرس",
        descriptionEn: "Lesson description",
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
      type: "video"
    });
    setLessons(updatedLessons);
  };

  const removeFile = (lessonIndex: number, fileIndex: number) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].files.splice(fileIndex, 1);
    setLessons(updatedLessons);
  };

  const removeLesson = (lessonIndex: number) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(lessonIndex, 1);
    setLessons(updatedLessons);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setCategory_id(selectedId);
    const selectedCategory = categories.find((cat) => String(cat.id) === selectedId);
    setSubCategories(selectedCategory?.sub_category || []);
    setSubCategory_id("");
  };

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    // Validation
    if (!titleEn || !titleAr || !subCategory_id || !cover) {
      showToast('Please fill all required fields', 'error');
      return;
    }
  
    if (lessons.length === 0) {
      showToast('Please add at least one lesson', 'error');
      return;
    }
  
    for (const lesson of lessons) {
      if (lesson.files.length === 0 || lesson.files.some(file => !file.path)) {
        showToast(`Lesson "${lesson.titleEn}" must have at least one valid file`, 'error');
        return;
      }
    }
  
    try {
      const formData = new FormData();
      
      // Basic course info
      formData.append("duration", duration);
      formData.append("level", level);
      formData.append("title[en]", titleEn);
      formData.append("title[ar]", titleAr);
      formData.append("description[en]", descriptionEn);
      formData.append("description[ar]", descriptionAr);
      formData.append("sub_category_id", subCategory_id);
      formData.append("price", price);
      formData.append("course_language", courseLanguage);
      if (cover) {
        formData.append("cover", cover);
      }
  
      // Format lessons data to match Laravel's expected array format
      lessons.forEach((lesson, lessonIndex) => {
        formData.append(`lessons[${lessonIndex}][title][en]`, lesson.titleEn);
        formData.append(`lessons[${lessonIndex}][title][ar]`, lesson.titleAr);
        formData.append(`lessons[${lessonIndex}][description][en]`, lesson.descriptionEn);
        formData.append(`lessons[${lessonIndex}][description][ar]`, lesson.descriptionAr);
  
        // Format files array
        lesson.files.forEach((file, fileIndex) => {
          if (file.path) {
            // Append each file with proper array notation
            formData.append(`lessons[${lessonIndex}][files][${fileIndex}][path]`, file.path);
            formData.append(`lessons[${lessonIndex}][files][${fileIndex}][type]`, file.type);
          }
        });
      });
  
      const response = await axios.post("http://127.0.0.1:8000/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      showToast("Course created successfully!", 'success');
      console.log("API Response:", response.data);
  
    } catch (error: any) {
      console.error("Full error:", error);
      
      let errorMessage = 'Error creating course';
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        
        // Handle Laravel validation errors if they exist
        if (error.response.data.errors) {
          const firstError = Object.values(error.response.data.errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : 'Validation error';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage = 'No response from server';
      } else {
        console.error('Request setup error:', error.message);
      }
  
      showToast(errorMessage, 'error');
      
    } finally {
      setIsSubmitting(false); // تعطيل حالة التحميل بغض النظر عن النتيجة
    }
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await allCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);
    useEffect(() => {
      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, [preview]);
  if(isSubmitting){
    return <Spinner/>
  }
  return (
    <form onSubmit={send} className="bg-white rounded-md">
      {/* Header */}
      <div className="flex items-center border-b">
        <div className={`${step === 1 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img  src={basic} alt="Basic Information" />
          <span>{t("Basic Information")}</span>
        </div>
        <div className={`${step === 2 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Adv} alt="Advance Information" />
          <span>{t("Advance Information")}</span>
        </div>
        <div className={`${step === 3 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Cur} alt="Curriculum" />
          <span>{t("Curriculum")}</span>
        </div>
        <div className={`${step === 4 ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
          <img src={Pub} alt="Publish Course" />
          <span>{t("Publish Course")}</span>
        </div>
      </div>
      <div className='p-4 flex border-b items-center justify-between'>
        {step === 1 && <h2 className='text-2xl font-semibold'>{t("Basic Information")}</h2>}
        {step === 2 && <h2 className='text-2xl font-semibold'>{t("Advance Information")}</h2>}
        {step === 3 && <h2 className='text-2xl font-semibold'>{t("Curriculum")}</h2>}
        {step === 4 && <h2 className='text-2xl font-semibold'>{t("Publish Course")}</h2>}
        <div className='flex gap-5'>
          <Button type='button' text='Save & Preview' onClick={handlePrev} textColor='text-violet-950' />
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className='p-5'>
          <div className='flex justify-between gap-2'>
            <div className='w-1/2'>
              <Label label="Title [en]"/>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={t("TitleP[en]")}
                type="text"
                value={titleEn}
                onChange={(event) => setTitleEn(event.target.value)}
                required
              />
            </div>
            <div className='w-1/2'>
              <Label label="Title [ar]"/>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={t("TitleP[ar]")}
                type="text"
                value={titleAr}
                onChange={(event) => setTitleAr(event.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-1/2'>
              <Label label='Category'/>
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="category"
                value={category_id}
                onChange={handleCategoryChange}
                required
              >
                <option value="">{t("SelectCategory")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='SubCategory'/>
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="subCategory"
                value={subCategory_id}
                onChange={(e) => setSubCategory_id(e.target.value)}
                required
              >
                <option value="">{t("SelectSubCategory")}</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex gap-2'>
            <div className='w-1/2'>
               <Label label='level' />
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              >
                <option value="">{t("SelectLevel")}</option>
                <option value="beginner">{t("Beginner")}</option>
                <option value="intermediate">{t("Intermediate")}</option>
                <option value="advance">{t("Advance")}</option>
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='CourseLanguage' />
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="level"
                value={courseLanguage}
                onChange={(e) => setCourseLanguage(e.target.value)}
                required
              >
                <option value="">{t("SelectCourseLanguage")}</option>
                <option value="english">{t("english")}</option>
                <option value="arabic">{t("arabic")}</option>
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='Duration' />
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={t("CourseDuration")}
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className='w-1/2'>
              <Label label='CoursesSection.Price'/>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder={t("CoursePrice")}
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='mt-5 flex justify-between'>
            <Button type='button' text='Cancel' textColor='border-gray border text-violet-950' />
            <Button type='button' text='Save & Next' textColor='text-white' onClick={handleNext} Bg='bg-violet-950' />
          </div>
        </div>
      )}
      {/* Step 2: Advanced Information */}
      {step === 2 && (
        <div>
          <div className='p-5 border-b'>
            <label className="mb-2.5 font-medium text-base block">
              Course Thumbnail
            </label>
            <div className='flex gap-5'>
              <div className="mb-5">
                <div
                  className="border-2 flex border-gray-300 bg-gray-200 w-48 h-48 p-4 rounded-sm text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => document.getElementById("cover")?.click()}
                >
                  {preview ? (
                    <img src={preview} alt="Course cover" className="w-full h-full object-cover" />
                  ) : (
                    <img src={img} alt="Default cover" className="w-full h-full object-cover" />
                  )}
                </div>
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </div>
              <div>
                <p className='w-2/3 text-base text-gray-700'>
                  Upload your course thumbnail here. <span className='text-black font-bold text-lg'>Important guidelines:</span> 
                  1200x800 pixels or 12:8 Ratio. Supported format: <span className='text-black font-bold text-lg'>.jpg, .jpeg, or .png</span>
                </p>
                <div 
                  className='flex mt-5 gap-2 text-violet-500 font-semibold bg-[#FFEEE8] w-max p-2.5 cursor-pointer'
                  onClick={() => document.getElementById("cover")?.click()}
                >
                  <p>Upload image</p>
                  <img src={up} alt="Upload" />
                </div>
              </div>
            </div>
          </div>

          <div className='p-5 border-b'>
            <label className="mb-2.5 font-medium text-base block" htmlFor="descriptionEn">
              Course Description [En]
            </label>
            <textarea
              id="descriptionEn"
              className="mb-5 w-full h-40 p-4 placeholder:text-base bg-White/95 rounded-md"
              placeholder='Course description in English'
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
            />

            <label className="mb-2.5 font-medium text-base block" htmlFor="descriptionAr">
              Course Description [Ar]
            </label>
            <textarea
              id="descriptionAr"
              className="mb-5 w-full h-40 p-4 placeholder:text-base bg-White/95 rounded-md"
              placeholder='Course description in Arabic'
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              required
            />

            <div className='mt-5 flex justify-between'>
              <Button type='button' text='Back' textColor='border-gray border text-violet-950' onClick={handlePrev} />
              <Button type='button' text='Save & Next' textColor='text-white' onClick={handleNext} Bg='bg-violet-950' />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Curriculum */}
      {step === 3 && (
        <div className='p-5'>
          <div className='flex flex-col gap-5'>
            {lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className='bg-gray-100 p-4 rounded-md'>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='font-semibold'>Lesson {lessonIndex + 1}</h3>
                  <button
                    type='button'
                    onClick={() => removeLesson(lessonIndex)}
                    className='text-red-500 hover:text-red-700'
                  >
                    Remove Lesson
                  </button>
                </div>

                <div className='flex gap-2 mb-3'>
                  <input
                    type="text"
                    value={lesson.titleEn}
                    onChange={(e) => handleLessonChange(lessonIndex, "titleEn", e.target.value)}
                    placeholder="Lesson title in English"
                    className="w-full p-2 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    value={lesson.titleAr}
                    onChange={(e) => handleLessonChange(lessonIndex, "titleAr", e.target.value)}
                    placeholder="Lesson title in Arabic"
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>

                <textarea
                  value={lesson.descriptionEn}
                  onChange={(e) => handleLessonChange(lessonIndex, "descriptionEn", e.target.value)}
                  placeholder="Lesson description in English"
                  className="w-full p-2 rounded-md mb-3"
                  required
                />

                <textarea
                  value={lesson.descriptionAr}
                  onChange={(e) => handleLessonChange(lessonIndex, "descriptionAr", e.target.value)}
                  placeholder="Lesson description in Arabic"
                  className="w-full p-2 rounded-md mb-3"
                  required
                />

                <div className='space-y-3'>
                  {lesson.files.map((file, fileIndex) => (
                    <div key={fileIndex} className='flex items-center gap-2'>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(lessonIndex, fileIndex, e)}
                        className="flex-1 p-2 border rounded-md"
                        required={fileIndex === 0}
                      />
                      <select
                        value={file.type}
                        onChange={(e) => {
                          const updatedLessons = [...lessons];
                          updatedLessons[lessonIndex].files[fileIndex].type = 
                            e.target.value as "video" | "file";
                          setLessons(updatedLessons);
                        }}
                        className="p-2 border rounded-md"
                      >
                        <option value="video">Video</option>
                        <option value="file">File</option>
                      </select>
                      <button
                        type='button'
                        onClick={() => removeFile(lessonIndex, fileIndex)}
                        className='text-red-500 hover:text-red-700 p-2'
                        disabled={lesson.files.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => addFile(lessonIndex)}
                    className='bg-blue-500 text-white p-2 rounded-md text-sm'
                  >
                    Add File
                  </button>
                </div>
              </div>
            ))}

            <button
              type='button'
              onClick={addLesson}
              className='bg-violet-500 text-white p-2 rounded-md self-start'
            >
              Add Lesson
            </button>
          </div>

          <div className='mt-5 flex justify-between'>
            <Button type='button' text='Back' textColor='border-gray border text-violet-950' onClick={handlePrev} />
            <Button type='button' text='Save & Next' textColor='text-white' onClick={handleNext} Bg='bg-violet-950' />
          </div>
        </div>
      )}

      {/* Step 4: Publish Course */}
      {step === 4 && (
        <div className='p-5 min-h-screen flex flex-col items-center justify-center'>
          <div className='bg-gray-100 p-8 rounded-lg max-w-2xl w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Review Your Course</h2>
            
            <div className='space-y-4 mb-8'>
              <div>
                <h3 className='font-semibold'>Course Title:</h3>
                <p>English: {titleEn}</p>
                <p>Arabic: {titleAr}</p>
              </div>

              <div>
                <h3 className='font-semibold'>Category:</h3>
                <p>
                  {categories.find(c => String(c.id) === category_id)?.name || 'Not selected'} / 
                  {subCategories.find(s => String(s.id) === subCategory_id)?.name || 'Not selected'}
                </p>
              </div>

              <div>
                <h3 className='font-semibold'>Details:</h3>
                <p>Level: {level}</p>
                <p>Duration: {duration}</p>
                <p>Price: {price}</p>
              </div>

              <div>
                <h3 className='font-semibold'>Lessons:</h3>
                <ul className='list-disc pl-5'>
                  {lessons.map((lesson, index) => (
                    <li key={index}>
                      {lesson.titleEn} ({lesson.files.length} files)
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='flex justify-between'>
              <Button type='button' text='Back' textColor='border-gray border text-violet-950' onClick={handlePrev} />
              <Button type='submit' text='Publish Course' textColor='text-white' Bg='bg-violet-950' />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}