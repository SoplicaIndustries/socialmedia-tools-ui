import { useState } from 'react'
import './App.css'
import { useTheme } from './theme/ThemeContext'
import { AccountCard, AccountsContainer, availablePlatforms, Calendar } from './components'

function App() {
  const theme = useTheme()
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Alice Smith", platform: "instagram", tooltipText: "Follow Alice on Instagram" },
    { id: 2, name: "Bob Johnson", platform: "facebook", tooltipText: "Connect with Bob on Facebook" },
    { id: 3, name: "Carol Williams", platform: "linkedin", tooltipText: "Carol's LinkedIn Profile" },
    { id: 4, name: "Dave Brown", platform: "youtube", tooltipText: "Dave's YouTube Channel" },
    { id: 5, name: "Eve Davis", platform: "tiktok", tooltipText: "Eve's TikTok Account" },
    { id: 6, name: "Frank Miller", platform: "instagram", tooltipText: "Frank's Instagram" },
    { id: 7, name: "Grace Wilson", platform: "facebook", tooltipText: "Grace on Facebook" },
    { id: 8, name: "Henry Moore", platform: "linkedin", tooltipText: "Henry's LinkedIn" }
  ]);
  
  // Example theme info
  const themeInfo = {
    primary: theme.colors.primary,
    fontFamily: theme.typography.fontFamily,
    spacing: theme.spacing.md
  }

  // Handle selection in first container
  const handleSelection = (accountId) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const handleAccountAdd = (platform) => {
    // Generate a new unique ID for the account
    const newId = Math.max(...accounts.map(a => a.id), 0) + 1;
    
    // Create a new account based on the selected platform
    const newAccount = {
      id: newId,
      name: `New ${platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : ''} Account`,
      platform: platform || 'default',
      tooltipText: `New ${platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : ''} Account`
    };
    
    // Add the new account to the list
    setAccounts([...accounts, newAccount]);
    
    // Alert the user
    alert(`Added new ${platform || ''} account!`);
  };

  const handleAccountRemove = (accountId) => {
    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
  };

  // Custom onClick handler for the second container
  const handlePlatformClick = (platform) => {
    alert(`Custom handler: You clicked on ${platform.charAt(0).toUpperCase() + platform.slice(1)} platform!`);
  };

  // Handle date click in calendar
  const handleDateClick = (date) => {
    setSelectedDate(date);
    alert(`Selected date: ${date.toLocaleDateString()}`);
  };

  return (
    <div className="app-container">
      <h1>Social Media Widgets</h1>
      
      <section className="demo-section">
        <h2>Selectable and Editable Accounts Container</h2>
        <p>This container displays social media profiles that can be selected and edited. Click to select/deselect accounts, and use the edit button to remove accounts or add new ones.</p>
        
        <AccountsContainer 
          title="Your Social Media Connections" 
          maxRows={2} 
          expandBreakpoint="768px"
          itemsPerRow={4}
          selectable={true}
          onSelectionChange={(selected) => setSelectedAccounts(selected)}
          editable={true}
          showAddButton={true}
          onAccountAdd={handleAccountAdd}
          onAccountRemove={handleAccountRemove}
          displayMode="grid"
          scrollable={false} // Will wrap to multiple rows
        >
          {accounts.map(account => (
            <AccountCard 
              key={account.id}
              id={account.id}
              name={account.name}
              tooltipText={account.tooltipText}
              avatar={`https://i.pravatar.cc/150?img=${account.id}`}
              platform={account.platform}
            />
          ))}
        </AccountsContainer>
        
        {selectedAccounts.length > 0 && (
          <div className="selection-info">
            <p>Selected accounts: {selectedAccounts.length}</p>
            <pre className="selected-json">
              {JSON.stringify(selectedAccounts, null, 2)}
            </pre>
          </div>
        )}
      </section>
      
      <section className="demo-section">
        <h2>Clickable Social Media Platform Icons (Custom onClick) - Not Editable</h2>
        <p>These cards use a custom onClick handler that overrides the default behavior and are not editable.</p>
        
        <AccountsContainer 
          title="Available Platforms" 
          maxRows={1}
          expandBreakpoint="768px"
          itemsPerRow={5}
          showAddButton={false}
          displayMode="row"
          scrollable={true} // Will scroll horizontally
        >
          {availablePlatforms().map(platform => (
            <AccountCard
              key={platform}
              id={platform}
              size="md"
              name={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`}
              tooltipText={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Platform`}
              platform={platform}
              avatar={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
              onClick={() => handlePlatformClick(platform)}
            />
          ))}
        </AccountsContainer>
      </section>
      
      <section className="demo-section">
        <h2>Calendar Component</h2>
        <p>A responsive calendar that allows navigation between months. Click on any date to select it.</p>
        
        <Calendar 
          initialDate={new Date()} 
          onDateClick={handleDateClick}
          highlightToday={true}
          startWeekOnSunday={true}
        />
        
        {selectedDate && (
          <div className="selection-info">
            <p>Selected date: {selectedDate.toLocaleDateString()}</p>
          </div>
        )}
      </section>
      
      <div className="theme-info">
        <h3>Current Theme:</h3>
        <pre>{JSON.stringify(themeInfo, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
