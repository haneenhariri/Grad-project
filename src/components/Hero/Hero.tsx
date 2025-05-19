import hero from '../../assets/hero/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min 1.png';
import icon from '../../assets/hero/Abstract Line (1).png';
import search from '../../assets/hero/Outline.png';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import heroIcon from '../../assets/hero/Group 9.png'
import heroIcon2 from '../../assets/hero/icon/Group 6 (1).png'
import email from '../../assets/hero/icon/email 2 1.png'

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <section className="hero flex pt-[108px] md:flex-row flex-col laptop:justify-between justify-around items-center">
      <div className="md:w-1/2 w-full my-5 flex flex-col justify-center items-center z-10">
        <div className='relative w-10/12 md:mb-10 mb-2.5 text-start'>
          <img className='ltr:-top-8 ltr:-left-8 rtl:-right-8 rtl:-top-8 rtl:rotate-90 absolute' src={icon} alt="" />
          
          <h2 className='hero-title lg:text-5xl text-3xl md:w-10/12 mb-5'>
            <span className='text-white'>{t('hero.Studying')}</span> {t('hero.text1')}
          </h2>
          
          <p className='hero-subtitle font-light md:text-base text-sm lg:w-3/4 w-full mb-10'>
            <span className='font-bold'>{t('Logo.logo')}</span> {t('hero.text2')}
          </p>
          
          <div className="search-container flex tablet:w-10/12 justify-between rounded-md p-2.5">
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
              onClick={() => setShowSearch(!showSearch)} 
            >
              <img src={search} alt="search icon" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className='relative md:w-1/2 flex justify-center items-end h-full overflow-hidden hero-image-container'>
        {/* إضافة الدائرة الخلفية المحسنة */}
        <div className='hero-background-circle'></div>
        
        {/* إضافة نقاط زخرفية */}
        <div className='decorative-dot dot-1'></div>
        <div className='decorative-dot dot-2'></div>
        <div className='decorative-dot dot-3'></div>
        
        <div className='floating-card w-20 z-20 h-20 bottom-32 left-0 absolute'>
          <img src={heroIcon} alt="" className='w-full h-full' />
        </div>
        
        <div className='floating-card p-2.5 bg-violet-700/15 absolute top-10 left-0 rounded-md flex rtl:flex-row-reverse justify-around items-center gap-4'>
          <img src={heroIcon2} alt="Assisted Student" className='w-10' />
          <div>
            <p className='text-base font-semibold text-white'>250k</p>
            <p className='text-xs rtl:text-base font-normal text-white'>{t('hero.text3')}</p>
          </div>
        </div>
        
        <div className='floating-card p-2.5 z-50 bg-violet-700/15 absolute bottom-24 rtl:flex-row-reverse right-10 rounded-md justify-around flex items-center gap-4'>
          <div className='flex items-center w-10 h-10 rounded-md z-50 bg-green-500 justify-center'>
            <img src={email} alt="email" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm rtl:text-lg font-semibold text-white'>{t('hero.text4')}</p>
            <p className='text-xs rtl:text-base font-normal text-white'>{t('hero.text5')}</p>
          </div>
        </div>
        
        <img src={hero} alt="hero-img" className="md:w-2/3 w-max h-full hero-image z-10" />
      </div>
    </section>
  );
}
