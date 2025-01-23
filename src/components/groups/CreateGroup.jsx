import { useState } from 'react'

export function CreateGroup({ onSubmit }) {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate
      if (!groupData.name) {
        throw new Error('Group name is required')
      }

      // Submit to parent
      await onSubmit(groupData)
      
      // Reset form
      setGroupData({
        name: '',
        description: '',
        isPrivate: false
      })

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-group">
      <h2>Create New Group</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            value={groupData.name}
            onChange={(e) => setGroupData({...groupData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={groupData.description}
            onChange={(e) => setGroupData({...groupData, description: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={groupData.isPrivate}
              onChange={(e) => setGroupData({...groupData, isPrivate: e.target.checked})}
            />
            Private Group
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Group'}
        </button>
      </form>
    </div>
  )
}