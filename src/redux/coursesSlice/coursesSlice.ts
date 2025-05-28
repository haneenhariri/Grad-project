import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { allCourses, singleCourse, courseDataProps } from '../../services/courses';
import { handleError } from '../../utils/errorHandling';

interface CoursesState {
  courses: courseDataProps[];
  selectedCourse: courseDataProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};
// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (lang: 'ar' | 'en', { rejectWithValue }) => {
    try {
      const data = await allCourses(lang);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(handleError(error, 'Failed to fetch courses'));
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await singleCourse(id);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(handleError(error, 'Failed to fetch course'));
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<courseDataProps[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single course
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<courseDataProps>) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;



