import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import './student.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Student() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
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
      stats: [
        {enrolledChapters: 3, },
        { chapterEvents: 5,   },
        {notifications:2},
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
  // handling the dropdowns
  const { myChapters, upcomingEvents, stats } = dashboardData;
  const handleProfileClick = () => {
    console.log('Profile clicked, current state:', profileOpen);
    setProfileOpen(!profileOpen);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked, current state:', settingsOpen);
    setSettingsOpen(!settingsOpen);
  };

  const handleNotificationsClick = () => {
    console.log('Notifications clicked, current state:', notificationsOpen);
    setNotificationsOpen(!notificationsOpen);
  };

  // handling the calendar
  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log('Selected date:', newDate); 
  };

  return (
    <div className="student-dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          {/* <link href ="/"><div className ="logo">CS</div></link> */}
          <span>CS Chapter Hub</span>
        </div>

        <div className="nav-icons">
          <div className="dropdown">
          <i className="fas fa-user" onClick={handleProfileClick}></i>
            {profileOpen && (
              <div className="dropdown-menu">
                <button onClick={() => console.log('View Profile')}>View Profile</button>
                <button onClick={() => console.log('Edit Profile')}>Edit Profile</button>
                <button onClick={() => console.log('Logout')}>Logout</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <i className="fas fa-cog" onClick={handleSettingsClick}></i>
            {settingsOpen && (
              <div className="dropdown-menu">
                <button onClick={() => console.log('Account Settings')}>Account Settings</button>
                <button onClick={() => console.log('Privacy')}>Privacy</button>
                <button onClick={() => console.log('Preferences')}>Preferences</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <i className="fas fa-bell" onClick={handleNotificationsClick}></i>
            {notificationsOpen && (
              <div className="dropdown-menu">
                <button onClick={() => console.log('New Event')}>New Event</button>
                <button onClick={() => console.log('Chapter Update')}>Chapter Update</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* dashboard cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Enrolled Chapters</h3>
          <p>{stats.enrolledChapters}</p>
        </div>
        <div className="card">
          <h3>Chapter Events</h3>
          <p>{stats.chapterEvents}</p>
        </div>
        <div className="card">
          <h3>Notifications</h3>
          <p>{stats.notifications}</p>
        </div>
      </div>


      {/* upcoming events */}

      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        {upcomingEvents.map(event => (
          <div key={event.id} className="event-item">
            <div>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>

      {/* My chapters */}
      <div className="my-chapters">
        <h2>My Chapters</h2>
        <div className="chapters-grid">
          {myChapters.map(chapter => (
            <div key={chapter.id} className="chapter-card">
              <h3>{chapter.name}</h3>
              <p>{chapter.members} Members</p>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}

      <div className="calendar-section">
        <h2>Calendar</h2>
        <div className="calendar-container">
          <Calendar 
            onChange={handleDateChange}
            value={date}
            titleClassName={({date})=> {
            const eventDates = upcomingEvents.map(e => new Date(e.date).toDateString());
            return eventDates.includes(date.toDateString()) ? 'event-date':null;
          }}
          />
        </div>
      </div>
    </div>
  );
};

          
                    