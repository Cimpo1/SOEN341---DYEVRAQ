import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatSidebar from "../components/ChatSidebar";
import { styles } from "../../styles/styles";
import { auth0 } from "../../../lib/auth0";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const session = await auth0.getSession();

  return <HomeContent initialSession={session} />;
}
