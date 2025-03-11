import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard, deleteUser } from '../Apis/adminAPIS';
import './admin.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminDashboard('irene', '1101')
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        // navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const data = await getAdminDashboard('irene','1101');
      setUsers(data.users);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Manage Users</h2>
      <div className="users-list">
        {users.map((user) => (
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
        ))}
      </div>
    </div>
  );
}