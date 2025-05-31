import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Link as MuiLink,
  TextField,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const fetchUserDataAndPhotos = async () => {
      try {
        const [userData, photosData, meData] = await Promise.all([
          fetchModel(`http://localhost:8081/api/user/${userId}`),
          fetchModel(`http://localhost:8081/api/photosOfUser/${userId}`),
          fetchModel(`http://localhost:8081/api/me`),
        ]);

        setUser(userData);
        setPhotos(photosData);
        setCurrentUser(meData);
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

  const handleCommentInputChange = (photoId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [photoId]: value,
    }));
  };

  const handleAddComment = async (photoId) => {
    const commentText = commentInputs[photoId]?.trim();
    if (!commentText || !currentUser) return;

    setSubmitting((prev) => ({ ...prev, [photoId]: true }));

    try {
      const newComment = await fetchModel(
        `http://localhost:8081/api/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: commentText }),
        }
      );

      const enrichedComment = {
        ...newComment,
        user: {
          _id: currentUser._id,
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
        },
      };

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? {
                ...photo,
                comments: photo.comments
                  ? [...photo.comments, enrichedComment]
                  : [enrichedComment],
              }
            : photo
        )
      );
      setCommentInputs((prev) => ({ ...prev, [photoId]: "" }));
    } catch (err) {
      alert("Could not add comment.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [photoId]: false }));
    }
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

                {/* ADD COMMENT INPUT */}
                {currentUser && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Add a comment"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={commentInputs[photo._id] || ""}
                      onChange={(e) =>
                        handleCommentInputChange(photo._id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          !submitting[photo._id]
                        ) {
                          e.preventDefault();
                          handleAddComment(photo._id);
                        }
                      }}
                      multiline
                      minRows={1}
                      maxRows={4}
                    />
                    <Button
                      sx={{ mt: 1 }}
                      variant="contained"
                      size="small"
                      disabled={
                        submitting[photo._id] ||
                        !(commentInputs[photo._id] || "").trim()
                      }
                      onClick={() => handleAddComment(photo._id)}
                    >
                      {submitting[photo._id] ? "Posting..." : "Post"}
                    </Button>
                  </Box>
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
