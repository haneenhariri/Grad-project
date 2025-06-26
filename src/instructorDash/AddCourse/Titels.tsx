import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";

export default function Titels({step , handlePrev} : {step : number , handlePrev : () => void }) {
  const titels = [
    {
        step : 1,
        title: "Basic Information"
    },
    {
        step : 2,
        title: "Advance Information"
    },
    {
        step : 3,
        title: "Curriculum"
    },
    {
        step : 4,
        title: "Question"
    },
  ];
  const {t} = useTranslation();
  return (
    <div className="md:p-4 p-2 flex border-b w-full items-center justify-between">
        {titels.map((e) => (
            (step === e.step ?
            (                    
                <h2 className="lg:text-2xl md:text-xl text-lg font-semibold" >
                    {t(e.title)}
                </h2>
            ) 
             : 
            (
                <h2 className=" hidden">

                </h2>
            ))
        ))}
            <Button
                type="button"
                text="Save & Preview"
                onClick={handlePrev}
                textColor="text-violet-950"
              />
    </div>
  )
}
