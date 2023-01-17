import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AdminUsersAccordion from "../components/AdminUsersAccordion";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import ModalDeleteUser from "../components/ModalDeleteUser";
import {
    Avatar,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ViewAdmin = () => {
    const userId = useContext(UserContext)?.user?.id;
    const [users, setUsers] = useState([]);
    const [connectedUser, setConnectedUser] = useState();

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
                setConnectedUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const editUser = (user) => {
        console.log(user);
    };

    const deleteUser = (user) => {
        console.log(user);
    };

    console.log(users);
    return (
        <div id="AdminPage" className="pageContainer">
            <header>
                <NavBar />

                <h1>Admin Panel</h1>
            </header>

            <main>
                {users ? (
                    <>
                        <Link to="/userCreate">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="addUser"
                            >
                                <AddIcon />
                            </Fab>
                        </Link>

                        <List
                            sx={{
                                bgcolor: "background.paper",
                            }}
                            id="usersList"
                            component="nav"
                            aria-label="users names"
                        >
                            {users.map((user) => (
                                <>
                                    <ListItem
                                        className="userLine"
                                        button
                                        key={user.id}
                                    >
                                        <Avatar className="avatar" />

                                        <ListItemText
                                            primary={user.firstName}
                                        />
                                        <span className="actionButtons">
                                            <EditIcon
                                                onClick={() => editUser(user)}
                                            />
                                            <DeleteIcon
                                                onClick={() => deleteUser(user)}
                                            />
                                        </span>
                                    </ListItem>

                                    <Divider />
                                </>
                            ))}
                        </List>
                    </>
                ) : (
                    ""
                )}
                {/* {users ? (
                    <AdminUsersAccordion users={users} setUsers={setUsers} />
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}

                <ModalDeleteUser user={connectedUser} /> */}
            </main>
            <footer>
                {connectedUser ? (
                    <div>
                        <p>PROFILE</p>
                        <p></p>
                    </div>
                ) : (
                    ""
                )}
                {connectedUser
                    ? `Welcome ${connectedUser.firstName}`
                    : "Welcome Admin"}
            </footer>
        </div>
    );
};

export default ViewAdmin;
