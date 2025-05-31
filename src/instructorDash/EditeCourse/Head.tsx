
import { data } from '../../data/HeadCourse';
import { useTranslation } from 'react-i18next';

export default function Head({step} : {step : number}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center border-b">
        {data.map((e,i) => 
        (
        <div key={i} className={`${step == e.step ? "text-violet-600 border-b border-violet-600 font-bold p-5 w-1/4 gap-2 flex items-center" : "p-5 w-1/4 gap-2 flex items-center"}`}>
            <img src={e.icon} alt={e.title} />
            <span>{t((e.title))}</span>
        </div>
        ))}
    </div>
  )
}
