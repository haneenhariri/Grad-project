export interface form 
{
    title : string;
    formText: string;
    LogBtn : string;

};

export interface btn 
{
    text?: string;
    Bg?: string;
    textColor?: string;
    onClick?: () => void;
    disabled?: boolean;
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
    instructor : string;
    weeks : string;
    level : string;
    title : string;
    des : string;
    img : string;
    id : number;
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