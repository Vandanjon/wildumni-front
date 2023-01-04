import { Button, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [formDatas, setFormDatas] = useState({
        username: "",
        password: "",
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
        if (formDatas.email === "" || formDatas.password === "") {
            setMessage("Veuillez renseigner vos identifiants");
            setOpen(true);
            return;
        }

        e.preventDefault();

        axios
            .post("http://localhost:8001/api/login_check", formDatas)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
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
                <form onSubmit={(e) => e.preventDefault()}>
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
                </form>

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
