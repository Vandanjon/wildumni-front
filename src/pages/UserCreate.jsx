import { useContext, useState } from "react";
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    FormLabel,
    Input,
    Select,
    MenuItem,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NzM2MzA0NjgsImV4cCI6MTY3MzYzNDA2OCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Impvam8iLCJpZCI6Mn0.MR4kYf0-YmPdtIO4lv1EoRg5tG08UK_Yq30rKrhcZ5Jt1bT6Ik3x4_Z_5DrXdGrHx17ZkRn4501PGGbokkbsv7i0gpZesScG7i13D3H2sJoVpYIdzxgr0BfyGASIF7g5n7rihRKVNBDXPZhe11JF9JtxdqKOjaXkS4NK5rzZI65MTlJTP4ZDLJosnyyUznkf9ku0PeOpLrMuqD0oGJbnQi01msIR5paO72CWwPmJ_kHe11tqmw0ripcUuyhhUSJ1yYvBF4Zb4TWXWOK0MkWUgzFL9m2bbYvYaVpwMZu9mzvRRK5Ebj6Yb8A9rFnRqyDGJbSjvEJmWNjO29PzuLU1Ug";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const sessions = [
    "RemoteFR - 03/2022 - 07/2022",
    "RemoteEN - 03/2022 - 07/2022",
    "Biarritz - 03/2022 - 07/2022",
];

function getStyles(session, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(session) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const UserCreate = () => {
    const { user } = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    console.log(user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [formDatas, setFormDatas] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userName: "",
        address: {
            latitude: "",
            longitude: "",
            country: "",
            region: "",
            postcode: "",
            city: "",
            street: "",
            streetNumber: "",
        },
        session: {
            location: "",
            startDate: "",
            endDate: "",
        },
        language: {
            languageName: "",
        },
        contactLink: {
            contactLinkName: "",
            contactLinkUrl: "",
        },
    });

    const handleChange = (e) => {
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
            address: {
                ...formDatas.address,
                [e.target.name]: e.target.value,
            },
            session: {
                ...formDatas.session,
                [e.target.name]: e.target.value,
            },
            language: {
                ...formDatas.language,
                [e.target.name]: e.target.value,
            },
            contactLink: {
                ...formDatas.contactLink,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if (email == "") {
            setEmailError(true);
        }
        if (password == "") {
            setPasswordError(true);
        }

        console.log(formDatas);
    };

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div id="UserCreatePage" className="pageContainer">
            <header>
                <h1>Create Account</h1>
            </header>

            <main>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        required
                        variant="outlined"
                        color="secondary"
                        type="email"
                        label="Email"
                        name="email"
                        value={formDatas.email}
                        onChange={handleChange}
                        error={emailError}
                    />

                    <FormControl
                        required
                        variant="outlined"
                        color="secondary"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        name="password"
                        value={formDatas.password}
                        onChange={handleChange}
                        error={passwordError}
                    >
                        <InputLabel htmlFor="standard-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <TextField
                        required
                        label="Latitude"
                        variant="outlined"
                        id="latitude"
                        type="number"
                        name="latitude"
                        value={formDatas.address.latitude}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        label="Longitude"
                        variant="outlined"
                        id="longitude"
                        type="number"
                        name="longitude"
                        value={formDatas.address.longitude}
                        onChange={handleChange}
                    />

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="courtesies-content"
                            id="courtesies-header"
                        >
                            <Typography>Courtesies</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                id="firstname"
                                type="text"
                                name="firstName"
                                value={formDatas.firstName}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Lastname"
                                variant="outlined"
                                id="lastname"
                                type="text"
                                name="lastName"
                                value={formDatas.lastName}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Username"
                                variant="outlined"
                                id="username"
                                type="text"
                                name="userName"
                                value={formDatas.userName}
                                onChange={handleChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="address-content"
                            id="address-header"
                        >
                            <Typography>Address</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TextField
                                label="StreetNumber"
                                variant="outlined"
                                id="streetNumber"
                                type="number"
                                name="streetNumber"
                                value={formDatas.address.streetNumber}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Street"
                                variant="outlined"
                                id="street"
                                type="text"
                                name="street"
                                value={formDatas.address.street}
                                onChange={handleChange}
                            />

                            <TextField
                                label="City"
                                variant="outlined"
                                id="city"
                                type="text"
                                name="city"
                                value={formDatas.address.city}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Postcode"
                                variant="outlined"
                                id="postcode"
                                type="number"
                                name="postcode"
                                value={formDatas.address.postcode}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Region"
                                variant="outlined"
                                id="region"
                                type="text"
                                name="region"
                                value={formDatas.address.region}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Country"
                                variant="outlined"
                                id="country"
                                type="text"
                                name="country"
                                value={formDatas.address.country}
                                onChange={handleChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="session-content"
                            id="session-header"
                        >
                            <Typography>Session</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-name-label">
                                    Session
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange2}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {sessions.map((session) => (
                                        <MenuItem
                                            key={session}
                                            value={session}
                                            style={getStyles(
                                                session,
                                                personName,
                                                theme
                                            )}
                                        >
                                            {session}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Location"
                                variant="outlined"
                                id="location"
                                type="text"
                                name="location"
                                value={formDatas.session.location}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Start Date"
                                variant="outlined"
                                id="startDate"
                                type="month"
                                name="startDate"
                                value={formDatas.session.startDate}
                                onChange={handleChange}
                            />

                            <TextField
                                label="End Date"
                                variant="outlined"
                                id="endDate"
                                type="month"
                                name="endDate"
                                value={formDatas.session.endDate}
                                onChange={handleChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="language-content"
                            id="language-header"
                        >
                            <Typography>Language(s)</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TextField
                                label="Language"
                                variant="outlined"
                                id="languageName"
                                type="text"
                                name="languageName"
                                value={formDatas.language.languageName}
                                onChange={handleChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="contact-content"
                            id="contact-header"
                        >
                            <Typography>Contact Link(s)</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TextField
                                label="Contact Link Url"
                                variant="outlined"
                                id="contactLinkUrl"
                                type="text"
                                name="contactLinkUrl"
                                value={formDatas.contactLink.contactLinkUrl}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Contact Link Category"
                                variant="outlined"
                                id="contactLinkName"
                                type="text"
                                name="contactLinkName"
                                value={formDatas.contactLink.contactLinkName}
                                onChange={handleChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Button variant="contained" type="submit">
                        Create account
                    </Button>
                </form>
            </main>
            <footer></footer>
        </div>
    );
};

export default UserCreate;
