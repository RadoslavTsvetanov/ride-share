import * as React from "react";
import { useRouter } from "next/router";

type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

type Ride = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  reviews: Review[];
};

export default function CompanyPage() {
  const router = useRouter();
  const { companyName } = router.query as { companyName?: string };

  const displayName = React.useMemo(() => {
    if (!companyName) return "Company";
    try {
      return decodeURIComponent(companyName)
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    } catch {
      return String(companyName);
    }
  }, [companyName]);

  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!companyName) return;
    const key = String(companyName).toLowerCase();
    const map: Record<string, string> = {
      "acme-corp": "Acme Corp provides fast, affordable rides across the city with a focus on reliability and safety.",
      "ride-share-pro": "Ride Share Pro connects drivers and passengers with premium, on-time service and transparent pricing.",
      "city-cabs": "City Cabs offers 24/7 urban transportation with vetted drivers and clean vehicles.",
    };
    const fallback = `${displayName} offers reliable rides and deliveries.`;
    const value = map[key] ?? fallback;
    const t = setTimeout(() => setDescription(value), 200);
    return () => clearTimeout(t);
  }, [companyName, displayName]);

  const [recentRides] = React.useState<Ride[]>([
    {
      id: "r1",
      origin: "Downtown",
      destination: "Airport",
      date: new Date().toISOString(),
      reviews: [
        { id: "rv1", author: "Alex", rating: 5, comment: "Smooth ride and friendly driver.", date: new Date().toISOString() },
        { id: "rv2", author: "Sam", rating: 4, comment: "On time, clean car.", date: new Date().toISOString() },
      ],
    },
    {
      id: "r2",
      origin: "Central Station",
      destination: "Tech Park",
      date: new Date().toISOString(),
      reviews: [
        { id: "rv3", author: "Mia", rating: 3, comment: "Traffic was heavy, but okay overall.", date: new Date().toISOString() },
      ],
    },
  ]);

  const [companyReviews] = React.useState<Review[]>([
    { id: "cr1", author: "Jordan", rating: 5, comment: "Excellent service across the board.", date: new Date().toISOString() },
    { id: "cr2", author: "Taylor", rating: 4, comment: "Reliable and affordable.", date: new Date().toISOString() },
  ]);

  const completedTrips = React.useMemo(() => recentRides.length, [recentRides]);
  const overallScore = React.useMemo(() => {
    if (!companyReviews.length) return null;
    const avg = companyReviews.reduce((a, r) => a + r.rating, 0) / companyReviews.length;
    return Number(avg.toFixed(1));
  }, [companyReviews]);

  const cardStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const sectionTitleStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 12,
    fontSize: 18,
  };

  const badgeStyle = (rating: number): React.CSSProperties => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 999,
    background: rating >= 4 ? "#ecfdf5" : rating >= 3 ? "#eff6ff" : "#fff7ed",
    border: "1px solid #e2e8f0",
    color: "#111827",
    fontSize: 12,
    fontWeight: 600,
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", background: "#f7f7f7", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 980, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={cardStyle}>
          <h1 style={{ margin: 0, marginBottom: 8, fontSize: 28 }}>{displayName}</h1>
          <div style={{ marginTop: 0, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>
            <div>
              <strong>{completedTrips}</strong> completed trip{completedTrips === 1 ? "" : "s"}
            </div>
            <div>
              Overall score: {overallScore !== null ? (<><strong>{overallScore}</strong>★</>) : "No reviews"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Description</span>
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                padding: 12,
                color: "#374151",
                background: "#f9fafb",
                minHeight: 96,
                whiteSpace: "pre-wrap",
              }}
            >
              {description || "Loading description..."}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Recent rides</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentRides.map((ride) => (
              <div key={ride.id} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{ride.origin} → {ride.destination}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{new Date(ride.date).toLocaleString()}</div>
                  </div>
                  <span style={badgeStyle(
                    ride.reviews.length
                      ? Math.round(
                          (ride.reviews.reduce((a, r) => a + r.rating, 0) / ride.reviews.length) * 10
                        ) / 10
                      : 0
                  )}>
                    {ride.reviews.length
                      ? `${(
                          ride.reviews.reduce((a, r) => a + r.rating, 0) / ride.reviews.length
                        ).toFixed(1)}★`
                      : "No reviews"}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ride.reviews.length ? (
                    ride.reviews.map((rev) => (
                      <div key={rev.id} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <strong>{rev.author}</strong>
                          <span style={{ color: "#111827" }}>{rev.rating}★</span>
                        </div>
                        <div style={{ color: "#374151" }}>{rev.comment}</div>
                        <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{new Date(rev.date).toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#6b7280", fontStyle: "italic" }}>No reviews for this ride yet.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Company reviews</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontWeight: 600 }}>Overall rating:</span>
            <span style={badgeStyle(
              companyReviews.length
                ? Math.round(
                    (companyReviews.reduce((a, r) => a + r.rating, 0) / companyReviews.length) * 10
                  ) / 10
                : 0
            )}>
              {companyReviews.length
                ? `${(
                    companyReviews.reduce((a, r) => a + r.rating, 0) / companyReviews.length
                  ).toFixed(1)}★`
                : "No reviews"}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {companyReviews.length ? (
              companyReviews.map((rev) => (
                <div key={rev.id} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <strong>{rev.author}</strong>
                    <span style={{ color: "#111827" }}>{rev.rating}★</span>
                  </div>
                  <div style={{ color: "#374151" }}>{rev.comment}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{new Date(rev.date).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "#6b7280", fontStyle: "italic" }}>No company reviews yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
