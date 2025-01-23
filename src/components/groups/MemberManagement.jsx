import { useState } from 'react'

export function MemberManagement({ groupId }) {
  const [members, setMembers] = useState([])
  const [inviteEmail, setInviteEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const roles = {
    ADMIN: 'admin',
    MEMBER: 'member',
    VIEWER: 'viewer'
  }

  const handleInvite = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Add invite logic here
      console.log('Inviting:', inviteEmail)
      setInviteEmail('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (memberId, newRole) => {
    try {
      // Add role change logic here
      const updatedMembers = members.map(member => 
        member.id === memberId ? {...member, role: newRole} : member
      )
      setMembers(updatedMembers)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="member-management">
      <div className="invite-section">
        <h3>Invite Members</h3>
        <form onSubmit={handleInvite}>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Invite'}
          </button>
        </form>
      </div>

      <div className="members-list">
        <h3>Members</h3>
        {members.map(member => (
          <div key={member.id} className="member-item">
            <div className="member-info">
              <span>{member.address.substring(0, 6)}...{member.address.substring(38)}</span>
              <select
                value={member.role}
                onChange={(e) => handleRoleChange(member.id, e.target.value)}
              >
                {Object.values(roles).map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="remove-btn"
              onClick={() => handleRemoveMember(member.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}