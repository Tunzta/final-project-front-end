import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginRegister({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerLocation, setRegisterLocation] = useState("");
  const [registerDescription, setRegisterDescription] = useState("");
  const [registerOccupation, setRegisterOccupation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmError, setConfirmError] = useState(""); // Thêm state cho lỗi confirm

  const handleLogin = async () => {
    setError("");
    if (!loginName || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const user = await fetchModel("http://localhost:8081/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_name: loginName, password }),
      });
      if (!user) {
        setError("Wrong login name or password");
        return;
      }
      onLoginSuccess(user);
    } catch {
      setError("Server error");
    }
  };

  const handleRegister = async () => {
    setError("");
    setSuccess(""); // Reset thông báo thành công khi bắt đầu đăng ký
    if (
      !registerName ||
      !registerPassword ||
      !registerConfirm ||
      !registerFirstName ||
      !registerLastName
    ) {
      setError("Please fill in all required fields");
      return;
    }
    if (registerPassword !== registerConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetchModel("http://localhost:8081/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_name: registerName,
          password: registerPassword,
          first_name: registerFirstName,
          last_name: registerLastName,
          location: registerLocation,
          description: registerDescription,
          occupation: registerOccupation,
        }),
      });
      if (!res) {
        setError("Register failed");
        return;
      }
      setSuccess("Register success! Please login."); // Hiện thông báo thành công
      setTimeout(() => {
        setMode("login"); // Chuyển sang tab login sau 1.5 giây
        setSuccess("");
      }, 1500);
    } catch {
      setError("Server error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      mode === "login" ? handleLogin() : handleRegister();
    }
  };

  return (
    <Box
      sx={{
        height: "82vh",
        width: "96vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 260,
          maxWidth: "30%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Tabs
          value={mode}
          onChange={(_, v) => {
            setMode(v);
            setError("");
          }}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Login" value="login" />
          <Tab label="Register" value="register" />
        </Tabs>

        {mode === "login" ? (
          <LoginForm
            loginName={loginName}
            password={password}
            error={error}
            onLoginNameChange={(e) => setLoginName(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onLogin={handleLogin}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <RegisterForm
            registerName={registerName}
            registerPassword={registerPassword}
            registerConfirm={registerConfirm}
            registerFirstName={registerFirstName}
            registerLastName={registerLastName}
            registerLocation={registerLocation}
            registerDescription={registerDescription}
            registerOccupation={registerOccupation}
            error={error}
            success={success}
            confirmError={confirmError}
            onRegisterNameChange={(e) => setRegisterName(e.target.value)}
            onRegisterPasswordChange={(e) => setRegisterPassword(e.target.value)}
            onRegisterConfirmChange={(e) => {
              setRegisterConfirm(e.target.value);
              setConfirmError(
                registerPassword && e.target.value !== registerPassword
                  ? "Passwords do not match"
                  : ""
              );
            }}
            onRegisterFirstNameChange={(e) => setRegisterFirstName(e.target.value)}
            onRegisterLastNameChange={(e) => setRegisterLastName(e.target.value)}
            onRegisterLocationChange={(e) => setRegisterLocation(e.target.value)}
            onRegisterDescriptionChange={(e) => setRegisterDescription(e.target.value)}
            onRegisterOccupationChange={(e) => setRegisterOccupation(e.target.value)}
            onRegister={handleRegister}
            onKeyDown={handleKeyDown}
          />
        )}
      </Paper>
    </Box>
  );
}

export default LoginRegister;
