import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { api } from "~/utils/api";

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '16px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '16px',
  marginTop: 0,
};

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const passengerData = api.post.getPassengerData.useQuery(
    { passengerId: String(id) },
    { enabled: !!id }
  );

  if (!id) {
    return <div style={{ padding: '24px' }}>Loading...</div>;
  }

  if (passengerData.isLoading) {
    return <div style={{ padding: '24px' }}>Loading user profile...</div>;
  }

  if (!passengerData.data) {
    return <div style={{ padding: '24px' }}>User not found.</div>;
  }

  const passenger = passengerData.data;
  const reviews = passenger.reviewsReceived || [];
  
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  // Render star rating
  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '24px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Avatar */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#2196F3',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '48px',
            }}>
              {passenger.userDetails?.name?.[0]?.toUpperCase() || '?'}
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '32px' }}>
                {passenger.userDetails?.name || 'Unknown User'}
              </h1>
              <div style={{ color: '#666', fontSize: '16px', marginBottom: '8px' }}>
                {passenger.userDetails?.email || ''}
              </div>
              <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Member Since</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {new Date(passenger.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Average Rating</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
                    {avgRating} {avgRating !== 'N/A' && '⭐'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px',
          marginBottom: '16px' 
        }}>
          <div style={{
            ...cardStyle,
            textAlign: 'center',
            backgroundColor: '#e3f2fd',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2196F3' }}>
              {passenger.rides?.length || 0}
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginTop: '8px' }}>
              Rides Participated
            </div>
          </div>

          <div style={{
            ...cardStyle,
            textAlign: 'center',
            backgroundColor: '#fff3e0',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#FF9800' }}>
              {reviews.length}
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginTop: '8px' }}>
              Reviews Received
            </div>
          </div>

          <div style={{
            ...cardStyle,
            textAlign: 'center',
            backgroundColor: '#f3e5f5',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#9C27B0' }}>
              {passenger.rideRequests?.length || 0}
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginTop: '8px' }}>
              Ride Requests
            </div>
          </div>
        </div>

        {/* Ride History */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Ride History</h2>
          {passenger.rides && passenger.rides.length > 0 ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {passenger.rides.map((ride) => (
                <div 
                  key={ride.id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                        Ride #{ride.id.slice(0, 8)}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                        <strong>From:</strong> ({ride.startLat.toFixed(4)}, {ride.startLng.toFixed(4)})
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                        <strong>To:</strong> ({ride.endLat.toFixed(4)}, {ride.endLng.toFixed(4)})
                      </div>
                      {ride.rideOpportunity?.driver?.userDetails && (
                        <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                          <strong>Driver:</strong> {ride.rideOpportunity.driver.userDetails.name}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(ride.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '24px', 
              textAlign: 'center', 
              color: '#999',
              fontStyle: 'italic' 
            }}>
              No rides yet
            </div>
          )}
        </div>

        {/* Reviews */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              {reviews.map((review) => (
                <div 
                  key={review.id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                        {renderStars(review.rating)}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {review.rating}/5 stars
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {review.comment && (
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: '#333',
                      marginBottom: '12px',
                      padding: '12px',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                    }}>
                      "{review.comment}"
                    </div>
                  )}

                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <strong>From:</strong>{' '}
                    {review.passengerAuthor?.userDetails?.name || 
                     review.driverAuthor?.userDetails?.name || 
                     'Anonymous'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '24px', 
              textAlign: 'center', 
              color: '#999',
              fontStyle: 'italic' 
            }}>
              No reviews yet
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}