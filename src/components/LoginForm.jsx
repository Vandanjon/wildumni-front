import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = ({ formDatas, handleChange, handleSubmit }) => {
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Email"
          variant="filled"
          id="email"
          type="text"
          name="email"
          value={formDatas.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          variant="filled"
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
          <Link to="/register">Want to create an account?</Link>
        </p>

        <a href="mailto:test@example.com?subject=Forgotten password&body=Hi, may I request a new password for this user account? Regards">
          Forgot password?
        </a>
      </div>
    </>
  );
};

export default LoginForm;
