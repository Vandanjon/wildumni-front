import { useContext, useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import {
    Avatar,
    Button,
    Box,
    Modal,
    Typography,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { green, blue } from "@mui/material/colors";
import ModalDeleteUser from "../components/ModalDeleteUser";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ViewAdmin = () => {
    const userId = useContext(UserContext)?.user?.id;
    const [users, setUsers] = useState([]);
    const [connectedUser, setConnectedUser] = useState();
    const [selectedUser, setSelectedUser] = useState({
        firstName: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [open, setOpen] = useState(false);

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

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const editUser = (user) => {
        console.log("edit User");
    };

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const deleteUser = (user) => {
        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
            .then((res) => {
                handleClose;
            })
            .catch((err) => {
                console.log(err);
            });

        const updatedUsers = users.filter(
            (deletedUser) => deletedUser.id !== user.id
        );
        setUsers(updatedUsers);
    };

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
                                        {user.roles.includes("ROLE_ADMIN") ? (
                                            <Avatar
                                                className="avatar"
                                                sx={{
                                                    bgcolor: green[500],
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                className="avatar"
                                                sx={{
                                                    bgcolor: blue[500],
                                                }}
                                            />
                                        )}

                                        <ListItemText
                                            className="userInfos"
                                            primary={user.firstName}
                                        />
                                        <span className="actionButtons">
                                            <EditIcon
                                                onClick={() => editUser(user)}
                                                color="primary"
                                            />
                                            <DeleteIcon
                                                onClick={() => handleOpen(user)}
                                                color="primary"
                                            />
                                        </span>
                                    </ListItem>

                                    <Divider />
                                </>
                            ))}
                        </List>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Delete user : {selectedUser.firstName}?
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                >
                                    Are you sure you want to delete this user's
                                    account?
                                </Typography>
                                <Typography>This can't be undone.</Typography>
                                <Button onClick={handleClose} autoFocus>
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() => deleteUser(selectedUser)}
                                >
                                    Validate
                                </Button>
                            </Box>
                        </Modal>

                        {/* <ModalDeleteUser
                            user={selectedUser}
                            open={isModalOpen}
                            handleClose={handleClose}
                            deleteUser={deleteUser(selectedUser)}
                        /> */}
                    </>
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}
            </main>

            <footer>
                {connectedUser
                    ? `Welcome ${connectedUser.firstName}`
                    : "Welcome Admin"}
            </footer>
        </div>
    );
};

export default ViewAdmin;
