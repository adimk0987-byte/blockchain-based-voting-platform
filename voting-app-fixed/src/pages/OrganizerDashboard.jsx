import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CreateElection from "../components/election/CreateElection";
import ElectionAccess from "../components/election/ElectionAccess";

const OrganizerDashboard = () => {
  const { user, elections } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const myElections = elections.filter(election => 
    election.createdBy === user?.email || user?.role === "admin"
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Organizer Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-button ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          🗳️ Create Election
        </button>
        <button 
          className={`tab-button ${activeTab === "access" ? "active" : ""}`}
          onClick={() => setActiveTab("access")}
        >
          🔗 Access Election
        </button>
        <button 
          className={`tab-button ${activeTab === "elections" ? "active" : ""}`}
          onClick={() => setActiveTab("elections")}
        >
          📋 My Elections
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-grid">
            <div className="stat-card">
              <h3>Total Elections</h3>
              <div className="stat-value">{myElections.length}</div>
              <p>Elections created by you</p>
            </div>
            
            <div className="stat-card">
              <h3>Active Elections</h3>
              <div className="stat-value">
                {myElections.filter(e => e.status === "active").length}
              </div>
              <p>Currently running elections</p>
            </div>
            
            <div className="stat-card">
              <h3>Upcoming Elections</h3>
              <div className="stat-value">
                {myElections.filter(e => e.status === "upcoming").length}
              </div>
              <p>Scheduled elections</p>
            </div>
          </div>
        )}

        {activeTab === "create" && <CreateElection />}

        {activeTab === "access" && <ElectionAccess />}

        {activeTab === "elections" && (
          <div className="elections-management">
            <h2>My Elections</h2>
            {myElections.length === 0 ? (
              <div className="card">
                <p>No elections created yet. Create your first election to get started.</p>
              </div>
            ) : (
              <div className="elections-grid">
                {myElections.map(election => (
                  <div key={election.id} className="election-card">
                    <h3>{election.name}</h3>
                    <p>{election.description}</p>
                    <div className="election-stats">
                      <span className={`status ${election.status}`}>
                        {election.status}
                      </span>
                      <span>🏛️ {election.type}</span>
                      <span>👥 {election.candidates.length} candidates</span>
                      <span>📅 {election.date}</span>
                    </div>
                    <div className="election-actions">
                      <button 
                        className="btn btn-small"
                        onClick={() => window.open(`/vote/${election.id}`, '_blank')}
                      >
                        View Election
                      </button>
                      <span className="election-id">ID: {election.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
