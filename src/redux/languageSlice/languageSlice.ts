// src/redux/slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguageState = {
  lang: 'ar' | 'en';
};

const initialLang = (localStorage.getItem('language') as 'ar' | 'en') || 'en';

const initialState: LanguageState = {
  lang: initialLang,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'ar' | 'en'>) => {
      state.lang = action.payload;
      localStorage.setItem('language', action.payload); // حفظ في localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
