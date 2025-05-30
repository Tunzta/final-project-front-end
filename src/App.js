import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {Route, Routes, Navigate, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8081/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <>
      <TopBar loggedInUser={loggedInUser} onLogout={handleLogout} />
      <div className="main-topbar-buffer" />
      <Grid container spacing={2}>
        {loggedInUser ? (
          <>
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="*" element={<Navigate to={`/users/${loggedInUser._id}`} />} />
                </Routes>
              </Paper>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Paper className="main-grid-item">
              <LoginRegister onLoginSuccess={setLoggedInUser} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default App;
