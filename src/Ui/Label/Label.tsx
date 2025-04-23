import { useTranslation } from "react-i18next";

export default function Label({label} : {label : string}) {
  const { t } = useTranslation();
  return (
    <label className="mb-2.5 font-medium md:text-base text-sm block">
       {t(label)}
    </label>
  )
}
