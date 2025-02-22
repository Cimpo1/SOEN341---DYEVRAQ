"use client";

import React from "react";
import Image from "next/image";

interface UserIconProps {
  imageUrl?: string;
  size?: number;
  name?: string;
}

const UserIcon: React.FC<UserIconProps> = ({
  imageUrl,
  size = 40,
  name = "User",
}) => {
  const getFirstLetter = (name: string) => {
    return name.split(" ")[0].charAt(0).toUpperCase();
  };

  const iconStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#4F46E5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: `${size * 0.5}px`,
    fontWeight: "bold",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={iconStyle}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
        />
      ) : (
        getFirstLetter(name)
      )}
    </div>
  );
};

export default UserIcon;
