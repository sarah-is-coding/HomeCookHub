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
  imagePath = "",
  alt = "Image",
}) => {
  const extractPath = (path: string) => {
    if (!path) return "";
    const match = path.match(/gs:\/\/[^\/]+\/(.+)/);
    return match ? match[1] : path;
  };

  const formattedPath = encodeURIComponent(extractPath(imagePath)).replace(
    /%2F/g,
    "/"
  );

  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/homecookhub-0.appspot.com/o/";
  const imageUrl = `${baseUrl}${formattedPath}?alt=media`;

  return <StyledImage src={imageUrl} alt={alt} />;
};

export default FirebaseImage;
