import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "./utils/AdminRoute";
import UserRoute from "./utils/UserRoute";

import Login from "./pages/Login";
import ViewAdmin from "./pages/ViewAdmin";
import ViewUser from "./pages/ViewUser";

import UserCreate from "./pages/UserCreate";
import UserDetails from "./pages/UserDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/userCreate" element={<UserCreate />} />
                <Route path="/users/:id" element={<UserDetails />} />

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
