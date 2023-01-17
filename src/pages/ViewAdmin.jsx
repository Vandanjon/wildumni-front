import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AdminUsersAccordion from "../components/AdminUsersAccordion";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import ModalDeleteUser from "../components/ModalDeleteUser";

const ViewAdmin = () => {
    const userId = useContext(UserContext)?.user?.id;
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
            .then((res) => {
                setSelectedUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div id="AdminPage" className="pageContainer">
            <header>
                <h1>Admin Panel</h1>
                <NavBar />
            </header>

            <main>
                {users ? (
                    <AdminUsersAccordion users={users} setUsers={setUsers} />
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}

                <ModalDeleteUser user={selectedUser} />
            </main>
            <footer>
                {selectedUser
                    ? `Welcome ${selectedUser.firstName}`
                    : "Welcome Admin"}
            </footer>
        </div>
    );
};

export default ViewAdmin;
