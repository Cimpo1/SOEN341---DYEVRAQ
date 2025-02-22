import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatSidebar from "../components/ChatSidebar";
import { styles } from "../../styles/styles";
import { auth0 } from "../../../lib/auth0";

export default async function HomePage() {
  const session = await auth0.getSession();

  return (
    <div style={styles.container}>
      <Navbar SESSION={session}></Navbar>

      <div style={{ display: "flex" }}>
        <ChatSidebar session={session} />
        <div>
          <h1>LOGIC TO CREATE USER INFORMATION NEEDS TO BE CREATED</h1>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
