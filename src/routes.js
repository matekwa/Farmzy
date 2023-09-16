import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";
import Blogs from "views/admin/blogs"
import Partners from "views/admin/partners"
import Hero from "views/admin/hero"
import Subscribers from "views/admin/subscribers"
import Products from "views/admin/products"

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/Signup";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdChromeReaderMode,
  MdMarkAsUnread,
  MdPeopleAlt,
  MdAdjust,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Blogs",
    layout: "/admin",
    path: "blogs",
    icon: <MdChromeReaderMode className="h-6 w-6" />,
    component: <Blogs />,
  },
  {
    name: "Partners",
    layout: "/admin",
    path: "partners",
    icon: <MdPeopleAlt className="h-6 w-6" />,
    component: <Partners />,
  },
  {
    name: "Hero",
    layout: "/admin",
    path: "hero",
    icon: <MdAdjust className="h-6 w-6" />,
    component: <Hero />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdAdjust className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdAdjust className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "Newsletter Subscribers",
    layout: "/admin",
    path: "newsletter",
    icon: <MdMarkAsUnread className="h-6 w-6" />,
    component: <Subscribers />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  {
    name: "Solutions",
    layout: "/admin",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    path: "product-solutions",
    component: <Products />,
  },
  {
    name: "Statistics",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },  
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
