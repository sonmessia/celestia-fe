import { useState, useEffect } from 'react'
import { GroupCard } from './GroupCard'

export function GroupList() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Crypto Traders',
      description: 'Group for crypto trading predictions',
      isPrivate: false,
      members: ['0x123', '0x456', '0x789']
    },
    {
      id: 2,
      name: 'NFT Collectors',
      description: 'Predicting NFT floor prices',
      isPrivate: true,
      members: ['0x123', '0x456']
    }
  ])

  return (
    <div className="groups-list">
      <h2>My Groups</h2>
      <div className="groups-grid">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}