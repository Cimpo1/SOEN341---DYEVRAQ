import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import { styles } from "../../styles/styles";
import { auth0 } from "../../../lib/auth0";

export default async function HomePage() {
  const session = await auth0.getSession();

  return (
    <div style={styles.container}>
      <Navbar SESSION={session} />
      <HomeContent session={session} />
      <Footer />
    </div>
  );
}
