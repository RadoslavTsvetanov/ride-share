import * as React from "react";
import Link from "next/link";

export default function AboutPage() {
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f7f7",
    padding: 24,
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 820,
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const buttonBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderRadius: 8,
    padding: "0 16px",
    fontWeight: 600,
    textDecoration: "none",
  };

  const primaryBtn: React.CSSProperties = {
    ...buttonBase,
    border: "1px solid #0ea5e9",
    background: "#0ea5e9",
    color: "#fff",
  };

  const ghostBtn: React.CSSProperties = {
    ...buttonBase,
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#111827",
  };

  const bulletStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: 18,
    color: "#374151",
    lineHeight: 1.6,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ margin: 0, marginBottom: 8, fontSize: 28 }}>About Ride Share</h1>
        <p style={{ marginTop: 0, color: "#666", marginBottom: 16 }}>
          A simple platform that connects drivers and passengers for convenient, reliable, and affordable trips.
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 20, justifyContent: "center" }}>
          <Link href="/auth/signin" style={primaryBtn}>Sign In</Link>
          <Link href="/auth/signup" style={ghostBtn}>Sign Up</Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18, fontWeight: 700 }}>How it works</h2>
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                padding: 12,
                color: "#374151",
                background: "#f9fafb",
                whiteSpace: "pre-wrap",
              }}
            >
              Create an account as a driver or a passenger. Drivers publish available rides, while passengers search and request seats. Reviews help everyone choose trustworthy drivers and quality rides, and you can track recent rides and company-level feedback.
            </div>
          </div>

          <div>
            <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18, fontWeight: 700 }}>Main information</h2>
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                padding: 12,
                color: "#374151",
                background: "#f9fafb",
                whiteSpace: "pre-wrap",
              }}
            >
              Fast onboarding with email and password. Transparent ratings include ride-specific and company-wide reviews. The UI is clean and responsive for quick trip discovery and posting. User data and sessions are handled securely and will be connected to the backend.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
