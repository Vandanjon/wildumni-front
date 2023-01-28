import { Button, Box, TextField, Snackbar, Divider, Chip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ConnectedUserContext } from "../contexts/connectedUserContext";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Logo from "../assets/logo_white.png";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [formDatas, setFormDatas] = useState({
        email: "toto@tata.com",
        password: "password",
    });

    const { connectedUser, setConnectedUser } =
        useContext(ConnectedUserContext);

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
        setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
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

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                formDatas
            );
            sessionStorage.setItem("token", res.data.token);

            const decodedJWT = jwt_decode(res.data.token);

            const connectingUser = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/${decodedJWT.id}`
            );

            setConnectedUser(connectingUser.data);

            navigate("/user");
        } catch (err) {
            if (err.code === "ERR_BAD_REQUEST") {
                setMessage("Vos identifiants sont incorrects");
                setOpen(true);
                return;
            } else {
                console.log(err);
            }
        }
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
