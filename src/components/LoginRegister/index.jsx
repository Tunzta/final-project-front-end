import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

function LoginRegister({ onLoginSuccess }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!loginName || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login_name: loginName, password }),
      });
      if (!res.ok) {
        setError("Wrong login name or password");
        return;
      }
      const user = await res.json();
      onLoginSuccess(user);
    } catch {
      setError("Server error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
        <Typography variant="h6" textAlign="center" mb={1}>
          Please Login
        </Typography>

        <TextField
          label="Login Name"
          variant="outlined"
          size="small"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
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
          onClick={handleLogin}
          sx={{ mt: 1 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
