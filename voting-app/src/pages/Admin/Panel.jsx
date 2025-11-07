import React from 'react'

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="card">
        <h1>Administrator Panel</h1>
        <p>System management and monitoring dashboard.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div className="card">
            <h3>System Health</h3>
            <p>All systems operational</p>
          </div>
          <div className="card">
            <h3>Active Elections</h3>
            <p>0 ongoing</p>
          </div>
          <div className="card">
            <h3>Total Votes</h3>
            <p>0 today</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn">View Audit Logs</button>
            <button className="btn">Manage Users</button>
            <button className="btn">System Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
