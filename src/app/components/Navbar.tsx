import React from "react";
import { styles } from "../../styles/styles";

export default function Navbar(props) {
  const session = props.SESSION;
  const userName = session?.user?.name;

  if (session) {
    return (
      <nav style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
          <img
            src="/logo.png"
            alt="DYEVRAQ"
            style={{
              height: "auto",
              width: "6%",
              borderRadius: "45px",
              marginLeft: "8px",
            }}
          />
          <span
            style={{
              color: "#A5B4FC",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Welcome, {capitalizeName(userName)}!
          </span>
          {/* //using span so it doesnt break and keeps it inline */}
        </div>
        <div>
          <a href="/home" style={styles.buttonLogin}>
            Home
          </a>
          <a href="/auth/logout" style={styles.buttonSignup}>
            Logout
          </a>
        </div>
      </nav>
    );
  }

  function capitalizeName(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>DYEVRAQ</h1>
      <div>
        <a href="/auth/login" style={styles.buttonLogin}>
          Login
        </a>
        <a href="/auth/login?screen_hint=signup" style={styles.buttonSignup}>
          Sign Up
        </a>
      </div>
    </nav>
  );
}
