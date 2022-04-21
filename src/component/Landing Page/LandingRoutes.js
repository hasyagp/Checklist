import React from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";

const LandingRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                {/* <Route exact path="/register" component={RegisterPage} /> */}
                {/* <Route exact path="/about" component={About} /> */}
                {/* <Route
                    path="/*"
                    render={() => {
                        return <Redirect to="/" />;
                    }}
                /> */}
            </Routes>
        </BrowserRouter>
    );
};
export default LandingRoutes;
