import { useState } from 'react';
import search from '../../assets/hero/Outline.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

   const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/courses?q=${searchTerm}`);
    }
  };
  return (
    <div className=" bg-white  w-10/12  p-2.5 shadow-md rounded-lg">
        <div className={`flex items-center gap-2 w-full sm:flex`}>
            <input
                type="text"
                placeholder={t('searchText')}
                className="placeholder:text-sm p-1 w-10/12 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                className="rounded-md sm:flex  hidden items-center justify-center py-1 w-1/3 gap-2 text-white bg-[#9C4DF4]"
                onClick={handleSearchClick}
            >
            <img loading="lazy" src={search} alt="search icon" className="w-5 h-5" />
                {t('search.search')}
            </button>
            <button
                className="rounded-md flex sm:hidden  items-center justify-center py-3 w-1/5 gap-2 text-white bg-[#9C4DF4]"
                onClick={handleSearchClick}
            >
            <img loading="lazy" src={search} alt="search icon" className="w-5 h-5" />
            </button>
        </div>
    </div>
  )
}
