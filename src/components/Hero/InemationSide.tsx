import hero from '../../assets/hero/lovely.webp';
import heroIcon from '../../assets/hero/GroupHero.webp'
import heroIcon2 from '../../assets-webp/Group 6 (1).webp'
import email from '../../assets-webp/email 2 1.webp'
import { useTranslation } from 'react-i18next';
export default function InemationSide() {
    const { t } = useTranslation();
    
    return (
        <div className=' hidden relative md:w-1/2 lg:flex justify-center items-end h-full  hero-image-container'>
        {/* إضافة الدائرة الخلفية المحسنة */}
        <div className='hero-background-circle'></div>
        
        {/* إضافة نقاط زخرفية */}
        <div className='decorative-dot dot-1'></div>
        <div className='decorative-dot dot-2'></div>
        <div className='decorative-dot dot-3'></div>
        
        <div className='floating-card w-20 z-20 h-20 bottom-32 left-0 absolute'>
          <img loading="lazy" src={heroIcon} alt="" className='w-full h-full' />
        </div>
        
        <div className='floating-card p-2.5 bg-violet-700/15 absolute top-10 left-0 rounded-md flex rtl:flex-row-reverse justify-around items-center gap-4'>
          <img loading="lazy" src={heroIcon2} alt="Assisted Student" className='w-10' />
          <div>
            <p className='text-base font-semibold text-white'>250k</p>
            <p className='text-xs rtl:text-base font-normal text-white'>{t('hero.text3')}</p>
          </div>
        </div>
        
        <div className='floating-card p-2.5 z-50 bg-violet-700/15 absolute bottom-24 rtl:flex-row-reverse right-10 rounded-md justify-around flex items-center gap-4'>
          <div className='flex items-center w-10 h-10 rounded-md z-50 bg-green-500 justify-center'>
            <img loading="lazy" src={email} alt="email" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm rtl:text-lg font-semibold text-white'>{t('hero.text4')}</p>
            <p className='text-xs rtl:text-base font-normal text-white'>{t('hero.text5')}</p>
          </div>
        </div>
        
        <img fetchPriority="high"  src={hero} alt="hero-img" className="md:w-2/3 w-max h-full hero-image z-10" />
      </div>
  )
}
