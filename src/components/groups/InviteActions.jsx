import { useState } from 'react'

export function InviteActions({ invite, onAction }) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (action) => {
    setLoading(true)
    try {
      await onAction(invite.id, action)
    } catch (error) {
      console.error(`Error ${action}ing invite:`, error)
    }
    setLoading(false)
  }

  return (
    <div className="invite-actions">
      <div className="invite-info">
        <h4>Group Invitation</h4>
        <p>From: {invite.from}</p>
        <p>Group: {invite.groupName}</p>
        <p>Role: {invite.role}</p>
      </div>
      
      <div className="action-buttons">
        <button 
          className="accept-btn"
          onClick={() => handleAction('accept')}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Accept'}
        </button>
        <button
          className="reject-btn" 
          onClick={() => handleAction('reject')}
          disabled={loading}
        >
          Reject
        </button>
      </div>
    </div>
  )
}