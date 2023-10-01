/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import Move from "views/Move";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-columns",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "products",
    icon: "fas fa-list",
    component: <Icons />,
    layout: "/admin",
  },
  
  {
    path: "/notifications",
    name: "Notifications",
    icon: "fas fa-bell",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "My account",
    icon: "fas fa-user-cog",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/employees",
    name: "employees",
    icon: "fas fa-users",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: <Move />,
    layout: "/admin",
  }
  
];
export default dashRoutes;
