
export interface PusherMessageEvent {
  message: string;
  sender: {
    id: number;
    name: string;
    profile_picture: string;
  };
  received: {
    id: number;
    name: string;
    profile_picture: string;
  };
  timestamp: string;
}
export interface profileDataProps
{
  name : string;
  email : string;
  profile_picture : File | undefined;
  specialization?: string;
  education?: string;
  summery?: string;
}
export interface logbtn {
  btn: string;
}
export interface LocalizedText {
  en?: string;
  ar?: string;
  [key: string]: string | undefined;
}
export interface NavProps
{
    pathLink : string;
    title : string;
    icon : string ;
}
export interface CourseProgress {
  total_lessons: number;
  completed_lessons: number;
  overall_progress: number;
}

export interface CourseData {
  id: number;
  title: { en: string; ar: string };
  cover: string;
  created_at?: string;
  updated_at?: string;
  rating?: number | null;
}

export interface EnrolledCourse {
  course: CourseData;
  progress: CourseProgress;
}
export interface userCourseProp
{
  cover: string;
  title: string;
  overall_progress:number;
  completed_lessons: number;
  total_lessons: number;
  id : number;
}
export interface form 
{
    title : string;
    formText: string;
    LogBtn : string;

};
export interface CommentData {
  id: number;
  user_id: number;
  lesson_id: number;
  comment_id: number | null;
  content: string;
  created_at?: string;
  updated_at?: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
    role: string;
  };
  replies?: repliesData[]
}
export interface repliesData {
  id: number;
  user_id: number;
  lesson_id: number;
  comment_id: number | null;
  content: string;
  created_at?: string;
  updated_at?: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
    role: string;
  };
}
export interface AddCommentProps {
  lesson_id: number;
  parentCommentId?: number | null;
  onCommentAdded: () => void;
}

export interface ReplyProps {
  parentComment: CommentData;
  onReplyAdded: () => void;
}
export interface CourseTypeProps {
  id: number;
  instructor_id: number;
  duration: number;
  level: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  rating: number | null;
  sub_category_id: number;
  status: string;
  course_language: string;
  instructor: string;
  sub_category: SubCategory;
};
export interface MainCategory  {
  id: number;
  name: string;
  category_id: number | null;
};

export interface SubCategory  {
  id: number;
  name: string;
  category_id: number;
  main_category: MainCategory;
};

export interface btn 
{
    text?: string;
    Bg?: string;
    textColor?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "reset" | "submit" | undefined
}


export interface title 
{
    title : string;
    btn : string;
    p : string;
}
export interface BenfCard
{
    flex:string;
    imgRTL:string;
    img: string;
    h : string;
    p : string;
}

export interface CouCard {
  mainCategoryName: string;
  linkPath?: string;
  btn?: string;
  Bg?: string;
  instructor?: string;
  duration?: number;
  rating: number | null;
  title: string;
  price?: number;
  cover?: string;
  id: number;
  level: string;
  description?: string;
}

// إضافة واجهة جديدة للبوب أب
export interface PopupPosition {
  position?: 'top' | 'bottom';
  alignment?: 'left' | 'right';
}

export interface myCourseProp
{
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  duration: number;
  level: string;
  cover: string;
  price: number;
  instructor: string;
  sub_category: SubCategory;
  status: string;
  course_language: string;
  rating: number | null;
}
export interface Credentials {
    email: string;
    password: string;
  }
export interface UserData{
    name : string;
    email: string;
    password: string;
    password_confirmation:string
}
export interface email{
    email: string
}
export interface ResetPassword
{
    email: string;
    token: string;
    password: string;
    password_confirmation:string; 
}
export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }
  export interface tabsProps 
{
    path:string;
    text:string;
}
export interface EditProfileProps
{
    _method : string;
    name: string;
    email:string;
    profile_picture?: File;
}
export interface EditProfileInstProps
{
    _method : string;
    name: string;
    email:string;
    profile_picture?: File;
    education: string;
    specialization: string;
    summery:string;
}

export interface logoProps
{
    textColor?: string
}

export interface SliderButtonProps
{
    onClick: () => void;
    img : string;
}

export interface TitlePropsType
{
    title:string;
}

export interface stdProps
{
  par:string;
  name:string;
  img:string;
}
export interface Category {
  id: number;
  name: string;
  sub_category?: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface LessonFile {
  path: File | null;
  type: "video" | "file";
  files?: string[]; 
}

export interface Lesson {
  id : number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  files: LessonFile[];
}

export interface MessageProps {
  id: number;
  sender_id: number;
  received_id: number;
  content: string;
  created_at: string;
  updated_at : string;
  received:
  {
    id: number;
    name?: string;
    profile_picture?: string;
  };
  sender :
  {
    id: number;
    name?: string;
    profile_picture?: string;
  };
}

export interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  maxLength?: number;
  showCount?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
}
