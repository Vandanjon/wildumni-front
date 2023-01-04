import { Button, Divider, TextField, Stack, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef } from "react";
import React from "react";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClick1 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        if (!userName || !password) {
            setMessage("Veuillez renseigner vos identifiants");
            setOpen(true);
            return;
        }

        console.log("toto");
        axios
            .post(
                // `${import.meta.env.VITE_BACKEND_URL}login`,
                "http://localhost:8001/api/login_check",
                {
                    username: userName,
                    password: password,
                }
                // { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                // setUser(res.data);
                // if (res.data.company_group_id === 1) {
                //     navigate("/commercant/produits");
                // } else if (res.data.company_group_id === 2) {
                //     navigate("/fournisseur/produits");
                // }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div id="Login" className="pageContainer">
            <section className="header">
                <h1>Wildumni</h1>
            </section>

            <section className="main">
                <TextField
                    // id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    id="username"
                    type="text"
                    name="email"
                    onChange={(event) => {
                        const input = event.target;
                        setUserName(input.value);
                    }}
                />

                <TextField
                    // id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    id="password"
                    // type="password"
                    name="password"
                    // placeholder=""
                    onChange={(event) => {
                        const input = event.target;
                        setPassword(input.value);
                    }}
                />

                <Button variant="contained" onClick={handleClick}>
                    Se Connecter
                </Button>
                <Stack>
                    <Snackbar
                        open={open}
                        autoHideDuration={2500}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success">
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </section>

            <Divider />

            <section className="footer">
                LE site pour trouver vos comparses alumnis de la Wild Code
                School
            </section>
        </div>
    );
};

export default Login;
