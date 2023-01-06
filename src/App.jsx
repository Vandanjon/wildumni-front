import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "./components/utils/AdminRoute";
import UserRoute from "./components/utils/UserRoute";

import Login from "./pages/Login";
import ViewAdmin from "./pages/ViewAdmin";
import ViewUser from "./pages/ViewUser";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <ViewAdmin />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/user"
                    element={
                        <UserRoute>
                            <ViewUser />
                        </UserRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
