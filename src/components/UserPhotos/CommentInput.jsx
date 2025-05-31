import React from "react";
import { Box, TextField, Button } from "@mui/material";

function CommentInput({
  value,
  submitting,
  onChange,
  onSubmit,
  onEnter,
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Add a comment"
        variant="outlined"
        size="small"
        fullWidth
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onEnter}
        multiline
        minRows={1}
        maxRows={4}
      />
      <Button
        sx={{ mt: 1 }}
        variant="contained"
        size="small"
        disabled={submitting || !(value || "").trim()}
        onClick={onSubmit}
      >
        {submitting ? "Posting..." : "Post"}
      </Button>
    </Box>
  );
}

export default CommentInput;