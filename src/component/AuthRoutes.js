import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import LoginPage from "./Landing Page/LoginPage";
const AuthRoutes = () => {
    return (
        <div>
            <BrowserRouter>

                <Routes>

                    <Route exact path="/login" element={<LoginPage />} />
                </Routes>


            </BrowserRouter>
        </div>
    )
}
export default AuthRoutes;
