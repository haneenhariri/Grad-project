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
    if (searchTerm.trim() !== "") {
      navigate(`/courses?query=${encodeURIComponent(searchTerm)}`);
    }
    setShowSearch(false);
  };

  return (
    <section className="relative hero flex pt-7.5 laptop:flex-row flex-col laptop:justify-between justify-around items-center">
      <div className="tablet:w-1/2 w-full flex flex-col justify-center mb-10 items-center">
        <div className="relative mb-4">
          <img src={icon} alt="icon" className="absolute sm:w-auto w-7 sm:-top-9 -top-7 -left-7" />
        </div>
        <div className=' relative w-10/12 mb-10 text-start text-violet-600'>
        <img className='-top-8 -left-8 absolute' src={icon} alt="" />
        <p className=' text-2xl font-semibold'>Learn with</p>
        <h2 className="font-bold text-center laptop:leading-[75px] md:leading-[60px] sm:leading-[50px]  text-[#0A033C] laptop:text-[130px] my-5 md:text-[60px] sm:text-[45px] text-3xl">
        Orbah
        </h2>
        <p className=' text-2xl font-semibold text-end'>anytime anywhere</p>
        </div>
        <div className="flex bg-white tablet:w-10/12 justify-between rounded-md p-2.5">
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
