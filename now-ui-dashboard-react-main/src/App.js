import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "views/login/Login";
import AdminLayout from "layouts/Admin.js";
import { useContext } from "react";
import { Appcontext } from "context/Appcontext";
export default function App() {
          const { isLoggin } = useContext(Appcontext);
          return (
                    <BrowserRouter>
                              <Routes>
                                        <Route exact path="/" element={<Login />}></Route >
                                        <Route path="/main/*" element={ <AdminLayout />} />
                                        <Route path="*" element={(isLoggin)? <Navigate to="/main/dashboard" replace />:<Navigate to={'/'}/>} />
                              </Routes>
                    </BrowserRouter>
          );
}