import React from "react";
import styled from "styled-components";

interface FirebaseImageProps {
  imagePath?: string;
  alt?: string;
}

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const FirebaseImage: React.FC<FirebaseImageProps> = ({
  imagePath = "", // Provide a default empty string if imagePath is undefined
  alt = "Image",
}) => {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/homecookhub-0.appspot.com/o/";

  const extractPath = (path: string) => {
    // Safely handle undefined or nullish values
    if (!path) return ""; // Return an empty string if path is falsy
    const match = path.match(/gs:\/\/[^\/]+\/(.+)/);
    return match ? match[1] : path;
  };

  const formattedPath = encodeURIComponent(extractPath(imagePath)).replace(
    /%2F/g,
    "/"
  );
  const imageUrl = `${baseUrl}${formattedPath}?alt=media`;

  return <StyledImage src={imageUrl} alt={alt} />;
};

export default FirebaseImage;
