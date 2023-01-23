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
    Checkbox,
    ListItemText,
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

const sessions = ["RemoteFR", "RemoteEN", "Biarritz"];
const languages = ["PHP", "JavaScript", "Python"];

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

    // const [languages, setLanguages] = useState([]);
    // const [sessions, setSessions] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get(`${import.meta.env.VITE_BACKEND_URL}/language`)
    //         .then((res) => {
    //             setLanguages(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const [account, setAccount] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userName: "",
    });

    const [address, setAddress] = useState({
        latitude: 0,
        longitude: 0,
        streetNumber: 0,
        street: "",
        city: "",
        postcode: 0,
        region: "",
        country: "",
    });

    const [session, setSession] = useState([]);

    const [language, setLanguage] = useState([]);

    const [contactLink, setContactLink] = useState({
        github: "",
        gitlab: "",
        bitbucket: "",
        twitter: "",
        linkedin: "",
    });

    const handleChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const handleChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleChangeSession = (e) => {
        // setSession({ ...session, [e.target.name]: e.target.value });
        const {
            target: { value },
        } = e;
        setSession(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleChangeLanguage = (e) => {
        // setLanguage({ ...language, [e.target.name]: e.target.value });
        const {
            target: { value },
        } = e;
        setLanguage(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleChangeContactLink = (e) => {
        setContactLink({ ...contactLink, [e.target.name]: e.target.value });
    };

    const [formDatas, setFormDatas] = useState();

    useEffect(() => {
        setFormDatas({
            ...account,
            address: {
                ...address,
                streetNumber: parseInt(address.streetNumber),
                postcode: parseInt(address.postcode),
            },
            session: session.map((loc) => {
                return { location: loc };
            }),
            language: language.map((lang) => {
                return { language: lang };
            }),
            contactLink: {
                ...contactLink,
            },
        });
    }, [account, address, session, language, contactLink]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // axios
        //     .post(`${import.meta.env.VITE_BACKEND_URL}/users`, formDatas)
        //     .then((res) => {
        //         console.log("success");
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //         console.log(err.response);
        //     });

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

                            <FormControl>
                                <InputLabel id="session-label">
                                    Session
                                </InputLabel>
                                <Select
                                    labelId="session-label"
                                    id="session"
                                    multiple
                                    value={session}
                                    onChange={handleChangeSession}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                >
                                    {sessions.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox
                                                checked={
                                                    session.indexOf(name) > -1
                                                }
                                            />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel id="language-label">
                                    Language
                                </InputLabel>
                                <Select
                                    labelId="language-label"
                                    id="language"
                                    multiple
                                    value={language}
                                    onChange={handleChangeLanguage}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                >
                                    {languages.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox
                                                checked={
                                                    language.indexOf(name) > -1
                                                }
                                            />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="GitHub Account"
                                variant="outlined"
                                id="github"
                                type="text"
                                name="github"
                                value={contactLink.github}
                                onChange={handleChangeContactLink}
                            />

                            <TextField
                                label="GitLab Account"
                                variant="outlined"
                                id="gitlab"
                                type="text"
                                name="gitlab"
                                value={contactLink.gitlab}
                                onChange={handleChangeContactLink}
                            />

                            <TextField
                                label="BitBucket Account"
                                variant="outlined"
                                id="bitbucket"
                                type="text"
                                name="bitbucket"
                                value={contactLink.bitbucket}
                                onChange={handleChangeContactLink}
                            />

                            <TextField
                                label="Twitter Account"
                                variant="outlined"
                                id="twitter"
                                type="text"
                                name="twitter"
                                value={contactLink.twitter}
                                onChange={handleChangeContactLink}
                            />

                            <TextField
                                label="LinkedIn Account"
                                variant="outlined"
                                id="linkedin"
                                type="text"
                                name="linkedin"
                                value={contactLink.linkedin}
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
