import React, { useState } from 'react'

const OrganizerDashboard = () => {
  const [elections, setElections] = useState([])

  return (
    <div className="organizer-dashboard">
      <div className="card">
        <h1>Election Management</h1>
        <button className="btn">Create New Election</button>
      </div>

      <div className="card">
        <h2>Your Elections</h2>
        {elections.length === 0 ? (
          <p>No elections created yet. Create your first election to get started.</p>
        ) : (
          <div className="elections-list">
            {/* Elections will be listed here */}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn">Import Voters</button>
          <button className="btn">View Reports</button>
          <button className="btn">Audit Logs</button>
        </div>
      </div>
    </div>
  )
}

export default OrganizerDashboard
