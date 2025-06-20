import icon from '../../assets/hero/Abstract-Line.webp';
import './hero.css';
import { useTranslation } from 'react-i18next';

import Search from './Search';
import InemationSide from './InemationSide';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero px-4 flex pt-[108px] md:flex-row flex-col laptop:justify-between justify-around items-center">
      <div className="lg:w-1/2 w-full my-5 flex flex-col justify-center items-center z-10">
        <div className='relative  flex lg:justify-start justify-center flex-col lg:items-start items-center lg:w-10/12 md:mb-10 mb-2.5 lg:text-start'>
          <img loading="lazy" className='sm:ltr:-top-8 -top-7 sm:ltr:-left-8 ltr:-left-2 rtl:-right-2 md:w-auto w-7 md:rtl:-right-8 md:rtl:-top-8 rtl:rotate-90 absolute' src={icon} alt="" />
          
          <h2 className='md:text-start font-tajawal text-center w-full lg:text-6xl font-bold text-white md:text-5xl text-3xl lg:w-10/12 mb-5'>
            <span className='text-violet-950'>{t('hero.Studying')}</span> {t('hero.text1')}
          </h2>
          
          <p className=' lg:text-start text-center text-white font-light md:text-base text-sm lg:w-3/4 w-full mb-10'>
            <span className='font-bold text-violet-950'>{t('Logo.logo')}</span> {t('hero.text2')}
          </p>
          <Search/>
          
        </div>
      </div>
      <InemationSide/>

    </section>
  );
}
