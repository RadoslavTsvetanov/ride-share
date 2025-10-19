import * as React from "react";

type Role = "driver" | "passenger";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<Role>("passenger");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Replace this with actual API call
      // await api.signup({ email, password, role });
      console.log("Signup attempt:", { email, passwordMasked: "***", role });
      alert(`Registered as ${role}.`);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7f7", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h1 style={{ margin: 0, marginBottom: 8, fontSize: 24 }}>Create your account</h1>
        <p style={{ marginTop: 0, color: "#666", marginBottom: 20 }}>Sign up to start carpooling.</p>

        {error && (
          <div style={{ marginBottom: 12, padding: "8px 12px", background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7", borderRadius: 8 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  height: 40,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  padding: "0 12px",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  height: 40,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  padding: "0 12px",
                  outline: "none",
                }}
              />
            </label>

            <fieldset style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
              <legend style={{ padding: "0 6px", fontWeight: 600 }}>Account type</legend>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="role"
                    value="driver"
                    checked={role === "driver"}
                    onChange={() => setRole("driver")}
                  />
                  <span>Register as a Driver</span>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="role"
                    value="passenger"
                    checked={role === "passenger"}
                    onChange={() => setRole("passenger")}
                  />
                  <span>Register as a Passenger</span>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              style={{
                height: 42,
                borderRadius: 8,
                border: "1px solid #0ea5e9",
                background: submitting ? "#93c5fd" : "#0ea5e9",
                color: "#fff",
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Registering..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

