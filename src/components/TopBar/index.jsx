import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function TopBar({ loggedInUser, onLogout }) {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nguyễn Anh Tuấn - B22DCCN758
        </Typography>

        {loggedInUser ? (
          <>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              Hi {loggedInUser.first_name}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="h6">Photo Sharing</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
