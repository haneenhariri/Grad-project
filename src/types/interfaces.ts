
export interface logbtn {
  btn: string;
}

export interface NavProps
{
    pathLink : string;
    title : string;
    icon : string ;
}
export interface form 
{
    title : string;
    formText: string;
    LogBtn : string;

};
export interface AddCommentProps {
    lesson_id: number;
    onCommentAdded: () => void;
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
    num: string;
    h : string;
    p : string;
}

export interface CouCard 
{
  mainCategoryName: string;
  linkPath?:string
    btn?:string;
    Bg?:string
    instructor?: string;
    duration?: number;
    rating: number | null;
    title: string;
    price?: number;
    cover?: string;
    id: number;
    level:string;
    description?: string
    
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
}

export interface Lesson {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  files: LessonFile[];
}

