import { Button, Box, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../assets/contexts/UserContext";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const { setUser } = useContext(UserContext);

    const [formDatas, setFormDatas] = useState({
        username: "oceane61@clerc.fr",
        password: "password",
    });
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

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
            setMessage("Veuillez renseigner vos identifiants");
            setOpen(true);
            return;
        }

        axios
            .post("http://localhost:8001/api/login_check", formDatas)
            .then((res) => {
                sessionStorage.setItem("token", res.data.token);

                const decodedJWT = jwt_decode(res.data.token);
                setUser(decodedJWT.roles);
                navigate("/user");
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST") {
                    setMessage("Vos identifiants sont incorrects");
                    setOpen(true);
                    return;
                }
            });
    };

    return (
        <div id="Login" className="pageContainer">
            <section className="header">
                <h1>Wildumni</h1>
            </section>

            <section className="main">
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        id="email"
                        type="text"
                        name="username"
                        value={formDatas.username}
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
                        Se Connecter
                    </Button>
                </Box>

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                >
                    <Alert severity="warning">{message}</Alert>
                </Snackbar>
            </section>

            <section className="footer">
                LE site pour trouver vos comparses alumnis de la Wild Code
                School
            </section>
        </div>
    );
};

export default Login;
