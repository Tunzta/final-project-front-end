import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const url = "http://localhost:8081/api/user/list";
      const data = await fetchModel(url);

      if (data) {
        setUsers(data);
        setLoading(false);
      } else {
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Typography variant="body1">Loading users...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        component={Link}
        to="/"
        sx={{
          textDecoration: "none",
          color: "text.primary",
          "&:visited": {
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h5" sx={{ padding: 2 }}>
          Users
        </Typography>
      </Box>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                sx={{
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                }}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
