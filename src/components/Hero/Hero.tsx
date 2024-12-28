import hero from '../../assets/hero/Image (15).png';
import icon from '../../assets/hero/Abstract Line (1).png';
import icon2 from '../../assets/hero/Icon (3).png';
import search from '../../assets/hero/Outline.png';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // إذا كان هناك نص في خانة البحث
    if (searchTerm.trim() !== "") {
      // إجراء البحث باستخدام query
      navigate(`/courses?query=${encodeURIComponent(searchTerm)}`);
    }
    // إغلاق خانة البحث بعد إجراء البحث
    setShowSearch(false);
  };

  return (
    <section className="relative hero flex pt-7.5 laptop:flex-row flex-col laptop:justify-between justify-around items-center">
      <div className="tablet:w-1/2 w-full flex flex-col justify-center mb-10 items-center">
        <div className="relative mb-4">
          <img src={icon} alt="icon" className="absolute sm:w-auto w-7 sm:-top-9 -top-7 -left-7" />
          <div className="bg-white flex items-center gap-5 py-2.5 sm:px-4 px-2.5 lg:w-max w-full rounded-md">
            <div className="md:w-12 md:h-12 w-7 h-7 flex justify-center items-center bg-violet-400/15 rounded-md">
              <img src={icon2} alt="icon" />
            </div>
            <h2 className="font-semibold text-[#9C4DF4] laptop:text-2xl md:text-lg sm:text-base text-sm sm:mr-5">
              {t("MainText")}
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-center mb-7.5 laptop:leading-[75px] md:leading-[60px] sm:leading-[50px] w-10/12 text-[#0A033C] laptop:text-[60px] md:text-[60px] sm:text-[45px] text-3xl">
          {t("titleHero")}
        </h2>

        {/* البحث */}
        <div className="flex bg-white tablet:w-10/12 justify-between rounded-md p-2.5">
          {/* إظهار مربع البحث عند الضغط على زر البحث */}
          <div className={`flex items-center gap-2 w-full ${showSearch ? 'block' : 'hidden'} sm:flex`}>
            <input
              type="text"
              placeholder={t('searchText')}
              className="placeholder:text-sm p-1 w-10/12 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="rounded-md sm:flex hidden items-center justify-center py-1 w-1/3 gap-2 text-white bg-[#9C4DF4]"
              onClick={handleSearchClick}
            >
              <img src={search} alt="search icon" className="w-5 h-5" />
              {t('search')}
            </button>
          </div>

          {/* زر البحث على الشاشات الصغيرة */}
          <button
            className="block sm:hidden text-white bg-[#9C4DF4] p-2 rounded-md"
            onClick={() => setShowSearch(!showSearch)} // تبديل إظهار البحث
          >
            <img src={search} alt="search icon" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <img src={hero} alt="hero-img" className="bottom-0 right-0 tablet:w-1/2 w-10/12 items-end" />
    </section>
  );
}
