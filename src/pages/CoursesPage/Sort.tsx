import { useTranslation } from "react-i18next";

export default function Sort({selectedOption , onClick  } : {selectedOption : string ,onClick : (e: React.ChangeEvent<HTMLSelectElement>) => void;   }) {
    const {t} = useTranslation();
  return (
    <div className="flex md:flex-row flex-col  md:gap-2.5">
    <label htmlFor="sort" className="block p-2.5">
      {t("Sort by")}
    </label>
    <select
      id="sort"
      value={selectedOption}
      onChange={onClick}
      className="bg-transparent bg-white border text-sm  py-2.5 px-2.5 md:px-5"
    >
      <option className="w-min"  value="All Courses">{t("All Courses")}</option>
      <option value="Trending">{t("Trending")}</option>
      <option value="Most Popular">{t("Most Popular")}</option>
    </select>
  </div>
  )
}
