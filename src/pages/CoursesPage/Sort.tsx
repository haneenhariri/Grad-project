import { useTranslation } from "react-i18next";

export default function Sort({selectedOption , onClick  } : {selectedOption : string ,onClick : (e:any) => void;   }) {
    const {t} = useTranslation();
  return (
    <div className="flex items-center gap-2.5">
    <label htmlFor="sort" className="block">
      {t("Sort by")}
    </label>
    <select
      id="sort"
      value={selectedOption}
      onChange={onClick}
      className="bg-transparent border border-violet-950 py-2.5 px-5"
    >
      <option value="All Courses">{t("All Courses")}</option>
      <option value="Trending">{t("Trending")}</option>
      <option value="Most Popular">{t("Most Popular")}</option>
    </select>
  </div>
  )
}
