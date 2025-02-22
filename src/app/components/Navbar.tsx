import React from "react";
import { styles } from "../../styles/styles";

export default function Navbar(props) {
  const session = props.SESSION;

  if (session) {
    return (
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>DYEVRAQ</h1>
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
