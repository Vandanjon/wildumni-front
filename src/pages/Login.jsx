import { Button, Divider, TextField, Stack, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef } from "react";
import React from "react";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        if (!email || !password) {
            setMessage("Veuillez renseigner vos identifiants");
            setOpen(true);
            return;
        }

        axios
            .post(
                // `${import.meta.env.VITE_BACKEND_URL}login`,
                "http://localhost:8001/api/login_check",
                {
                    username: email,
                    password: password,
                }
                // { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
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
                    label="Email"
                    variant="outlined"
                    id="email"
                    type="text"
                    name="email"
                    onChange={(event) => {
                        const input = event.target;
                        setEmail(input.value);
                    }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password"
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

            {/* <Divider /> */}

            <section className="footer">
                LE site pour trouver vos comparses alumnis de la Wild Code
                School
            </section>
        </div>
    );
};

export default Login;
