import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CreateMarket } from './components/CreateMarket';
import { CreateGroup } from './components/groups/CreateGroup';
import { MemberManagement } from './components/groups/MemberManagement';
import { GroupList } from './components/groups/GroupList';
import { InviteActions } from './components/groups/InviteActions'
import './App.css'

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [markets, setMarkets] = useState([])
  const [activeView, setActiveView] = useState('markets') // markets, create, groups
  const [error, setError] = useState('')

  const connectWallet = async () => {
    setError('') // Reset error state
    
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask!')
      return
    }

    try {
      console.log('Connecting to MetaMask...')
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      console.log('Accounts:', accounts)
      
      setAccount(accounts[0])
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(accounts[0])
      setBalance(ethers.formatEther(balance))
      
    } catch (error) {
      console.error('Connection error:', error)
      setError(error.message)
    }
  }

  const handleInviteAction = async (inviteId, action) => {
    try {
      // Contract interaction will go here
      const result = await contract.handleInvite(inviteId, action)
      console.log(`Invite ${action}ed:`, result)
    } catch (error) {
      console.error(`Error ${action}ing invite:`, error)
    }
  }

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="wallet-info">
          {account ? (
            <>
              <p>Account Address {account.substring(0, 6)}...{account.substring(38)}</p>
              <p>Balance: {parseFloat(balance).toFixed(4)} ETH</p>
            </>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
        <ul>
          <li onClick={() => setActiveView('markets')}>Markets</li>
          <li onClick={() => setActiveView('create')}>Create Market</li>
          <li onClick={() => setActiveView('groups')}>Friend Groups</li>
        </ul>
      </nav>

      <main className="content">
        {activeView === 'markets' && (
          <div className="markets-list">
            <h2>Active Prediction Markets</h2>
            {markets.map(market => (
              <div key={market.id} className="market-card">
                <h3>{market.question}</h3>
                <p>Ends: {market.endDate}</p>
                <p>Pool: {market.poolSize} ETH</p>
              </div>
            ))}
          </div>
        )}
        {activeView === 'create' && <CreateMarket />}
        {activeView === 'groups' && (
          <div className="groups-section">
            <div className="groups-header">
              <h2>Prediction Groups</h2>
              <button 
                className="create-group-button"
                onClick={() => setActiveView('create-group')}
              >+ Create New Group</button>
            </div>
            <GroupList />
          </div>
        )}
        {activeView === 'create-group' && (
          <CreateGroup 
            onSubmit={async (groupData) => {
              // Handle group creation
              console.log('New group:', groupData)
              // Switch back to groups view
              setActiveView('groups')
            }}
          />
        )}
      </main>
    </div>
  )
}

export default App
