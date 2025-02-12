import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import { title } from "../../types/interfaces";

export default function Title({ title, p, btn, onClick }: title & { onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className=" md:mb-20 mb-10">
      <h2 className=" font-semibold sm:text-3xl text-xl text-[#0A033C]">{t(title)}</h2>
      <div className=" flex md:flex-row flex-col justify-between md:items-center items-start">
        <p className=" sm:text-base text-sm font-normal md:my-0 my-5">{t(p)}</p>
        <Button text={btn} Bg="bg-btn" textColor="text-white" onClick={onClick} />
      </div>
    </div>
  );
}
