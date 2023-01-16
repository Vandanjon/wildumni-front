import { Button, Box, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const token = sessionStorage.getItem("token");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [formDatas, setFormDatas] = useState({
        password: "password",
        email: "gilbert.bourgeois@laposte.net",
    });
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formDatas.email === "" || formDatas.password === "") {
            setMessage("Please fill the blank fields");
            setOpen(true);
            return;
        } else if (formDatas.username === "") {
            setMessage("Please insert your username");
            setOpen(true);
            return;
        } else if (formDatas.email === "") {
            setMessage("Please insert your email");
            setOpen(true);
            return;
        } else if (formDatas.password === "") {
            setMessage("Please insert your password");
            setOpen(true);
            return;
        }

        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/api/login_check`,
                formDatas
            )
            .then((res) => {
                sessionStorage.setItem("token", res.data.token);

                const decodedJWT = jwt_decode(res.data.token);
                setUser(decodedJWT);

                navigate("/user");
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST") {
                    setMessage("Vos identifiants sont incorrects");
                    setOpen(true);
                    return;
                } else {
                    console.log(err);
                }
            });

        return;
    };

    return (
        <div id="Login" className="pageContainer">
            <header>
                <h1>Wildumni</h1>
                <h2>a Wild Code School Alumni finder</h2>
            </header>

            <main>
                <Box component="form" noValidate autoComplete="off">
                    <h1>Login</h1>

                    <TextField
                        label="Email"
                        variant="outlined"
                        id="email"
                        type="text"
                        name="email"
                        value={formDatas.email}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        id="password"
                        name="password"
                        value={formDatas.password}
                        onChange={handleChange}
                    />

                    <Button variant="contained" onClick={handleSubmit}>
                        SIGN IN
                    </Button>
                </Box>
                <div>
                    <p>
                        <Link to="/userCreate">Want to create an account?</Link>
                    </p>

                    <p
                        onClick={() => {
                            window.open(
                                "mailto:test@example.com?subject=Forgotten password&body=Hi, may I request a new password for this user account? Regards"
                            );
                        }}
                    >
                        Forgot password?
                    </p>
                </div>

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                >
                    <Alert severity="warning">{message}</Alert>
                </Snackbar>
            </main>

            <footer>
                LE site pour trouver vos comparses alumnis de la Wild Code
                School
            </footer>
        </div>
    );
};

export default Login;
