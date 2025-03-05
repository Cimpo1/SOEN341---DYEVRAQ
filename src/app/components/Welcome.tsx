import React from "react";
import Image from "next/image";

const Welcome = () => {
  const textStyle: React.CSSProperties = {
    color: "#FCE4D8",
    fontSize: "1.25rem",
    fontWeight: "600",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Open Sans', sans-serif",
    textAlign: "center",
    maxWidth: "400px",
    lineHeight: "1.5",
    letterSpacing: "0.025em",
    textShadow: `
      0 0 7px #F75590,
      0 0 10px #F75590,
      0 0 21px #F75590,
      0 0 42px #F75590
    `,
    padding: "10px",
    border: "2px solid #F75590",
    borderRadius: "10px",
    boxShadow: `
      0 0 5px #F75590,
      inset 0 0 5px #F75590,
      0 0 20px rgba(247, 85, 144, 0.5),
      inset 0 0 20px rgba(247, 85, 144, 0.5)
    `,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "2rem",
      }}
    >
      <Image
        src="/WelcomeImage.png"
        alt="Welcome"
        width={200}
        height={200}
        style={{
          marginBottom: "1.5rem",
          objectFit: "contain",
        }}
      />
      <h2 style={textStyle}>Pick a chat to get the conversation going!</h2>
    </div>
  );
};

export default Welcome;
