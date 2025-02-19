"use client"; // Required for Next.js App Router (if using client-side components)

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { styles } from "../../styles/styles";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <Navbar></Navbar>

      <div>
        <h1>LOGIC TO CREATE USER INFORMATION NEEDS TO BE CREATED</h1>
      </div>

      <Footer></Footer>
    </div>
  );
}
