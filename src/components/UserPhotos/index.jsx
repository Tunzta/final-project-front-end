import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDataAndPhotos = async () => {
      try {
        const userUrl = `http://localhost:8081/api/user/${userId}`;
        const photosUrl = `http://localhost:8081/api/photosOfUser/${userId}`;

        const [userData, photosData] = await Promise.all([
          fetchModel(userUrl),
          fetchModel(photosUrl),
        ]);

        if (userData) setUser(userData);
        else setError("Failed to load user data");

        if (photosData) setPhotos(photosData);
        else setError("Failed to load photos");

        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUserDataAndPhotos();
  }, [userId]);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  if (loading) {
    return <Typography variant="body1">Loading photos...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 ? (
        <Typography>No photos available for this user.</Typography>
      ) : (
        photos.map((photo) => {
          const imageUrl = `http://localhost:8081/images/${photo.file_name}`;

          return (
            <Card key={photo._id} sx={{ maxWidth: 600, mb: 4 }}>
              <CardMedia
                component="img"
                height="350"
                image={imageUrl}
                alt={`Photo of ${user.first_name}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Added: {formatDateTime(photo.date_time)}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ mb: 2 }}>
                  Comments
                </Typography>
                {photo.comments && photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                    <Box
                      key={comment._id}
                      sx={{
                        mb: 2,
                        p: 1.5,
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 0.5,
                          color: "primary.main",
                        }}
                      >
                        <MuiLink
                          component={Link}
                          to={`/users/${comment.user._id}`}
                          underline="hover"
                          sx={{ fontWeight: 500 }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </MuiLink>
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            ml: 1,
                            color: "text.secondary",
                          }}
                        >
                          • {formatDateTime(comment.date_time)}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {comment.comment}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                    }}
                  >
                    No comments on this photo.
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
}

export default UserPhotos;
