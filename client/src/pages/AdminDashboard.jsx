import React from 'react';
import '../AdminDashboard.css'; // Custom CSS for styling
import { Link } from "react-router-dom";

const AdminDashboard = () => {
   
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#doctors">Manage Doctors</a></li>
            <li><a href="#patients">Manage Patients</a></li>
            <li><a href="#appointments">Appointments</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="top-bar-icons">
            <a href="#notifications" className="notification-icon">🔔</a>
            <a href="#profile" className="profile-icon">👤 Admin</a>
          </div>
        </header>

        {/* Dashboard Overview */}
        <section className="dashboard-overview">
          <h1>Dashboard</h1>
          <div className="overview-cards">
            <div className="card">
              <h3>Doctors</h3>
              <p>150</p>
            </div>
            <div className="card">
              <h3>Patients</h3>
              <p>300</p>
            </div>
            <div className="card">
              <h3>Appointments</h3>
              <p>120</p>
            </div>
            <div className="card">
              <h3>Reports</h3>
              <p>45</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Appointment Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-09-10</td>
                <td>John Doe</td>
                <td>Dr. Jane Smith</td>
                <td>10:30 AM</td>
                <td>Confirmed</td>
              </tr>
              <tr>
                <td>2024-09-10</td>
                <td>Mary Williams</td>
                <td>Dr. Robert Lee</td>
                <td>11:00 AM</td>
                <td>Pending</td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/register-doctor" className="action-btn">Add Doctor</Link>
            <Link to="/view-doctor" className="action-btn">ViewDoctors</Link>
            <button className="action-btn">View Appointments</button>
            <button className="action-btn">Generate Report</button>
            <button className="action-btn">Manage Users</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
