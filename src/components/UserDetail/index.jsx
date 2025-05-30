import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      const url = `http://localhost:8081/api/user/${userId}`;
      const data = await fetchModel(url);

      if (data) {
        setUser(data);
        setLoading(false);
      } else {
        setError("Failed to load user details");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ maxWidth: 600, mb: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {user.first_name} {user.last_name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Location:</strong> {user.location}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Occupation:</strong> {user.occupation}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Description:</strong> {user.description}
          </Typography>

          <Button variant="contained" component={Link} to={`/photos/${userId}`}>
            View Photos
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetail;
