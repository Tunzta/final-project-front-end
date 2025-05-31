import { useEffect, useState } from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import PhotoCard from "./PhotoCard";
import TopBar from "../TopBar"; // Thêm dòng này

function UserPhotos({ photoAddedFlag, setPhotoAddedFlag, onLogout, loggedInUser }) {
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
  }, [userId, photoAddedFlag]);

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

  const reloadPhotos = () => setPhotoAddedFlag((f) => !f);

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
    <>
      <TopBar
        loggedInUser={loggedInUser}
        onLogout={onLogout}
        onPhotoAdded={reloadPhotos} // truyền hàm reload
      />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>

        {photos.length === 0 ? (
          <Typography>No photos available for this user.</Typography>
        ) : (
          photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              user={user}
              currentUser={currentUser}
              commentInput={commentInputs[photo._id] || ""}
              submitting={submitting[photo._id]}
              onCommentInputChange={handleCommentInputChange}
              onAddComment={handleAddComment}
              formatDateTime={formatDateTime}
            />
          ))
        )}
      </Box>
    </>
  );
}

export default UserPhotos;
