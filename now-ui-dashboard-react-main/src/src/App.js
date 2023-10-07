import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "views/Login";
import AdminLayout from "layouts/Admin.js";
import { useContext } from "react";
import { Appcontext } from "context/Appcontext";
export default function App() {
          const { isLoggin } = useContext(Appcontext);
          return (
                    <BrowserRouter>
                              <Routes>
                                        <Route exact path="/" element={<Login />}></Route >
                                        <Route path="/main/*" element={isLoggin? <AdminLayout />:<Navigate to={'/'}/>} />
                                        <Route path="*" element={<Navigate to="/main/dashboard" replace />} />
                              </Routes>
                    </BrowserRouter>
          );
}