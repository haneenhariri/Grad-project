
import { data } from '../../data/HeadCourse';
import { useTranslation } from 'react-i18next';

export default function Head({step} : {step : number}) {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
        <div className=" gap-3  flex  items-center border-b">
          {data.map((e,i) => 
          (
          <div key={i} className={`${step == e.step ? "text-violet-600 border-b min-w-max border-violet-600  font-bold p-2 sm:p-5 text-center  gap-2 h-full flex flex-col sm:flex-row items-center" : "p-2 sm:p-5 text-center min-w-max  gap-2 h-full flex flex-col sm:flex-row items-center"}`}>
              <img src={e.icon} alt={e.title} />
              <span>{t((e.title))}</span>
          </div>
          ))}
        </div>
    </div>
  )
}
