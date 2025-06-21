import { useEffect, useState } from "react";
import { getWishList } from "../../services/wishlist";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner/Spinner";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import star from '../../assets/icons/Star (3).png';
import { addWishCourse } from "../../services/wishlist";

export interface WishlistProps {
  id: number;
  title: string;
  cover: string;
  price: number;
  instructor_name: string;
  rating: number;
}

export default function Wishlist() {
  const { t } = useTranslation();
  const [wishlist, setWishlist] = useState<WishlistProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const lang = localStorage.getItem('language') as 'ar' | 'en' || 'en';

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await getWishList(lang);
        setWishlist(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        showToast('Failed to load wishlist', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [lang]);

  const handleBuyNow = (courseId: number) => {
    navigate(`/oneCourse/${courseId}`);
  };



  const handleRemoveFromWishlist = async (courseId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addWishCourse(courseId); // استخدام نفس الدالة لإزالة الدورة من المفضلة
      setWishlist(wishlist.filter(course => course.id !== courseId));
      showToast('Course removed from wishlist', 'success');
    } catch (error) {
      console.error('Error removing course from wishlist:', error);
      showToast('Failed to remove course from wishlist', 'error');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <img src={star} alt="star" className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="text-gray-500 text-xs ml-1">({Math.floor(Math.random() * 1000)} {t('Reviews')})</span>
      </div>
    );
  };

  return (
    <section className=" min-h-screen ">
      <h2 className="text-2xl font-semibold mb-6">{t("Wishlist")} ({wishlist.length})</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : wishlist.length === 0 ? (
        <div className="bg-white rounded-md p-8 text-center">
          <p className="text-gray-500">{t("Your wishlist is empty")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-[#f1cff594] p-4 font-semibold text-gray-700">
            <div className="col-span-6">{t("navigation.Courses")}</div>
            <div className="col-span-2 text-center">{t("PRICES")}</div>
            <div className="col-span-4 text-center">{t("ACTION")}</div>
          </div>
          
          {/* Course List */}
          {wishlist.map((course, index) => (
            <div 
              key={course.id} 
              className={`grid grid-cols-12 p-4 items-center ${index !== wishlist.length - 1 ? 'border-b' : ''}`}
            >
              {/* Course Info */}
              <div className="col-span-12 sm:col-span-6 flex gap-4">
                <img 
                  src={`http://127.0.0.1:8000/storage/${course.cover}`} 
                  alt={course.title} 
                  className="w-40 h-32 object-cover rounded"
                />
                <div className=" flex flex-col justify-center">
                  <div>
                  {renderStars(course.rating)}
                  <h3 className="font-medium text-gray-800 line-clamp-2 mt-1">{course.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{t("Created by:")}{course.instructor_name}</p>
                </div>
              </div>
              
              {/* Price */}
              <div className="col-span-2 sm:col-span-2 text-center">
                <span className="text-violet-600 font-semibold">${course.price}</span>
              </div>
              
              {/* Actions */}
              <div className="col-span-10 sm:col-span-4 flex justify-center gap-2">
                <button 
                  onClick={() => handleBuyNow(course.id)}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded transition-colors"
                >
                  {t("btn.Course Detail")}
                </button>
                <button 
                  onClick={(e) => handleRemoveFromWishlist(course.id, e)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
