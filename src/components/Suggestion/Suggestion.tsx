import { useTranslation } from "react-i18next"

export default function Suggestion() {
    const {t} = useTranslation()
  return (
      <div className="lg:flex hidden flex-wrap items-center gap-2.5 pt-6 pb-4 border-b border-violet-950">
        <h3>{t("Suggestion")}</h3>
        <button className="text-violet-800">user interface</button>
        <button className="text-violet-800">user experience</button>
        <button className="text-violet-800">web design</button>
        <button className="text-violet-800">interface</button>
        <button className="text-violet-800">app</button>
      </div>
  )
}
