"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatSidebar from "../components/ChatSidebar";
import { styles } from "../../styles/styles";

interface HomeContentProps {
  initialSession: any;
}

export default function HomeContent({ initialSession }: HomeContentProps) {
  return (
    <div style={styles.container}>
      <Navbar SESSION={initialSession}></Navbar>

      <div style={{ display: "flex" }}>
        <ChatSidebar session={initialSession} />
        <div>
          <h1>LOGIC TO CREATE USER INFORMATION NEEDS TO BE CREATED</h1>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
