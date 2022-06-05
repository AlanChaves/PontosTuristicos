import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../pages/home";
import NewPontoPage from "../pages/ponto";
import EditPontoPage from "../pages/ponto/edit";

const MainRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="ponto" element={<NewPontoPage />} />
                <Route path="ponto/:id" element={<EditPontoPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;
