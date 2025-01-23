import React from 'react'

export function GroupCard({ group }) {
  return (
    <div className="group-card">
      <div className="group-header">
        <h3>{group.name}</h3>
        <span className="member-count">{group.members.length} members</span>
      </div>
      <p className="group-description">{group.description}</p>
      <div className="group-footer">
        <span className="group-type">{group.isPrivate ? 'Private' : 'Public'}</span>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  )
}