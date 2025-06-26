import { useState } from "react";
import { dataTestmonialsLKHH } from "../../data/dataTestHH+LK";
import prev from '../../assets-webp/prev.webp';
import next from '../../assets-webp/next.webp';
import SliderButton from "./SliderButton";
import StdCard from "../StdCard/StdCard";

export default function CustomSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dataTestmonialsLKHH.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dataTestmonialsLKHH.length - 1 : prevIndex - 1
    );
  };

  const currentCard = dataTestmonialsLKHH[currentIndex];

  return (
    <div>
      <StdCard
        par={currentCard.par}
        name={currentCard.theName}
        img={currentCard.imag}
      />
      <div className="flex rtl:flex-row-reverse lg:justify-end justify-center desktop:mt-7.5 desktop:gap-[15px] gap-2.5 lg:mt-6 mt-5">
        <SliderButton img={prev} onClick={handlePrev} />
        <SliderButton img={next} onClick={handleNext} />
      </div>
    </div>
  );
}
