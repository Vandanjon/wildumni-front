import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ViewAdmin from "./pages/ViewAdmin";
import ViewUser from "./pages/ViewUser";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<ViewAdmin />} />
                <Route path="/user" element={<ViewUser />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
