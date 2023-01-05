import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/utils/PrivateRoute";

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
                        <PrivateRoute>
                            <ViewAdmin />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                            <ViewUser />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
