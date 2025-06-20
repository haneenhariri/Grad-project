import { useTranslation } from "react-i18next";
import star from '../../assets/icons/Star (3).png';
import chart from '../../assets/bar-chart (1).png';
import clock from '../../assets/icons/Clock (1).png';
import Button from "../../Ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { CouCard } from "../../types/interfaces";
import { addWishCourse } from "../../services/wishlist";
import { showToast } from "../../utils/toast";
import { useRef, useEffect } from "react";

interface PopupCardProps extends CouCard {
  position: {
    top: boolean;
    right: boolean;
  };
  onClose: () => void;
}

export default function PopupCard({
  mainCategoryName,
  title,
  id,
  instructor,
  duration,
  rating,
  level,
  position,
  onClose
}: PopupCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  
  // تطبيق التأثير المرئي عند الظهور
  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      // تأخير قصير لتطبيق التأثير المرئي
      setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
      }, 10);
    }
    
    // تعيين z-index عالي للبوب أب الحالي
    if (popup) {
      popup.style.zIndex = '50';
    }
  }, []);
  const handleAddToWishList = async (e: React.MouseEvent) => {
  e.stopPropagation(); // منع انتشار الحدث للكارد الأصلي
  try {
    await addWishCourse(id); // انتظار النتيجة
    showToast("Added to wishlist", 'success');
  } catch (error: unknown) {
    showToast("Failed to add to wishlist", 'error');
  }
};
  const handleCourseDetail = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع انتشار الحدث للكارد الأصلي
    navigate(`/oneCourse/${id}`);
  };
  
  // تحديد موضع البوب أب
  const getPositionStyle = () => {
    const { top, right } = position;
    
    const positionStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      width: '300px',
      maxWidth: '90vw',
      opacity: 0,
      transform: 'translateY(10px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease'
    };
    
    // تحديد الموضع العمودي
    if (top) {
      positionStyle.bottom = '10%';
      positionStyle.marginBottom = '10px';
      positionStyle.transform = 'translateY(-10px)';
    } else {
      positionStyle.top = '10%';
      positionStyle.marginTop = '10px';
    }
    
    // تحديد الموضع الأفقي
    if (right) {
      positionStyle.right = '0';
    } else {
      positionStyle.left = '0';
    }
    
    return positionStyle;
  };

  return (
    <div
      ref={popupRef}
      onClick={(e) => e.stopPropagation()} // منع انتشار الحدث للكارد الأصلي
      className="bg-white rounded p-4"
      style={getPositionStyle()}
    >
      <button 
        className="absolute top-2 ltr:right-2 rtl:left-2 text-gray-500 hover:text-gray-700 bg-white rounded-full w-6 h-6 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </button>
      
      <div className="py-1 px-1.5 w-max mb-2.5 flex items-center bg-violet-600/10 text-xs rounded">
        {mainCategoryName}
      </div>
      <h3 className="font-bold md:text-xl mb-2.5 rtl:text-lg text-base">{title}</h3>
      <div className="mb-2.5">
        <p className="text-base font-semibold text-gray-600">
          {t("CoursesSection.CourseBy")}
          <span className="font-bold text-violet-700 text-lg"> {instructor}</span>
        </p>
      </div>
      <div className="flex mb-2.5 items-center gap-2">
        <img src={star} alt="star" className="w-4.5 h-4.5" />
        <p className="text-base font-semibold text-gray-600">{t("CoursesSection.Rating")}: {rating}</p>
      </div>
      <div className="flex mb-2.5 items-center gap-2">
        <img src={clock} alt="duration" className="w-4.5 h-4.5" />
        <p className="text-base font-semibold text-gray-600">{t("CoursesSection.Duration")}: {duration} {t("weeks")}</p>
      </div>
      <div className="flex mb-2.5 items-center gap-2">
        <img src={chart} alt="level" className="w-4.5 h-4.5" />
        <p className="text-base font-semibold text-gray-600">{t("CoursesSection.Level")}: {t(`CoursesSection.levels.${level}`)}</p>
      </div>
      <div className="mt-4">
        <Button 
          text="Add to Fav" 
          onClick={handleAddToWishList} 
          textColor="text-white w-full !text-lg !rounded-none" 
          Bg="bg-violet-950" 
        />
      </div>
      <div className="my-2.5">
        <Button 
          text="Course Detail" 
          textColor="text-white w-full !text-lg !rounded-none" 
          Bg="bg-violet-950" 
          onClick={handleCourseDetail} 
        />
      </div>
    </div>
  );
}
