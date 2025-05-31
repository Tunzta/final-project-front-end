import React from "react";
import { Card, CardMedia, CardContent, Typography, Divider } from "@mui/material";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

function PhotoCard({
  photo,
  user,
  currentUser,
  commentInput,
  submitting,
  onCommentInputChange,
  onAddComment,
  formatDateTime,
}) {
  const imageUrl = `http://localhost:8081/images/${photo.file_name}`;

  return (
    <Card sx={{ maxWidth: 600, mb: 4 }}>
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
        <CommentList comments={photo.comments} formatDateTime={formatDateTime} />
        {currentUser && (
          <CommentInput
            value={commentInput}
            submitting={submitting}
            onChange={(val) => onCommentInputChange(photo._id, val)}
            onSubmit={() => onAddComment(photo._id)}
            onEnter={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !submitting
              ) {
                e.preventDefault();
                onAddComment(photo._id);
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default PhotoCard;