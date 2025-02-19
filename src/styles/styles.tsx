import { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: "#111",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "-10px",
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

export { styles };
