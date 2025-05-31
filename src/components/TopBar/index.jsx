import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import AddPhoto from "../AddPhoto";

function TopBar({ loggedInUser, onLogout, onPhotoAdded }) {
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
            <Button
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={() => document.getElementById("add-photo-input").click()}
            >
              Add Photo
            </Button>
            <AddPhoto onPhotoAdded={onPhotoAdded} />
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
