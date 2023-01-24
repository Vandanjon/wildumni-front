import { Button, Box, TextField, Snackbar, Divider, Chip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Logo from "../assets/logo_white.png";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [formDatas, setFormDatas] = useState({
        password: "password",
        email: "toto@tata.com",
    });

    const token = sessionStorage.getItem("token");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

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

        if (formDatas.email === "" && formDatas.password === "") {
            setMessage("Please fill the blank fields");
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
            .post(`${import.meta.env.VITE_BACKEND_URL}/login`, formDatas)
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

                <img src={Logo} alt="the letter W in a map marker" />
            </header>

            <main>
                <LoginForm
                    formDatas={formDatas}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    open={open}
                />

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                >
                    <Alert severity="warning">{message}</Alert>
                </Snackbar>
            </main>

            <footer>
                <h2>A Wild Code School Alumni Finder</h2>
            </footer>
        </div>
    );
};

export default Login;
