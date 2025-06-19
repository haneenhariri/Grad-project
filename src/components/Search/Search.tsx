import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";

export interface SearchProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export default function Search({ globalFilter, setGlobalFilter }: SearchProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={t("instructor.search.course placeholder")}
          className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all w-64"
        />
        <FiSearch size={16} className="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>
  );
}
