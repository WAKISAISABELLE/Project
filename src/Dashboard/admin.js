import React, { useRef, useState } from "react";
// import { Link, Routes, Route } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaUsers, FaCalendar, FaBuilding, FaTrash, FaEdit,FaBars } from 'react-icons/fa';
import './admin.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Admin() {
      const chaptersRef = useRef(null);
      const eventsRef = useRef(null);
      const usersRef = useRef(null);

      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      
      const [chapters, setChapters] = useState([
        { id: 1, name: 'NY Chapter', location: 'New York', status: 'Active' },
        { id: 2, name: 'CA Chapter', location: 'California', status: 'Inactive' },
      ]);
      const [events, setEvents] = useState([
        { id: 1, name: 'Code Jam', date: '2025-04-01', location: 'NY', participants: 50 },
        { id: 2, name: 'Hackathon', date: '2025-05-15', location: 'CA', participants: 30 },
      ]);
      const [users, setUsers] = useState([
        { id: 1, username: 'admin1', role: 'Admin', status: 'Active' },
        { id: 2, username: 'member1', role: 'Member', status: 'Pending' },
      ]);


      //chart data
      const chapterData = {
        labels: ['Active Chapters', 'Inactive Chapters'],
        datasets: [{
          data: [25, 5],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }]
      };

      const memberData = {
        labels: ['Total Members', 'Pending Approval'],
        datasets: [{
          data: [150, 20],
          backgroundColor: ['#4BC0C0', '#FFCE56'],
        }]
      };

      const eventData = {
        labels: ['Active Participants', 'Total Registered'],
        datasets: [{
          data: [80, 120],
          backgroundColor: ['#9966FF', '#FF9F40'],
        }]
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      // Scroll handler
      const scrollToSection = (ref) => {
        setIsSidebarOpen(false);
         ref.current.scrollIntoView({ behavior: 'smooth' });
      };


      //form handlers

      const addChapter = (e) => {
        e.preventDefault();
        const form = e.target;
        const newChapter = {
          id: chapters.length + 1,
          name: form.name.value,
          location: form.location.value,
          status: form.status.value,
        };
        setChapters([...chapters, newChapter]);
        form.reset();
      };


      const addEvent = (e) => {
        e.preventDefault();
        const form = e.target;
        const newEvent = {
          id: events.length + 1,
          name: form.name.value,
          date: form.date.value,
          location: form.location.value,
          participants: parseInt(form.participants.value),
        };
        setEvents([...events, newEvent]);
        form.reset();
      };


      const addUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const newUser = {
          id: users.length + 1,
          username: form.username.value,
          role: form.role.value,
          status: form.status.value,
        };
        setUsers([...users, newUser]);
        form.reset();
      };


      //delete handlers
      const deleteChapter = (id) => setChapters(chapters.filter(ch => ch.id !== id));
      const deleteEvent = (id) => setEvents(events.filter(ev => ev.id !== id));
      const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

    
    // const [dashboardData, setDashboardData] = useState({});
    // // const [errorMessage, setErrorMessage] = useState(null);
    // // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log('Fetching admin dashboard...');
    //             const data = await getAdminDashboard('irene', '1101'); // Hardcoded credentials
    //             console.log('Data:', data);
    //             setDashboardData(data);
    //         } catch (error) {
    //             console.error('Error fetching admin dashboard:', error);
    //             // setErrorMessage('Failed to load admin dashboard. Redirecting to login...');
    //             // setTimeout(() => navigate('/login'), 2000);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // if (errorMessage) return <div style={{ color: 'red' }}>{errorMessage}</div>;
    // if (!dashboardData) return <div>Loading...</div>;
    // const { chapters, events, users } = dashboardData;

     return (
        <div className="admin-dashboard">
            <div className="sidebar">
              <h2>CS Chapter Hub</h2>
              <nav>
                  <button onClick={() => scrollToSection(chaptersRef)}>
                      <FaBuilding /> Manage Chapters
                  </button>
                  <button onClick={() => scrollToSection(eventsRef)}>
                     <FaCalendar /> Manage Events
                 </button>
                 <button onClick={() => scrollToSection(usersRef)}>
                     <FaUsers /> Manage Users
                 </button>
             </nav>
          </div>

          <div className="main-content">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
              <div className="dashboard">
                  <h1>Admin Dashboard</h1>
                  <div className="charts-container">
                      <div className="chart-card">
                          <h3>Total Chapters: 30</h3>
                          <div className="chart-wrapper">
                               <Pie data={chapterData} options={chartOptions} />
                          </div>
                      </div>
                      <div className="chart-card">
                         <h3>Total Members: 170</h3>
                         <div className="chart-wrapper">
                             <Pie data={memberData} options={chartOptions} />
                         </div>
                      </div>
                      <div className="chart-card">
                           <h3>Event Participation</h3>
                           <div className="chart-wrapper">
                               <Pie data={eventData} options={chartOptions} />
                          </div>
                      </div>
                 </div>
             </div>
             <section ref={chaptersRef} className="management-section">
                <h2>Manage Chapters</h2>
                <form onSubmit={addChapter} className="management-form">
                  <input name="name" placeholder="Chapter Name" required />
                  <input name="location" placeholder="Location" required />
                  <select name="status" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button type="submit">Add Chapter</button>
              </form>
              <table className="management-table">
                <thead><tr><th>Name</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                   {chapters.map(ch => (
                     <tr key={ch.id}>
                       <td>{ch.name}</td><td>{ch.location}</td><td>{ch.status}</td>
                       <td>
                        <button><FaEdit /></button>
                        <button onClick={() => deleteChapter(ch.id)}><FaTrash /></button>
                       </td>
                     </tr>
                  ))}
              </tbody>
             </table>
             </section>

             <section ref={eventsRef} className="management-section">
                <h2>Manage Events</h2>
                <form onSubmit={addEvent} className="management-form">
                  <input name="name" placeholder="Event Name" required />
                  <input name="date" type="date" required />
                  <input name="location" placeholder="Location" required />
                  <input name="participants" type="number" placeholder="Participants" required />
                  <button type="submit">Add Event</button>
              </form>
              <table className="management-table">
                <thead><tr><th>Name</th><th>Date</th><th>Location</th><th>Participants</th><th>Actions</th></tr></thead>
                <tbody>
                   {events.map(ev => (
                    <tr key={ev.id}>
                      <td>{ev.name}</td><td>{ev.date}</td><td>{ev.location}</td><td>{ev.participants}</td>
                      <td>
                        <button><FaEdit /></button>
                        <button onClick={() => deleteEvent(ev.id)}><FaTrash /></button>
                      </td>
                  </tr>
                   ))}
               </tbody>
              </table>
             </section>

             <section ref={usersRef} className="management-section">
                <h2>Manage Users</h2>
                <form onSubmit={addUser} className="management-form">
                   <input name="username" placeholder="Username" required />
                   <select name="role" required>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                  </select>
                  <select name="status" required>
                     <option value="Active">Active</option>
                     <option value="Pending">Pending</option>
                 </select>
                 <button type="submit">Add User</button>
             </form>
             <table className="management-table">
                <thead><tr><th>Username</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                   {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.username}</td><td>{u.role}</td><td>{u.status}</td>
                        <td>
                          <button><FaEdit /></button>
                          <button onClick={() => deleteUser(u.id)}><FaTrash /></button>
                       </td>
                      </tr>
                    ))}
                </tbody>
             </table>
          </section>
        </div>
    </div>
     );
    }
    




