
import basic from '../../assets/AddCourse/Stack (1).png';
import Adv from '../../assets/AddCourse/ClipboardText.png';
import Cur from '../../assets/AddCourse/MonitorPlay.png';
import Pub from '../../assets/AddCourse/PlayCircle (1).png';
import up from '../../assets/AddCourse/UploadSimple.png';
import img from '../../assets/Image (28).png';
import Button from '../../Ui/Button/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSecureCookie } from '../../utils/cookiesHelper';
import { showToast } from '../../utils/toast';
import { useParams } from 'react-router-dom';
import { Category, Lesson, myCourseProp, SubCategory } from '../../types/interfaces';
import { allCategories, fetchSingleCourse } from '../../services/courses';
import Label from '../../Ui/Label/Label';
import { useTranslation } from 'react-i18next';

export default function AdminEditeCourse() {
  const [step, setStep] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [category_id, setCategory_id] = useState("");
  const [subCategory_id, setSubCategory_id] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const handleNext = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const token = getSecureCookie("token");
  const [courseLanguage,setCourseLanguage] = useState('');
  const [course, setCourse] = useState<myCourseProp | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]); // تأكد من أن القيمة الافتراضية مصفوفة فارغة
  const { t } = useTranslation();
  console.log(course);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("New cover file selected:", file.name, file.type, file.size);
      setCover(file);
      setPreview(URL.createObjectURL(file));
    }
  };
    const handleLessonChange = (
      lessonIndex: number,
       field: keyof Omit<Lesson, 'files' | 'id'>, 
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
          id: 0,
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
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      console.log("Selected category ID:", selectedId);
      
      setCategory_id(selectedId);
      
      // تحميل الفئات الفرعية للفئة المحددة
      const selectedCategory = categories.find(cat => String(cat.id) === selectedId);
      if (selectedCategory) {
        console.log("Found category:", selectedCategory.name);
        setSubCategories(selectedCategory.sub_category || []);
        console.log("Loaded subcategories:", selectedCategory.sub_category);
        
        // إعادة تعيين الفئة الفرعية
        setSubCategory_id("");
      } else {
        setSubCategories([]);
      }
    };
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await fetchSingleCourse(Number(id));
          console.log("API Response:", response);
          
          const courseData = response.data || response;
          console.log("Course Data:", courseData);
          
          setCourse(courseData);
          
          if (courseData && courseData.category) {
            console.log("Category Info:", {
              categoryId: courseData.category.main_category?.id,
              categoryName: courseData.category.main_category?.name,
              subCategoryId: courseData.category.id,
              subCategoryName: courseData.category.name
            });
            
            // تعيين قيمة الفئة الرئيسية
            if (courseData.category.main_category) {
              const mainCategoryId = String(courseData.category.main_category.id);
              setCategory_id(mainCategoryId);
              console.log("Setting main category ID:", mainCategoryId);
            }
            
            // تعيين قيمة الفئة الفرعية
            const subCategoryId = String(courseData.category.id);
            setSubCategory_id(subCategoryId);
            console.log("Setting sub-category ID:", subCategoryId);
          }
          
          // تعبئة الحقول بالبيانات المجلوبة
          if (courseData) {
            // تعبئة العناوين
            setTitleEn(courseData.title?.en || '');
            setTitleAr(courseData.title?.ar || '');
            
            // تعبئة الوصف
            setDescriptionEn(courseData.description?.en || '');
            setDescriptionAr(courseData.description?.ar || '');
            
            // تعبئة المستوى ولغة الكورس
            setLevel(courseData.level || '');
            setCourseLanguage(courseData.course_language || '');
            
            // تعبئة المدة والسعر
            setDuration(String(courseData.duration) || '');
            setPrice(String(courseData.price) || '');
            setCover(courseData.cover); 
            // تعبئة صورة الغلاف
            if (courseData.cover) {
              setPreview(`http://127.0.0.1:8000/storage/${courseData.cover}`);
            }
            
            // تعبئة الدروس إذا كانت متوفرة
            if (courseData.lessons && Array.isArray(courseData.lessons)) {
              // تحويل هيكل الدروس إلى الهيكل المتوقع في التطبيق
              const formattedLessons = courseData.lessons.map(lesson => ({
                id: lesson.id, // تضمين معرف الدرس
                titleEn: lesson.title?.en || '',
                titleAr: lesson.title?.ar || '',
                descriptionEn: lesson.description?.en || '',
                descriptionAr: lesson.description?.ar || '',
                files: lesson.files?.map(file => ({
                  id: file.id, // تضمين معرف الملف
                  path: file.path || null,
                  type: file.type || 'video'
                })) || []
              }));
              setLessons(formattedLessons);
            }
          }
        } catch (error) {
          showToast("Error loading course", 'error');
          console.error("Error fetching course:", error);
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
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);
    useEffect(() => {
      if (categories.length > 0 && category_id) {
        console.log("Loading subcategories for category ID:", category_id);
        const selectedCategory = categories.find(cat => String(cat.id) === category_id);
        if (selectedCategory) {
          console.log("Found category:", selectedCategory.name);
          setSubCategories(selectedCategory.sub_category || []);
          console.log("Loaded subcategories:", selectedCategory.sub_category);
        }
      }
    }, [categories, category_id]);

    async function updateCourseInfo(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      
      try {
        const formData = new FormData();
        
        // إضافة المعلومات الأساسية
        formData.append("_method", "PUT");
        formData.append("duration", duration);
        formData.append("level", level);
        formData.append("title[en]", titleEn);
        formData.append("title[ar]", titleAr);
        formData.append("description[en]", descriptionEn);
        formData.append("description[ar]", descriptionAr);
        formData.append("price", price);
        formData.append("category_id", category_id);
        formData.append("lang", "ar");
        if ( cover && typeof cover !== 'string') {
          // إذا تم تغيير الصورة، نرسل الصورة الجديدة
          formData.append("cover", cover);
        } 
         
        console.log("Sending request to:", `http://127.0.0.1:8000/api/courses/${id}?_method=PUT`);

        // إرسال طلب تحديث معلومات الكورس
        const response = await axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/courses/${id}?_method=PUT`,
          data: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });

        console.log("API Response:", response.data);
        showToast(t("dashboard.Course updated!"), 'success');
        
        // بعد نجاح تحديث معلومات الكورس، يمكن تحديث الدروس
        await updateLessons();
        
        // الانتقال إلى الخطوة التالية
        setStep(step + 1);
        
      } catch (error: any) {
        console.error("Error updating course:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          
          // عرض رسالة الخطأ من الخادم
          if (error.response.data && error.response.data.message) {
            showToast(error.response.data.message, 'error');
          } else {
            showToast(`Error updating course: ${error.message}`, 'error');
          }
        } else {
          showToast(`Error updating course: ${error.message}`, 'error');
        }
      }
    }

    // دالة لتحديث معلومات الدروس
    async function updateLessons() {
      try {
        // تحديث كل درس على حدة
        for (const lesson of lessons) {
          // تخطي الدروس التي ليس لها معرف (الدروس الجديدة)
          if (!lesson.id) {
            console.log("Skipping new lesson:", lesson);
            continue;
          }
          
          // إعداد بيانات الدرس
          const lessonData = {
            "title[en]": lesson.titleEn,
            "title[ar]": lesson.titleAr,
            "description[en]": lesson.descriptionEn,
            "description[ar]": lesson.descriptionAr
          };
          
          // إرسال طلب تحديث معلومات الدرس
          const response = await axios.put(
            `http://127.0.0.1:8000/api/lessons/${lesson.id}`,
            lessonData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          
          console.log(`Lesson ${lesson.id} updated:`, response.data);
        }
        
        showToast("All lessons updated successfully!", 'success');
      } catch (error) {
        console.error("Error updating lessons:", error);
        showToast("Error updating lessons", 'error');
      }
    }

    // دالة لإضافة ملف جديد للدرس
    async function addFileToLesson(lessonId: number, file: File, fileType: string) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileType);
        
        const response = await axios.post(
          `http://127.0.0.1:8000/api/lessons/${lessonId}/files`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        console.log(`File added to lesson ${lessonId}:`, response.data);
        showToast("File added successfully!", 'success');
        return response.data;
      } catch (error) {
        console.error("Error adding file:", error);
        showToast("Error adding file", 'error');
        throw error;
      }
    }

    // دالة لحذف ملف من الدرس
    async function deleteFileFromLesson(fileId: number) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/files/${fileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log(`File ${fileId} deleted:`, response.data);
        showToast("File deleted successfully!", 'success');
        return response.data;
      } catch (error) {
        console.error("Error deleting file:", error);
        showToast("Error deleting file", 'error');
        throw error;
      }
    }
  return (
    <div className="bg-white rounded-md">
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
        <Button type='button' text='Save & Preview' onClick={handlePrev} textColor='text-violet-950' />
      </div>
    </div>
      {/* Step 1: Basic Information */}
      <form onSubmit={updateCourseInfo}>
      {step === 1 && (
        <div className='p-5'>
          <div className='flex justify-between gap-2'>
            <div className='w-1/2'>
              <Label label="Title [en]"/>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder='Course title in English'
                type="text"
                id="titleEn"
                value={titleEn}
                onChange={(event) => setTitleEn(event.target.value)}
                required
              />
            </div>
            <div className='w-1/2'>
              <Label label="Title [ar]"/>
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder='Course title in Arabic'
                type="text"
                id="titleAr"
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
                value={category_id || ""}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option 
                    key={cat.id} 
                    value={cat.id}
                    style={String(cat.id) === String(category_id) ? {fontWeight: 'bold', color: '#8b5cf6'} : {}}
                  >
                    {cat.name} {String(cat.id) === String(category_id) ? '' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='SubCategory'/>
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="subCategory"
                value={subCategory_id || ""}
                onChange={(e) => setSubCategory_id(e.target.value)}
                required
              >
                <option value="">Select a sub-category</option>
                {subCategories.map((sub) => (
                  <option 
                    key={sub.id} 
                    value={sub.id}
                    style={String(sub.id) === String(subCategory_id) ? {fontWeight: 'bold', color: '#8b5cf6'} : {}}
                  >
                    {sub.name} {String(sub.id) === String(subCategory_id) ? '' : ''}
                  </option>
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
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='CourseLanguage' />
              <select
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                id="lang"
                value={courseLanguage}
                onChange={(e) => setCourseLanguage(e.target.value)}
                required
              >
                <option value="">Select course language</option>
                <option value="english">English</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>
            <div className='w-1/2'>
              <Label label='Duration' />
              <input
                className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                placeholder='Course duration (e.g., 2 hours)'
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
                placeholder='Course price'
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
              Course Thumbnail <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">(Required)</span>
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
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <img src={img} alt="Default cover" className="w-16 h-16 object-cover mb-2" />
                      <span className="text-red-500 text-sm">Cover image required</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  
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
                  <p>{preview ? "Change image" : "Upload image"}</p>
                  <img src={up} alt="Upload" />
                </div>
                {preview && (
                  <p className="mt-2 text-green-500">
                    Current cover image will be used. Click "Change image" to upload a new one.
                  </p>
                )}
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
              <Button type='submit' text='Update Course info' onClick={ (e) => updateCourseInfo(e)}   textColor='text-white' Bg='bg-violet-950' />
            </div>
          </div>
        </div>
      )}
      </form>
      {/* Step 3: Curriculum */}
      {step === 3 && (
        <div className='p-5'>
          <div className='flex flex-col gap-5'>
            {lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className='bg-gray-100 p-4 rounded-md mb-4'>
                {/* عرض معرف الدرس للتصحيح */}
                {lesson.id && (
                  <div className="text-xs text-gray-500 mb-2">Lesson ID: {lesson.id}</div>
                )}
                
                <div className="flex gap-2 mb-3">
                  <div className="w-1/2">
                    <label className="block mb-1">English Title:</label>
                    <input
                      type="text"
                      value={lesson.titleEn}
                      onChange={(e) => handleLessonChange(lessonIndex, "titleEn", e.target.value)}
                      placeholder="Lesson title in English"
                      className="w-full p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1">Arabic Title:</label>
                    <input
                      type="text"
                      value={lesson.titleAr}
                      onChange={(e) => handleLessonChange(lessonIndex, "titleAr", e.target.value)}
                      placeholder="Lesson title in Arabic"
                      className="w-full p-2 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <div className="w-1/2">
                    <label className="block mb-1">English Description:</label>
                    <textarea
                      value={lesson.descriptionEn}
                      onChange={(e) => handleLessonChange(lessonIndex, "descriptionEn", e.target.value)}
                      placeholder="Lesson description in English"
                      className="w-full p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1">Arabic Description:</label>
                    <textarea
                      value={lesson.descriptionAr}
                      onChange={(e) => handleLessonChange(lessonIndex, "descriptionAr", e.target.value)}
                      placeholder="Lesson description in Arabic"
                      className="w-full p-2 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                {/* عرض الملفات */}
                <div className="mb-3">
                  <label className="block mb-1">Files:</label>
                  {lesson.files.map((file, fileIndex) => (
                    <div key={fileIndex} className='flex items-center gap-2 mb-2'>
                      {/* عرض الملفات الموجودة */}
                      {file.id && (
                        <div className='flex-1 flex items-center'>
                          <span className='flex-1 p-2 border rounded-md'>
                            {file.path ? (
                              <a href={`http://127.0.0.1:8000/storage/${file.path}`} target="_blank" rel="noopener noreferrer">
                                {file.type === 'video' ? 'Video' : 'File'}: {file.path.split('/').pop()}
                              </a>
                            ) : (
                              `${file.type === 'video' ? 'Video' : 'File'} (No path)`
                            )}
                          </span>
                          <button
                            type='button'
                            onClick={() => {
                              if (file.id) {
                                deleteFileFromLesson(file.id)
                                  .then(() => {
                                    // تحديث قائمة الملفات بعد الحذف
                                    const updatedLessons = [...lessons];
                                    updatedLessons[lessonIndex].files.splice(fileIndex, 1);
                                    setLessons(updatedLessons);
                                  });
                              }
                            }}
                            className='text-red-500 hover:text-red-700 p-2'
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      
                      {/* إضافة ملفات جديدة */}
                      {!file.id && (
                        <div className='flex-1 flex items-center'>
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(lessonIndex, fileIndex, e)}
                            className="flex-1 p-2 border rounded-md"
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
                            onClick={() => {
                              if (file.path && lesson.id) {
                                addFileToLesson(lesson.id, file.path as unknown as File, file.type)
                                  .then((response) => {
                                    // تحديث قائمة الملفات بعد الإضافة
                                    const updatedLessons = [...lessons];
                                    updatedLessons[lessonIndex].files[fileIndex] = {
                                      ...file,
                                      id: response.id,
                                      path: response.path
                                    };
                                    setLessons(updatedLessons);
                                  });
                              } else {
                                showToast("Please select a file first", 'error');
                              }
                            }}
                            className='bg-green-500 text-white p-2 rounded-md'
                            disabled={!file.path}
                          >
                            Upload
                          </button>
                          <button
                            type='button'
                            onClick={() => removeFile(lessonIndex, fileIndex)}
                            className='text-red-500 hover:text-red-700 p-2'
                          >
                            Remove
                          </button>
                        </div>
                      )}
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
                
                <div className="flex gap-2">
                  <button
                    type='button'
                    onClick={() => addFile(lessonIndex)}
                    className='bg-blue-500 text-white p-2 rounded-md text-sm'
                  >
                    Add File
                  </button>
                  
                  {/* زر لحفظ تغييرات الدرس */}
                  {lesson.id && (
                    <button
                      type='button'
                      onClick={async () => {
                        try {
                          console.log(`Saving lesson ${lesson.id}...`);
                          
                          const lessonData = new URLSearchParams();
                          lessonData.append("title[en]", lesson.titleEn);
                          lessonData.append("title[ar]", lesson.titleAr);
                          lessonData.append("description[en]", lesson.descriptionEn);
                          lessonData.append("description[ar]", lesson.descriptionAr);
                          
                          console.log("Lesson data:", Object.fromEntries(lessonData));
                          
                          const response = await axios({
                            method: 'put',
                            url: `http://127.0.0.1:8000/api/lessons/${lesson.id}?lang=ar`,
                            data: lessonData,
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/x-www-form-urlencoded',
                            }
                          });
                          
                          console.log("API Response:", response.data);
                          showToast(`Lesson ${lessonIndex + 1} updated successfully!`, 'success');
                        } catch (error: any) {
                          console.error("Error updating lesson:", error);
                          if (error.response) {
                            console.error("Response data:", error.response.data);
                            console.error("Response status:", error.response.status);
                          }
                          showToast(`Error updating lesson: ${error.message}`, 'error');
                        }
                      }}
                      className='bg-green-500 text-white p-2 rounded-md text-sm'
                    >
                      Save Lesson
                    </button>
                  )}
                  
                  <button
                    type='button'
                    onClick={() => removeLesson(lessonIndex)}
                    className='bg-red-500 text-white p-2 rounded-md text-sm'
                    disabled={lessons.length <= 1}
                  >
                    Remove Lesson
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
            <Button type='button' text='Save & Next' textColor='text-white'  onClick={handleNext} Bg='bg-violet-950' />
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
              <Button type='submit' text='Publish Course' onClick={() => updateLessons()} textColor='text-white' Bg='bg-violet-950' />
            </div>
          </div>
        </div>
      )}
  </div>
  );
}
