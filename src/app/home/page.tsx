import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatSidebar from "../components/ChatSidebar";
import Welcome from "../components/Welcome";
import { styles } from "../../styles/styles";
import { auth0 } from "../../../lib/auth0";

export default async function HomePage() {
  const session = await auth0.getSession();

  return (
    <div style={styles.container}>
      <Navbar SESSION={session} />

      <div style={{ display: "flex", height: "calc(100vh - 21vh)" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ChatSidebar session={session} />
        </Suspense>
        <div style={{ flex: 1, display: "flex" }}>
          <Welcome />
        </div>
      </div>

      <Footer />
    </div>
  );
}
