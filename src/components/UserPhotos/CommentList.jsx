import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function CommentList({ comments, formatDateTime }) {
  if (!comments || comments.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{
          fontStyle: "italic",
          color: "text.secondary",
        }}
      >
        No comments on this photo.
      </Typography>
    );
  }

  return (
    <>
      {comments.map((comment) => (
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
      ))}
    </>
  );
}

export default CommentList;