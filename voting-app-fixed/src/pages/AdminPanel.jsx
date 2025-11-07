import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1> Administrator Panel</h1>
        <p>Welcome, {user?.name} - System Management Dashboard</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>System Health</h3>
          <div className="stat-value green"> Operational</div>
          <p>All systems running normally</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Elections</h3>
          <div className="stat-value">3</div>
          <p>Elections currently running</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-value">1,247</div>
          <p>Registered voters and organizers</p>
        </div>
        
        <div className="stat-card">
          <h3>Votes Today</h3>
          <div className="stat-value">89</div>
          <p>Votes cast in last 24 hours</p>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="btn btn-primary"> System Analytics</button>
          <button className="btn btn-secondary"> User Management</button>
          <button className="btn btn-secondary"> Security Settings</button>
          <button className="btn btn-secondary"> Audit Logs</button>
          <button className="btn btn-secondary"> System Maintenance</button>
          <button className="btn btn-secondary"> Notification Settings</button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="time">10:30 AM</span>
            <span className="action">New election created: "Student Council 2024"</span>
          </div>
          <div className="activity-item">
            <span className="time">09:15 AM</span>
            <span className="action">User registration: 25 new voters</span>
          </div>
          <div className="activity-item">
            <span className="time">08:45 AM</span>
            <span className="action">System backup completed successfully</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
