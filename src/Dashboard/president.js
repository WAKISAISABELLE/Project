import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './president.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function President() {
  const [selectedContent, setSelectedContent] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([
    { name: 'John Doe', status: 'Active' },
    { name: 'Jane Smith', status: 'Non-Active' },
    { name: 'Alice Johnson', status: 'Active' },
    { name: 'Bob Brown', status: 'Non-Active' }
  ]);
  const navigate = useNavigate();

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  const handleLogout = () => {
    // Perform any necessary logout operations here
    navigate('/welcome');
  };

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, start: arg.date }]);
    }
  };

  const handleAddParticipant = () => {
    const name = prompt('Enter participant name:');
    const status = prompt('Enter participant status (Active/Non-Active):');
    if (name && status) {
      setParticipants([...participants, { name, status }]);
    }
  };

  useEffect(() => {
    if (selectedContent === 'dashboard') {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawCharts);
      };
      document.body.appendChild(script);

      window.addEventListener('resize', drawCharts);
      return () => {
        window.removeEventListener('resize', drawCharts);
        document.body.removeChild(script);
      };
    }
  }, [selectedContent]);

  useEffect(() => {
    if (selectedContent === 'chapter1') {
      drawLineChart();
    }
  }, [selectedContent]);

  const drawCharts = () => {
    const data = window.google.visualization.arrayToDataTable([
      ['Chapter', 'Data science'],
      ['Attendence', 60],
      ['Engagements', 30],
      ['Performance', 44],
      ['Participation', 24],
      ['Projects', 35]
    ]);

    const options = {
      title: 'Statistics Overview Pie Chart',
      width: '100%',
      height: '100%',
    };

    const pieChart = new window.google.visualization.PieChart(document.getElementById('myChart'));
    pieChart.draw(data, options);

    const options2 = {
      title: 'Statistics Overview Bar Chart',
      width: '100%',
      height: '100%',
    };

    const barChart = new window.google.visualization.BarChart(document.getElementById('myChart2'));
    barChart.draw(data, options2);
  };

  const drawLineChart = () => {
    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'finished-Projects',
            data: [3, 2, 2, 4, 5, 6, 7],
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Outreaches',
            data: [1, 3, 4, 2, 5, 3, 4],
            borderColor: 'red',
            fill: false
          },
          {
            label: 'Participation',
            data: [1, 4, 5, 2, 3, 3, 2],
            borderColor: 'purple',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Count'
            }
          }
        }
      }
    });
  };

  const activeParticipants = participants.filter(p => p.status === 'Active');
  const nonActiveParticipants = participants.filter(p => p.status === 'Non-Active');

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <img src="/img/prof.png" alt="Profile" className="profile-pic" />
          <p>President</p>
        </div>
        <ul>
          <li><a href="#dashboard" onClick={() => handleContentChange('dashboard')}>Dashboard</a></li>
          <li><a href="#chapter1" onClick={() => handleContentChange('chapter1')}>Progress</a></li>
          <li><a href="#chapter3" onClick={() => handleContentChange('chapter3')}>Events</a></li>
          <li><a href="#chapter4" onClick={() => handleContentChange('chapter4')}>Participants</a></li>
          <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
        </ul>
      </aside>
      <div className="content">
        {selectedContent === 'dashboard' && (
          <div className="dashboard">
            <div className="card small-card">
              <h2><i className="fas fa-chart-line"></i> Jan-Feb pie chart stats 2025</h2>
              <div id="myChart" className="chart-container"></div>
            </div>
            <div className="card small-card">
              <h2><i className="fas fa-file-alt"></i> Jan-Feb bar chart stats 2025</h2>
              <div id="myChart2" className="chart-container"></div>
            </div>
            <div className="card small-card">
              <h2><i className="fas fa-file-alt"></i>Chapter Activities Overview</h2>
              <div className="semi-card-container">
                <div className="semi-card">
                  <p>Total members</p>
                  <p>30 students</p>
                </div>
                <div className="semi-card">
                  <p>Membership Growth</p>
                  <p>20% per year</p>
                </div>
                <div className="semi-card">
                  <p>Projects</p>
                  <p>16 accomplished</p>
                </div>
                <div className="semi-card">
                  <p>Pending projects</p>
                  <p>5</p>
                </div>
                
                <div className="semi-card">
                  <p>Up coming event</p>
                  <p>Seminar</p>
                </div>
                <div className="semi-card">
                  <p>Total Membership</p>
                  <p>20 students</p>
                </div>
                <div className="semi-card">
                  <p>Out-going participates</p>
                  <p>3 students</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedContent === 'chapter1' && (
          <section id="chapter1">
            <div className='card-content'>
              <div className='sem-card-container'>
                <div className="box">
                  <div className="p-2 bg-secondary text-white m-2">
                    <i className="fas fa-chalkboard-teacher"></i> Workshops
                    <div className="progress mt-2">
                      <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}>
                        40% Complete (success)
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-secondary text-white m-2">
                    <i className="fas fa-users"></i> Seminars
                    <div className="progress mt-2">
                      <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
                        aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: '50%' }}>
                        50% Complete 
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-secondary text-white m-2">
                    <i className="fas fa-glass-cheers"></i> Social Events
                    <div className="progress mt-2">
                      <div className="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}>
                        60% Complete
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-secondary text-white m-2">
                    <i className="fas fa-hands-helping"></i> Volunteer Programs
                    <div className="progress mt-2">
                      <div className="progress-bar progress-bar-primary progress-bar-striped" role="progressbar"
                        aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '70%' }}>
                        70% Complete 
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-secondary text-white m-2">
                    <i className="fas fa-network-wired"></i> Networking Sessions
                    <div className="progress mt-2">
                      <div className="progress-bar progress-bar-primary progress-bar-striped" role="progressbar"
                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}>
                        80% Complete (primary)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sem-card-container">
                <div className="sem-card">
                  <h2><i className="fas fa-calendar-alt"></i> Projects</h2>
                  <ul>
                    <li>Credit Risk Assessment</li>
                    <li>Sentiment Analysis</li>
                    <li>Customer Segmentation</li>
                    <li>Predictive Maintenance</li>
                    <li>Recommendation Systems</li>
                  </ul>
                </div>
                <div className="sem-card">
                  <h2><i className="fas fa-calendar-alt"></i> Worked on Projects</h2>
                  <ul>
                    <li>Annual Gala - March 15, 2025</li>
                    <li>Spring Workshop - April 10, 2025</li>
                    <li>Summer Picnic - June 20, 2025</li>
                  </ul>
                </div>
                <div className="sem-card">
                  <h2><i className="fas fa-calendar-alt"></i> Pending Projects</h2>
                  <ul>
                    <li>Machine Learning (Agriculture Based)</li>
                    <li>Data Correction (Northern Regions)</li>
                    <li>Artificial Intelligence Research</li>
                  </ul>
                </div>
                <div className="sem-card">
                  <h2><i className="fas fa-calendar-alt"></i> line graph showing the trend of projects,outreachs and Participation</h2>
                  <canvas id="lineChart" style={{ width: '100%', maxWidth: '900px' }}></canvas>
                </div>
              </div>
            </div>
          </section>
        )}
        {selectedContent === 'chapter3' && (
          <section id="chapter3">
            <div className='sem-card'>
              <div className="calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  dateClick={handleDateClick}
                />
              </div>
            </div>
            <div className="events-container">
              <div className="sem-card">
                <h2><i className="fas fa-calendar-alt"></i> Upcoming Events</h2>
                <ul>
                  {events.filter(event => new Date(event.start) >= new Date()).map((event, index) => (
                    <li key={index}>{event.title} - {new Date(event.start).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
              <div className="sem-card">
                <h2><i className="fas fa-history"></i> Finished Events</h2>
                <ul>
                  {events.filter(event => new Date(event.start) < new Date()).map((event, index) => (
                    <li key={index}>{event.title} - {new Date(event.start).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        {selectedContent === 'chapter4' && (
          <section id="chapter4">
            <div className="sem-card">
              <h2><i className="fas fa-file-alt"></i>Participants</h2>
              <button onClick={handleAddParticipant}>Add Participant</button>
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr key={index}>
                      <td>{participant.name}</td>
                      <td>{participant.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex-container">
                <div className="flex-item">
                  <h3>Active Members</h3>
                  <table className="active-members-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeParticipants.map((participant, index) => (
                        <tr key={index}>
                          <td>{participant.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-item">
                  <h3>Non-Active Members</h3>
                  <table className="non-active-members-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nonActiveParticipants.map((participant, index) => (
                        <tr key={index}>
                          <td>{participant.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}