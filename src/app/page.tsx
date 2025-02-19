"use client"; // Required for Next.js App Router (if using client-side components)

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { styles } from "../styles/styles";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Hero Section */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Stay Connected, Anytime, Anywhere.</h2>
          <p style={styles.heroText}>
            DYEVRAQ is a texting platform that allows you to instantly connect
            with your friends, team, or community.
          </p>
          <div style={styles.heroButtons}>
            <a href="/signup" style={styles.buttonPrimary}>
              Get Started
            </a>
            <a href="/features" style={styles.buttonSecondary}>
              Learn More
            </a>
          </div>
        </div>
        <div style={styles.heroImageContainer}>
          <img src="/logo.png" alt="LOGO" style={styles.heroImage} />
        </div>
      </header>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Why Choose DYEVRAQ?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureBox}>
            <h3 style={styles.featureHeading}>Instant Messaging</h3>
            <p style={styles.featureText}>
              Fast and reliable messaging with your contacts.
            </p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureHeading}>Community Server</h3>
            <p style={styles.featureText}>
              Create public or private channels for your teams or friends.
            </p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureHeading}>Secure & Easy Access</h3>
            <p style={styles.featureText}>
              Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join Millions of Users Today</h2>
        <p style={styles.ctaText}>
          Create your free account and start chatting instantly.
        </p>
        <a href="/signup" style={styles.buttonSignupLarge}>
          Get Started
        </a>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}
