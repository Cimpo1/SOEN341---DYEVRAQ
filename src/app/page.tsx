"use client"; // Required for Next.js App Router (if using client-side components)

import React, { CSSProperties } from "react";


export default function LandingPage() {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>DYEVRAQ</h1>
        <div>
          <a href="/login" style={styles.buttonLogin}>Login</a>
          <a href="/signup" style={styles.buttonSignup}>Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Stay Connected, Anytime, Anywhere.</h2>
          <p style={styles.heroText}>
          DYEVRAQ is a texting platform that allows you to instantly connect with your friends, team, or community.
          </p>
          <div style={styles.heroButtons}>
            <a href="/signup" style={styles.buttonPrimary}>Get Started</a>
            <a href="/features" style={styles.buttonSecondary}>Learn More</a>
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
            <p style={styles.featureText}>Fast and reliable messaging with your contacts.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureHeading}>Community Server</h3>
            <p style={styles.featureText}>Create public or private channels for your teams or friends.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureHeading}>Secure & Easy Access</h3>
            <p style={styles.featureText}>Your privacy and security are our top priorities.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join Millions of Users Today</h2>
        <p style={styles.ctaText}>Create your free account and start chatting instantly.</p>
        <a href="/signup" style={styles.buttonSignupLarge}>Get Started</a>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2025 DYEVRAQ. All rights reserved.</p>
      </footer>
    </div>
  );
}

/** Inline Styles Object with Correct Type Definitions */
const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: "#111",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin:"-10px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#222",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    fontSize: "27px",
    paddingLeft: "20px",
    fontWeight: "bold",
    color: "#A5B4FC",
  },
  buttonLogin: {
    marginRight: "12px",
    padding: "10px 16px",
    backgroundColor: "#4F46E5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  buttonSignup: {
    padding: "10px 16px",
    backgroundColor: "#10B981",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  heroSection: {
    display: "flex",
    flexDirection: "column" as "column", // Fix TypeScript error
    alignItems: "center",
    textAlign: "center" as "center", // Fix TypeScript error
    padding: "60px 20px",
    backgroundColor: "#1E1E1E",
  },
  heroContent: {
    maxWidth: "600px",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#A5B4FC",
  },
  heroText: {
    fontSize: "18px",
    color: "#bbb",
    marginTop: "10px",
  },
  heroButtons: {
    marginTop: "20px",
  },
  buttonPrimary: {
    padding: "12px 20px",
    backgroundColor: "#4F46E5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    marginRight: "10px",
  },
  buttonSecondary: {
    padding: "12px 20px",
    backgroundColor: "#555",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  heroImageContainer: {
    marginTop: "50px",
    marginBottom: "-10px",
  },
  heroImage: {
    width: "100%",
    maxWidth: "20%",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  featuresSection: {
    padding: "60px 20px",
    backgroundColor: "#222",
    textAlign: "center" as "center",
  },
  featuresTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#A5B4FC",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap" as "wrap",
    gap: "20px",
    marginTop: "30px",
  },
  featureBox: {
    padding: "20px",
    backgroundColor: "#333",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center" as "center",
  },
  featureHeading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#818CF8",
  },
  featureText: {
    color: "#bbb",
    marginTop: "10px",
  },
  ctaSection: {
    padding: "40px 20px",
    textAlign: "center" as "center",
  },
  ctaTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#A5B4FC",
  },
  ctaText: {
    color: "#bbb",
    marginTop: "10px",
  },
  buttonSignupLarge: {
    display: "inline-block",
    marginTop: "20px",
    padding: "14px 24px",
    backgroundColor: "#10B981",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "18px",
  },
  footer: {
    backgroundColor: "#222",
    textAlign: "center" as "center",
    padding: "16px",
    marginTop: "auto",
  },
  footerText: {
    color: "#bbb",
  },
};
