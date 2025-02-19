import React from "react";
import { styles } from "../../styles/styles";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>DYEVRAQ</h1>
      <div>
        <a href="/login" style={styles.buttonLogin}>
          Login
        </a>
        <a href="/signup" style={styles.buttonSignup}>
          Sign Up
        </a>
      </div>
    </nav>
  );
}
