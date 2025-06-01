const user_id = 2;
export const stdTabs = [
    {
        path:'/User/dash',
        text:'navigation.DashBoard',
    },
    {
        path:'/User/settings',
        text:'navigation.Settings',
    },
    {
        path:'/User/usercourse',
        text:'navigation.My Courses',
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
        path:`/User/wishlist`,
        text:'Wishlist',
    },
    {
        path:`/User/purchaseHistory`,
        text:'Purchase History',
    },
    {
        path:`/User/TestResults`,
        text:'navigation.Test results',
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