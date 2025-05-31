import React from "react";
import { TextField, Typography, Button } from "@mui/material";

function RegisterForm({
  registerName,
  registerPassword,
  registerConfirm,
  registerFirstName,
  registerLastName,
  registerLocation,
  registerDescription,
  registerOccupation,
  error,
  success,
  confirmError,
  onRegisterNameChange,
  onRegisterPasswordChange,
  onRegisterConfirmChange,
  onRegisterFirstNameChange,
  onRegisterLastNameChange,
  onRegisterLocationChange,
  onRegisterDescriptionChange,
  onRegisterOccupationChange,
  onRegister,
  onKeyDown,
}) {
  return (
    <>
      <Typography variant="h6" textAlign="center" mb={1}>
        Register
      </Typography>
      <TextField
        label="Login Name"
        variant="outlined"
        size="small"
        value={registerName}
        onChange={onRegisterNameChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <TextField
        label="Password"
        variant="outlined"
        size="small"
        type="password"
        value={registerPassword}
        onChange={onRegisterPasswordChange}
        onKeyDown={onKeyDown}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        size="small"
        type="password"
        value={registerConfirm}
        onChange={onRegisterConfirmChange}
        onKeyDown={onKeyDown}
        error={!!confirmError}
        helperText={confirmError}
      />
      <TextField
        label="First Name"
        variant="outlined"
        size="small"
        value={registerFirstName}
        onChange={onRegisterFirstNameChange}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        size="small"
        value={registerLastName}
        onChange={onRegisterLastNameChange}
      />
      <TextField
        label="Location"
        variant="outlined"
        size="small"
        value={registerLocation}
        onChange={onRegisterLocationChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        size="small"
        value={registerDescription}
        onChange={onRegisterDescriptionChange}
      />
      <TextField
        label="Occupation"
        variant="outlined"
        size="small"
        value={registerOccupation}
        onChange={onRegisterOccupationChange}
      />
      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" variant="body2" textAlign="center">
          {success}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onRegister}
        sx={{ mt: 1 }}
      >
        Register
      </Button>
    </>
  );
}

export default RegisterForm;