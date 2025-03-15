import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import './student.css';

export default function Student() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const username = localStorage.getItem('username');
    //     const token = localStorage.getItem('token');

    //     if (!username || !token) {
    //       throw new Error('No credentials found. Please log in');
    //     }

    //     const response = await axios.get('/api/student/dashboard', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     setDashboardData(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching student dashboard:', error);
    //     setError('Failed to load dashboard. Please try again.');
    //     setLoading(false);
    //     if (error.response?.status === 401) {
    //       localStorage.clear();
    //       navigate('/login');
    //     }
    //   }
    // };
    // fetchData();

    // Mock data to display the dashboard.
    const mockData = {
      myChapters: [
        { id: 1, name: "Web Dev Chapter", role: "Member", events: 2 },
        { id: 2, name: "AI Club", role: "Organizer", events: 1 },
      ],
      upcomingEvents: [
        { id: 1, title: "React Workshop", date: "Mar 20", time: "10:00 AM", location: "Room 101" },
        { id: 2, title: "AI Meetup", date: "Mar 22", time: "2:00 PM", location: "Lab B" },
      ],
      notifications: [
        { id: 1, message: "New event added!", time: "2 hours ago" },
        { id: 2, message: "Chapter meeting tomorrow", time: "1 day ago" },
      ],
    };
    setDashboardData(mockData);
        setLoading(false);

  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // if (error) {
  //   return (
  //     <div className="error-container">
  //       <h2>Error</h2>
  //       <p>{error}</p>
  //       <button onClick={() => window.location.reload()}>Try Again</button>
  //     </div>
  //   );
  // }
  if (!dashboardData) {
    return (
      <div className="empty-container">
        <h2>No Data Available</h2>
        <p>Could not retrieve dashboard information.</p>
        <button onClick={() => navigate('/login')}>Return to Login</button>
      </div>
    );
  }
  const { myChapters, upcomingEvents, notifications } = dashboardData;

  return (
    <div className="student-dashboard">
      <nav className="top-navbar">
        <div className="nav-logo">
          {/* <link href ="/"><div className ="logo">CS</div></link> */}
          <span>CS Chapter Hub</span>
        </div>

        <div className="nav-icons">
          <div className="nav-icon" title="Notifications">
            <i className="icon-bell">🔔</i>
            <span className="notification-badge">3</span>
          </div>
          <div className="nav-icon" title="Settings">
            <i className="icon-settings">⚙️</i>
          </div>
          <div className="nav-icon profile-icon" title="Profile">
            <i className="icon-user">🧚‍♀️</i>
          </div>
        </div>
      </nav>

      {/* main content */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, Student!</h1>
          <p>Here's what's happening in your chapters</p>
        </div>

        {/* Dashboard stats */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>My chapters</h3>
            <div className="card-value">{myChapters.length}</div>
            <p>Active Memberships</p>
          </div>
          <div className="dashboard-card">
            <h3>My chapters Events</h3>
            <div className="card-value">{upcomingEvents.length}</div>
            <p>In the next 30 days.</p>
          </div>
          <div className="dashboard-card">
            <h3>Notifications</h3>
            <div className="card-value">{notifications.length}</div>
          </div>

          {/* Events */}
          <div className="content-section">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div className="event-item" key={event.id}>
                  <div className="event-date">
                    <span>{event.date} Date</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p>
                      {event.time} • {event.location}
                    </p>
                  </div>
                  <button className="event-button">View</button>
                </div>
              ))}
            </div>
          </div>

          {/* Chapters Section */}
          <div className="horizontal-section">
            <div className="content-section">
              <h2 className="section-title">My Chapters</h2>
              <div className="my-chapters-list">
                {myChapters.map((chapter) => (
                  <div className="chapter-item" key={chapter.id}>
                    <h3>{chapter.name}</h3>
                    <div className="chapter-details">
                      <span className="chapter-role">{chapter.role || 'Member'}</span>
                      <span className="chapter-events">{chapter.events} upcoming events</span>
                    </div>
                    <button className="chapter-view-button">View Details</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="content-section">
              <h2 className="section-title">Events Calendar</h2>
              <div className="calendar-container">
                <div className="calendar-header">
                  <button className="calendar-nav-button">◀</button>
                  <h3>June 2023</h3>
                  <button className="calendar-nav-button">▶</button>
                </div>
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="calendar-days">
                    {/* First row */}
                    <div className="calendar-day prev-month">28</div>
                    <div className="calendar-day prev-month">29</div>
                    <div className="calendar-day prev-month">30</div>
                    <div className="calendar-day prev-month">31</div>
                    <div className="calendar-day">1</div>
                    <div className="calendar-day">2</div>
                    <div className="calendar-day">3</div>

                    {/* Second row */}
                    <div className="calendar-day">4</div>
                    <div className="calendar-day">5</div>
                    <div className="calendar-day">6</div>
                    <div className="calendar-day">7</div>
                    <div className="calendar-day">8</div>
                    <div className="calendar-day">9</div>
                    <div className="calendar-day">10</div>

                    {/* Third row */}
                    <div className="calendar-day">11</div>
                    <div className="calendar-day">12</div>
                    <div className="calendar-day">13</div>
                    <div className="calendar-day">14</div>
                    <div className="calendar-day has-event">15</div>
                    <div className="calendar-day">16</div>
                    <div className="calendar-day">17</div>

                    {/* Fourth row */}
                    <div className="calendar-day">18</div>
                    <div className="calendar-day">19</div>
                    <div className="calendar-day has-event">20</div>
                    <div className="calendar-day">21</div>
                    <div className="calendar-day">22</div>
                    <div className="calendar-day">23</div>
                    <div className="calendar-day">24</div>

                    {/* Fifth row */}
                    <div className="calendar-day has-event">25</div>
                    <div className="calendar-day">26</div>
                    <div className="calendar-day">27</div>
                    <div className="calendar-day">28</div>
                    <div className="calendar-day">29</div>
                    <div className="calendar-day">30</div>
                    <div className="calendar-day next-month">1</div>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="content-section">
                <h2 className="section-title">Recent Notifications</h2>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div className="notification-item" key={notification.id}>
                      <div className="notification-icon">📣</div>
                      <div className="notification-details">
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    

