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
import TableList from "views/employee/TableList.js"; 
import UserPage from "views/UserPage.js";
import Move from "views/Move";
import Product from "views/product/Product";
import Supplier from "views/supplier/Supplier";
import Warehouses from "views/warehouse/Warehouse";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-columns",
    component: <Dashboard />,
    layout: "/main",
  },
  {
    path: "/products",
    name: "products",
    icon: "fas fa-list",
    component: <Product />,
    layout: "/main",
  },
  {
    path: "/supplier",
    name: "supplier",
    icon: "fas fa-parachute-box",
    component: <Supplier />,
    layout: "/main",
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    icon: "now-ui-icons shopping_box",
    component: <Warehouses />,
    layout: "/main",
  },
  {
    path: "/user-page",
    name: "My account",
    icon: "fas fa-user-cog",
    component: <UserPage />,
    layout: "/main",
  },
  {
    path: "/employees",
    name: "employees",
    icon: "fas fa-users",
    component: <TableList />,
    layout: "/main",
  },
  
  
];
export default dashRoutes;
