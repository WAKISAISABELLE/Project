import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard, updateEvent, deleteEvent } from '../Apis/adminAPIS';
import './admin.css';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching events...'); // Debug: Confirm useEffect runs
        setLoading(true);
        const data = await getAdminDashboard('irene', '1101');
        console.log('API Response:', data); // Debug: Log full response
        console.log('Events data:', data.events); // Debug: Log events specifically
        setEvents(data.events || []); // Fallback to empty array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEditEvent = async (eventId, updatedEvent) => {
    try {
      await updateEvent(eventId, updatedEvent);
      const data = await getAdminDashboard('irene', '1101');
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      const data = await getAdminDashboard('irene', '1101');
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Debug: Log current state before rendering
  console.log('Rendering - Loading:', loading, 'Error:', error, 'Events:', events);

  // Simplified rendering to ensure something shows
  if (loading) {
    console.log('Showing loading state');
    return <div>Loading events...</div>;
  }
  if (error) {
    console.log('Showing error state');
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Main render
  console.log('Showing main content');
  return (
    <div className="content-section">
      <h2 className="section-title">Manage Events</h2>
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event-item" key={event.id}>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date} • {event.location}</p>
              </div>
              <button
                className="event-button edit-button"
                onClick={() => handleEditEvent(event.id, { title: 'Updated Title', date: '2023-07-01', time: '3:00 PM', location: 'New Location' })}
              >
                Edit
              </button>
              <button
                className="event-button delete-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}