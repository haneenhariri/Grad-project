import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import { title } from "../../types/interfaces";

export default function Title({ title, p, btn, onClick }: title & { onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className=" mb-20">
      <h2 className=" font-semibold text-3xl text-[#0A033C]">{t(title)}</h2>
      <div className=" flex justify-between items-center">
        <p className=" font-normal">{t(p)}</p>
        <Button text={btn} Bg="bg-btn" textColor="text-white" onClick={onClick} />
      </div>
    </div>
  );
}
