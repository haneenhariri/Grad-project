import { useState, useRef, useEffect } from "react";
import { CouCard } from "../../types/interfaces";
import star from '../../assets-webp/Star (3).webp';
import { useTranslation } from "react-i18next";
import PopupCard from "./PopupCard";

export default function CourseCard({
  cover,
  price,
  title,
  rating,
  duration,
  mainCategoryName,
  instructor,
  level,
  id
}: CouCard) {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // إغلاق البوب أب عند النقر خارج الكارد
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };
    
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  // تحديد موضع البوب أب بناءً على موقع الكارد في الصفحة
  const getPopupPosition = () => {
    if (!cardRef.current) return { top: false, right: false };
    
    const rect = cardRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // تحقق مما إذا كان الكارد قريبًا من أسفل الشاشة
    const isNearBottom = viewportHeight - rect.bottom < 300;
    
    // تحقق مما إذا كان الكارد قريبًا من يمين الشاشة
    const isNearRight = viewportWidth - rect.right < 300;
    
    return { top: isNearBottom, right: isNearRight };
  };

  const handleCardClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div 
      ref={cardRef}
      className="relative min-h-[333px] rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      <img 
        src={`http://127.0.0.1:8000/storage/${cover}`} 
        alt={title} 
        className="w-full h-44" 
      />
      <div className="h-fit">
        <div className="rounded-b-md bg-white p-3.5">
          <div className="flex justify-between mb-2">
            <div className="py-1 px-1.5 flex items-center bg-violet-600/10 text-xs rounded">
              {mainCategoryName}
            </div>
            <span className="text-violet-600 font-semibold">{price}$</span>
          </div>
          <h3 className="font-bold md:text-xl min-h-[3.5rem] rtl:text-lg line-clamp-2 text-base">
            {title}
          </h3>
        </div>
        <div className="border-t flex justify-between items-center bg-white p-3.5">
          <div className="flex items-center gap-1 justify-center">
            <img src={star} alt="star" className="w-4.5 h-4.5" />
            <span className="text-sm">{rating}</span>
          </div>
          <span className="text-sm">{duration} {t("weeks")}</span>
        </div>
      </div>
      
      {showPopup && (
        <PopupCard 
          rating={rating} 
          instructor={instructor} 
          duration={duration} 
          level={level} 
          id={id} 
          price={price} 
          title={title} 
          mainCategoryName={mainCategoryName}
          position={getPopupPosition()}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
