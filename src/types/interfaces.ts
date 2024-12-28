export interface form 
{
    title : string;
    formText: string;
    LogBtn : string;

};

export interface btn 
{
    text : string;
    Bg : string;
    textColor : string;
    onClick?: () => void;
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