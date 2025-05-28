import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLanguage } from "../../redux/languageSlice/languageSlice";

export default function LanguageSelector() {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.language.lang);
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;
        document.body.style.textAlign = language === "ar" ? "right" : "left";
    }, [language, i18n]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = e.target.value as 'ar' | 'en';
        dispatch(setLanguage(selectedLang));
    };

    return (
        <select
            value={language}
            onChange={handleChange}
            className="bg-transparent text-white bg-black  font-medium text-sm border-0"
        >
            <option className=" text-black" value="en">English</option>
            <option  className=" text-black" value="ar">العربية</option>
        </select>
    );
}
