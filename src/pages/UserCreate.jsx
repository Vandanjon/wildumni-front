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

    const [languagesList, setLanguagesList] = useState([]);

    const [sessionsList, setSessionsList] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/languages`)
            .then((res) => {
                setLanguagesList(res.data.map((el) => el.name));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/sessions`)
            .then((res) => {
                setSessionsList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [account, setAccount] = useState({
        email: "",
        password: "",
        firstName: "-",
        lastName: "-",
        userName: "-",
    });

    const [address, setAddress] = useState({
        latitude: "",
        longitude: "",
        streetNumber: 0,
        street: "-",
        city: "-",
        postcode: 0,
        region: "-",
        country: "-",
    });

    const [session, setSession] = useState([]);

    const [language, setLanguage] = useState([]);

    const [contactLink, setContactLink] = useState({
        github: "-",
        gitlab: "-",
        bitbucket: "-",
        twitter: "-",
        linkedin: "-",
    });

    const handleChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const handleChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleChangeSession = (e) => {
        const {
            target: { value },
        } = e;
        setSession(typeof value === "string" ? value.split(",") : value);
    };

    const handleChangeLanguage = (e) => {
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

    // useEffect(() => {
    //     setFormDatas({
    //         ...account,
    //         address: {
    //             ...address,
    //             streetNumber: parseInt(address.streetNumber),
    //             postcode: parseInt(address.postcode),
    //         },
    //         session: session.map((loc) => {
    //             return { location: loc };
    //         }),
    //         language: language.map((lang) => {
    //             return { name: lang };
    //         }),
    //         contactLink: [{ ...contactLink }],
    //     });
    // }, [account, address, session, language, contactLink]);

    const handleSubmit = (event) => {
        event.preventDefault();

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
                return { name: lang };
            }),
            contactLink: [{ ...contactLink }],
        });

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/users`, formDatas)
            .then((res) => {
                console.log("success");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(res.data);
                console.log(err.message);
                console.log(err.response);
            });
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
                                    {sessionsList.map((sessionItem) => (
                                        <MenuItem
                                            key={sessionItem.id}
                                            value={sessionItem.location}
                                        >
                                            <Checkbox
                                                checked={
                                                    session.indexOf(
                                                        sessionItem.id
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={`${
                                                    sessionItem.location
                                                } ${new Date(
                                                    sessionItem.startDate
                                                ).toLocaleDateString("fr-FR", {
                                                    month: "numeric",
                                                    year: "numeric",
                                                })} - ${new Date(
                                                    sessionItem.endDate
                                                ).toLocaleDateString("fr-FR", {
                                                    month: "numeric",
                                                    year: "numeric",
                                                })}`}
                                            />
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
                                    {languagesList.map((name, index) => (
                                        <MenuItem key={index} value={name}>
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
