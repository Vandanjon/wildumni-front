import { useContext, useEffect, useState } from "react";
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
import { Menu, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const UserCreate = () => {
    const { user } = useContext(UserContext);

    const locateUser = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setAddress({
                ...address,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    };

    const [account, setAccount] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userName: "",
    });

    const [address, setAddress] = useState({
        latitude: "",
        longitude: "",
        streetNumber: "",
        street: "",
        city: "",
        postcode: "",
        region: "",
        country: "",
    });

    const [session, setSession] = useState({
        location: "",
    });

    const [language, setLanguage] = useState({
        languageName: "",
    });

    const [contactLink, setContactLink] = useState({
        github: "",
    });

    const handleChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const handleChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleChangeSession = (e) => {
        setSession({ ...session, [e.target.name]: e.target.value });
    };

    const handleChangeLanguage = (e) => {
        setLanguage({ ...language, [e.target.name]: e.target.value });
    };

    const handleChangeContactLink = (e) => {
        setContactLink({ ...contactLink, [e.target.name]: e.target.value });
    };

    const [formDatas, setFormDatas] = useState();

    useEffect(() => {
        setFormDatas({
            email: account.email,
            password: account.password,
            firstName: account.firstName,
            lastName: account.lastName,
            userName: account.userName,
            address: {
                latitude: parseInt(address.latitude),
                longitude: parseInt(address.longitude),
                streetNumber: parseInt(address.streetNumber),
                street: address.street,
                city: address.city,
                postcode: parseInt(address.postcode),
                region: address.region,
                country: address.country,
            },
            session: {
                location: session.location,
            },
            language: {
                languageName: language.languageName,
            },
            contactLink: { github: contactLink.github },
        });
    }, [account, address, session, language, contactLink]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formDatas);
    };

    return (
        <div id="UserCreatePage" className="pageContainer">
            <header>
                <h1>Create Account</h1>
            </header>

            <main>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <fieldset id="credentials">
                        Credentials
                        <TextField
                            required
                            variant="outlined"
                            label="Email"
                            type="email"
                            name="email"
                            value={account.email}
                            onChange={handleChangeAccount}
                        />
                        <TextField
                            required
                            variant="outlined"
                            label="Password"
                            type="password"
                            name="password"
                            value={account.password}
                            onChange={handleChangeAccount}
                        />
                    </fieldset>

                    <fieldset id="location">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                locateUser();
                            }}
                        >
                            Locate Me
                        </Button>

                        <p>OR</p>

                        <section id="latlong">
                            <TextField
                                required
                                variant="outlined"
                                label="Latitude"
                                type="text"
                                name="latitude"
                                value={address.latitude}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                required
                                variant="outlined"
                                label="Longitude"
                                type="text"
                                name="longitude"
                                value={address.longitude}
                                onChange={handleChangeAddress}
                            />
                        </section>
                    </fieldset>

                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="optional-content"
                            id="optional-header"
                        >
                            <Typography>Optional Informations</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                id="firstname"
                                type="text"
                                name="firstName"
                                value={account.firstName}
                                onChange={handleChangeAccount}
                            />

                            <TextField
                                label="Lastname"
                                variant="outlined"
                                id="lastname"
                                type="text"
                                name="lastName"
                                value={account.lastName}
                                onChange={handleChangeAccount}
                            />

                            <TextField
                                label="Username"
                                variant="outlined"
                                id="username"
                                type="text"
                                name="userName"
                                value={account.userName}
                                onChange={handleChangeAccount}
                            />

                            <TextField
                                label="StreetNumber"
                                variant="outlined"
                                id="streetNumber"
                                type="number"
                                name="streetNumber"
                                value={address.streetNumber}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                label="Street"
                                variant="outlined"
                                id="street"
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                label="City"
                                variant="outlined"
                                id="city"
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                label="Postcode"
                                variant="outlined"
                                id="postcode"
                                type="number"
                                name="postcode"
                                value={address.postcode}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                label="Region"
                                variant="outlined"
                                id="region"
                                type="text"
                                name="region"
                                value={address.region}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                label="Country"
                                variant="outlined"
                                id="country"
                                type="text"
                                name="country"
                                value={address.country}
                                onChange={handleChangeAddress}
                            />

                            <TextField
                                select
                                variant="outlined"
                                color="secondary"
                                label="Session"
                                type="text"
                                id="location"
                                name="location"
                                value={session.location}
                                onChange={handleChangeSession}
                            >
                                <MenuItem value="RemoteFR">RemoteFR</MenuItem>
                                <MenuItem value="RemoteEN">RemoteEN</MenuItem>
                                <MenuItem value="Biarritz">Biarritz</MenuItem>
                            </TextField>

                            <TextField
                                label="Language"
                                variant="outlined"
                                id="languageName"
                                type="text"
                                name="languageName"
                                value={language.languageName}
                                onChange={handleChangeLanguage}
                            />

                            <TextField
                                label="GitHub Account"
                                variant="outlined"
                                id="github"
                                type="text"
                                name="github"
                                value={contactLink.github}
                                onChange={handleChangeContactLink}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Button variant="contained" type="submit">
                        Create account
                    </Button>
                </Box>
            </main>
        </div>
    );
};

export default UserCreate;
