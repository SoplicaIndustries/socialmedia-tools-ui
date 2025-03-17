import { useState } from 'react'
import './App.css'
import { useTheme } from './theme/ThemeContext'
import { AccountCard, AccountsContainer, availablePlatforms } from './components'

function App() {
  const theme = useTheme()

  // Sample account data with social media platforms
  const accounts = [
    { id: 1, name: "Alice Smith", platform: "instagram", tooltipText: "Follow Alice on Instagram" },
    { id: 2, name: "Bob Johnson", platform: "facebook", tooltipText: "Connect with Bob on Facebook" },
    { id: 3, name: "Carol Williams", platform: "linkedin", tooltipText: "Carol's LinkedIn Profile" },
    { id: 4, name: "Dave Brown", platform: "youtube", tooltipText: "Dave's YouTube Channel" },
    { id: 5, name: "Eve Davis", platform: "tiktok", tooltipText: "Eve's TikTok Account" },
    { id: 6, name: "Frank Miller", platform: "instagram", tooltipText: "Frank's Instagram" },
    { id: 7, name: "Grace Wilson", platform: "facebook", tooltipText: "Grace on Facebook" },
    { id: 8, name: "Henry Moore", platform: "linkedin", tooltipText: "Henry's LinkedIn" }
  ];
  
  // Example theme info
  const themeInfo = {
    primary: theme.colors.primary,
    fontFamily: theme.typography.fontFamily,
    spacing: theme.spacing.md
  }

  return (
    <div className="app-container">
      <h1>Social Media Widgets</h1>
      
      <section className="demo-section">
        <h2>Accounts Container Demo</h2>
        <p>This container displays social media profiles with platform icons. Hover over an avatar to see the tooltip above.</p>
        
        <AccountsContainer 
          title="Your Social Media Connections" 
          maxRows={2} 
          expandBreakpoint="768px"
          itemsPerRow={4}
        >
          {accounts.map(account => (
            <AccountCard 
              key={account.id}
              name={account.name}
              tooltipText={account.tooltipText}
              avatar={`https://i.pravatar.cc/150?img=${account.id}`}
              platform={account.platform}
              onClick={() => console.log(`Clicked on ${account.name}'s ${account.platform} account`)}
            />
          ))}
        </AccountsContainer>
      </section>
      
      <section className="demo-section">
        <h2>Social Media Platform Icons</h2>
        <div className="platform-icons-demo">
          {availablePlatforms().map(platform => (
            <div key={platform} className="platform-icon-item">
              <AccountCard
                size="md"
                name={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`}
                tooltipText={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Platform`}
                platform={platform}
                avatar={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
              />
              <p>{platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
            </div>
          ))}
        </div>
      </section>
      
      <div className="theme-info">
        <h3>Current Theme:</h3>
        <pre>{JSON.stringify(themeInfo, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
