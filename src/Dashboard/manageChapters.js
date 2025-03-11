import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard, deleteUser } from '../Apis/adminAPIS'; // Corrected import path
import './admin.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAdminDashboard('irene', '1101');
        console.log('ManageUsers - API Response:', data); // 
        setUsers(data.users || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again.');
        setLoading(false);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const data = await getAdminDashboard('irene', '1101');
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="content-section">
      <h2 className="section-title">Manage Users</h2>
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-item" key={user.id}>
              <div className="user-details">
                <h3>{user.username}</h3>
                <p>Role: {user.role}</p>
              </div>
              <button
                className="user-button delete-button"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
}