import React from "react";
import { TextField, Typography, Button } from "@mui/material";

function LoginForm({
  loginName,
  password,
  error,
  onLoginNameChange,
  onPasswordChange,
  onLogin,
  onKeyDown,
}) {
  return (
    <>
      <Typography variant="h6" textAlign="center" mb={1}>
        Please Login
      </Typography>
      <TextField
        label="Login Name"
        variant="outlined"
        size="small"
        value={loginName}
        onChange={onLoginNameChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <TextField
        label="Password"
        variant="outlined"
        size="small"
        type="password"
        value={password}
        onChange={onPasswordChange}
        onKeyDown={onKeyDown}
      />
      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onLogin}
        sx={{ mt: 1 }}
      >
        Login
      </Button>
    </>
  );
}

export default LoginForm;