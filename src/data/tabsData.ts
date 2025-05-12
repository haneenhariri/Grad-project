const user_id = 2;
export const stdTabs = [
    {
        path:'/User/settings',
        text:'Settings',
    },
    {
        path:'/User/usercourse',
        text:'My Courses',
    },
    {
        path:'/User/Teachers',
        text:'Teachers',
    },
    {
        path:`/User/Message/${user_id}`,
        text:'Message',
    },
    {
        path:`/User/purchaseHistory`,
        text:'Purchase History',
    },
]

export const courseTabs =
[
    {
        path:'#Description',
        text:'Description',
    },
    {
        path:'#Attach',
        text:'Attach File',
    },
    {
        path:'#Comments',
        text:'Comments',
    },
]