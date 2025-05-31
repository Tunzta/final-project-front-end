import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function AddPhoto({ onPhotoAdded }, ref) {
  const fileInputRef = React.useRef();
  const navigate = useNavigate();
  const { userId: currentUserIdInUrl } = useParams();

  // gọi từ TopBar khi bấm nút
  React.useImperativeHandle(
    // gọi openFileDialog từ ref
    ref,
    () => ({
      openFileDialog: () => fileInputRef.current.click(),
    }),
    []
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const data = await fetchModel(
        "http://localhost:8081/api/photosOfUser/photos/new",
        {
          method: "POST",
          body: formData,
          // Không cần headers, fetchModel sẽ tự thêm Authorization nếu có token
          // Không set Content-Type khi dùng FormData!
          credentials: "include",
        }
      );

      if (data && data.photo) {
        alert("Photo uploaded!");
        if (onPhotoAdded) onPhotoAdded(data.photo);
        if (currentUserIdInUrl !== data.photo.user_id) {
          navigate(`/photos/${data.photo.user_id}`);
        }
      } else {
        alert("Failed to upload photo: " + (data?.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading photo.");
    }
    event.target.value = "";
  };

  return (
    <input
      id="add-photo-input"
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
}

export default React.forwardRef(AddPhoto);