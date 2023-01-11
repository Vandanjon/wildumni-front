import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField } from "@mui/material";

const ViewAdmin = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [users, setUsers] = useState([
        {
            firstName: "-",
            lastName: "-",
            userName: "-",
            email: "-",
            sessionLocation: "-",
            address: {},
        },
    ]);

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

    const [modalTitle, setModalTitle] = useState("");
    const [modalFormDatas, setModalFormDatas] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
    });
    const handleChangeFormDatas = (e) => {
        setModalFormDatas({
            ...modalFormDatas,
            [e.target.name]: e.target.value,
        });
    };

    const edit = (user) => {
        // axios
        //     .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => console.log(err));
        console.log(user);
        setModalTitle(`Edit User #${user.id}`);
        setModalFormDatas({
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
        });
        setOpen(true);
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    console.log(modalFormDatas);
    return (
        <div id="AdminPage" className="pageContainer">
            <header>
                <h1>Admin Panel</h1>
                <NavBar />
            </header>

            <main>
                {users ? (
                    users.map((user) => (
                        <div className="userInfos" key={user.id}>
                            <Accordion
                                expanded={expanded === `panel${user.id}`}
                                onChange={handleChange(`panel${user.id}`)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${user.id}bh-content`}
                                    id={`panel${user.id}bh-header`}
                                >
                                    <Typography className="leftSide">
                                        <EditIcon onClick={() => edit(user)} />
                                        <DeleteIcon />
                                    </Typography>
                                    <Typography className="middle">
                                        AVATAR
                                    </Typography>
                                    <Typography className="rightSide">
                                        {user.userName}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>Firstname : {user.firstName}</li>
                                        <li>Lastname : {user.lastName}</li>
                                        <li>Email : {user.email}</li>

                                        {
                                            // JSON.stringify(user.address) !== "{}"
                                            user.address.street !== "" &&
                                            user.address.postcode !== "" &&
                                            user.address.city !== "" &&
                                            user.address.region !== "" &&
                                            user.address.country !== "" ? (
                                                <li>
                                                    Address :
                                                    {user.address.street},{" "}
                                                    {user.address.postcode}{" "}
                                                    {user.address.city} -
                                                    {user.address.region}{" "}
                                                    {user.address.country}
                                                </li>
                                            ) : (
                                                ""
                                            )
                                        }
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}
            </main>
            <footer>Welcome</footer>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {modalTitle}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Firstname"
                            variant="outlined"
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={modalFormDatas.firstName}
                            onChange={handleChangeFormDatas}
                        />
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={modalFormDatas.lastName}
                            onChange={handleChangeFormDatas}
                        />
                        <TextField
                            label="Username"
                            variant="outlined"
                            id="userName"
                            type="text"
                            name="userName"
                            value={modalFormDatas.userName}
                            onChange={handleChangeFormDatas}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            id="email"
                            type="text"
                            name="email"
                            value={modalFormDatas.email}
                            onChange={handleChangeFormDatas}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={handleClose}>Validate</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ViewAdmin;
