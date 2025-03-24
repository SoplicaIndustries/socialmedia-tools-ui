import { useState } from 'react'
import { useTheme } from './theme/ThemeContext'
import { AccountCard, AccountsContainer, availablePlatforms, Calendar, PostEditor } from './components'
import CalendarEvent from './components/Calendar/CalendarEvent'

function App() {
  const theme = useTheme()
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState([]);
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
  const [isCompactView, setIsCompactView] = useState(false);
  
  // Calendar events data using CalendarEvent class - social media posting schedule
  const calendarEvents = [
    new CalendarEvent({
      id: "event-1",
      // No title, just description
      description: "Share product launch behind-the-scenes photos with team interviews. Use hashtags #ProductLaunch #TeamSpotlight",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 10, 0),
      endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 11, 30),
      color: "#E4405F", // Instagram color
      services: ['instagram']
    }),
    new CalendarEvent({
      id: "event-2",
      // No title, just description
      description: "New product announcement with coordinated posts across all platforms. Link to landing page in bio.",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 0),
      color: "#10B981", // green
      isAllDay: true,
      services: ['facebook', 'instagram', 'twitter', 'linkedin']
    }),
    new CalendarEvent({
      id: "event-3",
      // No title, just description
      description: "Product demo with trending sound. Show 3 key features in under 30 seconds.",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 14, 30),
      color: "#000000", // TikTok black
      services: ['tiktok']
    }),
    new CalendarEvent({
      id: "event-4",
      // No title, just description
      description: "Thought leadership piece on industry trends. Include case study data and tag strategic partners.",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 11, 0),
      endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 12, 0),
      color: "#0A66C2", // LinkedIn blue
      services: ['linkedin']
    }),
    new CalendarEvent({
      id: "event-5",
      // No title, just description
      description: "Detailed product walkthrough showing advanced features. Include timestamps in description and linked resources.",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 13, 0),
      endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 15, 0),
      color: "#FF0000", // YouTube red
      services: ['youtube']
    }),
    new CalendarEvent({
      id: "event-6",
      // No title, just description
      description: "Team meeting to plan next month's content calendar. Bring performance metrics from previous campaigns.",
      startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 0, 0),
      endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 23, 59),
      color: "#4F46E5", // indigo
      isAllDay: true
    }),
    // Current day posts
    new CalendarEvent({
      id: "event-11",
      // No title, just description
      description: "Q&A session with product team. Promote 24 hours in advance with teaser content.",
      startTime: new Date(new Date().setHours(10, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0)),
      color: "#1877F2", // Facebook blue
      services: ['facebook']
    }),
    new CalendarEvent({
      id: "event-12",
      // No title, just description
      description: "Behind-the-scenes office tour with polls and questions to boost engagement.",
      startTime: new Date(new Date().setHours(12, 30, 0)),
      color: "#E4405F", // Instagram color
      services: ['instagram']
    })
  ];

  // Example theme info
  const themeInfo = {
    primary: theme.colors.primary,
    fontFamily: theme.typography.fontFamily,
    spacing: theme.spacing.md
  }

  // Handle selection in first container with detailed account information
  const handleAccountSelection = (selectedItems) => {
    // Store the selected account IDs
    setSelectedAccounts(selectedItems.map(item => item.id));
    
    // Store the full account details of selected items
    const selectedDetails = selectedItems.map(item => {
      // Find the complete account object using the id
      const accountObj = accounts.find(acc => acc.id === item.id);
      return accountObj || item.props;
    });
    
    setSelectedAccountDetails(selectedDetails);
    
    // For debugging
    console.log('Selected accounts:', selectedDetails);
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

  // Handle post now action
  const handlePost = (postData) => {
    // Example of handling a post now action
    const accountNames = postData.accounts.map(acc => acc.name).join(', ');
    const mediaCount = postData.media.length;
    
    alert(`Post published to ${accountNames}!\n${mediaCount} media items included.\nCaption: ${postData.caption.substring(0, 50)}${postData.caption.length > 50 ? '...' : ''}`);
    
    console.log("Post published:", postData);
  };

  // Handle schedule action
  const handleSchedule = (postData) => {
    // Show a date picker (simplified with just an alert in this example)
    const scheduledDate = new Date();
    scheduledDate.setHours(scheduledDate.getHours() + 2); // Schedule for 2 hours from now
    
    // Create a new calendar event
    const newEvent = new CalendarEvent({
      id: `event-${Date.now()}`,
      description: postData.caption.substring(0, 100) + (postData.caption.length > 100 ? '...' : ''),
      startTime: scheduledDate,
      color: "#10B981", // green
      services: postData.accounts.map(acc => acc.platform)
    });
    
    // Add to calendar events
    const updatedEvents = [...calendarEvents, newEvent];
    
    // In a real app, you'd update state here
    // setCalendarEvents(updatedEvents);
    
    alert(`Post scheduled for ${scheduledDate.toLocaleString()}!\nCheck the calendar to view and manage your scheduled post.`);
    
    console.log("Post scheduled:", postData, "Event created:", newEvent);
  };

  // Handle save draft action
  const handleSaveDraft = (draftData) => {
    alert(`Draft saved:\n${draftData.caption.substring(0, 50)}${draftData.caption.length > 50 ? '...' : ''}\nMedia items: ${draftData.media.length}`);
    
    console.log("Draft saved:", draftData);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Social Media Widgets</h1>
      
      {/* Social Media Post Creation Section */}
      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Social Media Post Creator</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Create and preview content for your social media accounts. Select accounts below first, then create your post.
        </p>
        
        {/* Post Editor Component with integrated Account Selector */}
        <PostEditor 
          selectedAccounts={selectedAccountDetails} 
          onPost={handlePost}
          onSchedule={handleSchedule}
          onSaveDraft={handleSaveDraft}
          accountSelector={
            <AccountsContainer 
              maxRows={1} 
              expandBreakpoint="768px"
              itemsPerRow={6}
              selectable={true}
              onSelectionChange={handleAccountSelection}
              editable={false}
              showAddButton={false}
              displayMode="row"
              scrollable={true}
              size="md"
              hideTitle={true}
              transparent={true} // New prop to remove background styling
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
          }
        />
      </section>
      
      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Clickable Social Media Platform Icons (Custom onClick) - Not Editable</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          These cards use a custom onClick handler that overrides the default behavior and are not editable.
        </p>
        
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
      
      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Social Media Content Calendar</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Plan and schedule your social media posts across different platforms. View all your content in one place.
        </p>
        
        {/* Add a toggle for compact view */}
        <div className="mb-4 flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={isCompactView}
              onChange={() => setIsCompactView(!isCompactView)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">Compact Week View</span>
          </label>
        </div>
        
        {/* Modified to not add overflow to the container itself */}
        <div className="max-h-[600px] flex flex-col">
          <Calendar 
            initialDate={new Date()} 
            onDateClick={handleDateClick}
            highlightToday={true}
            startWeekOnSunday={true}
            events={calendarEvents}
            maxHeight="600px"
            compactWeekView={isCompactView} // Pass the compact view toggle
          />
        </div>
        
        {selectedDate && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">Selected date: {selectedDate.toLocaleDateString()}</p>
          </div>
        )}
      </section>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-medium mb-2 text-primary">Current Theme:</h3>
        <pre className="p-3 bg-white rounded text-xs overflow-x-auto">
          {JSON.stringify(themeInfo, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default App
