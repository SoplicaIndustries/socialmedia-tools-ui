# Social Media Widget

[![npm version](https://img.shields.io/npm/v/socialmedia-tools-ui.svg)](https://www.npmjs.com/package/socialmedia-tools-ui)
[![license](https://img.shields.io/npm/l/socialmedia-tools-ui.svg)](https://github.com/yourusername/react-sm-lib/blob/main/LICENSE)

A comprehensive React component library for social media integration, scheduling, and content management.

## Features

- 🎨 Fully customizable with theming support
- 📱 Social account management cards and containers
- 📅 Calendar for scheduling posts
- ✏️ Post editor with platform-specific features
- 🌗 Light/dark mode support

## Installation

```bash
npm install socialmedia-tools-ui
# or
yarn add socialmedia-tools-ui
```

## Quick Start

```jsx
import React from 'react';
import { 
  AccountCard, 
  AccountContainer, 
  Calendar, 
  PostEditor,
  ThemeProvider 
} from 'socialmedia-tools-ui';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <h2>Social Media Accounts</h2>
        <AccountContainer>
          <AccountCard 
            platform="twitter"
            username="twitteruser"
            stats={{followers: 1200, following: 350, posts: 520}}
          />
          <AccountCard 
            platform="instagram"
            username="instagramuser"
            stats={{followers: 2500, following: 450, posts: 120}}
          />
        </AccountContainer>
        
        <h2>Content Calendar</h2>
        <Calendar 
          events={[
            {
              id: 'event1',
              title: 'Twitter Post',
              description: 'New product announcement',
              startTime: new Date(2023, 5, 15, 14, 0),
              services: ['twitter']
            },
            {
              id: 'event2',
              title: 'Instagram Story',
              description: 'Behind the scenes content',
              startTime: new Date(2023, 5, 16, 10, 0),
              services: ['instagram']
            }
          ]}
        />
        
        <h2>Create New Post</h2>
        <PostEditor 
          platforms={['twitter', 'facebook', 'instagram']}
          onSave={(content) => console.log('Post content:', content)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Components

### AccountCard

Display information about a social media account with key stats.

```jsx
import { AccountCard } from 'socialmedia-tools-ui';

<AccountCard 
  platform="twitter"
  username="twitteruser"
  avatar="https://example.com/avatar.jpg"
  stats={{
    followers: 1200,
    following: 350,
    posts: 520
  }}
  onSelect={() => console.log('Account selected')}
/>
```

### AccountContainer

A container component for organizing multiple AccountCard components.

```jsx
import { AccountContainer, AccountCard } from 'socialmedia-tools-ui';

<AccountContainer title="My Social Accounts" layout="grid">
  <AccountCard platform="twitter" username="twitteruser" />
  <AccountCard platform="instagram" username="instagramuser" />
  <AccountCard platform="facebook" username="facebookuser" />
</AccountContainer>
```

### Calendar

A calendar component for scheduling and visualizing social media posts.

```jsx
import { Calendar } from 'socialmedia-tools-ui';

<Calendar 
  events={[
    {
      id: 'event1',
      title: 'Twitter Post',
      description: 'Product launch announcement',
      startTime: new Date(2023, 5, 15, 14, 0),
      services: ['twitter'],
      color: '#1DA1F2'
    }
  ]}
  onEventClick={(event) => console.log('Event clicked:', event)}
  onEventAdd={(event) => console.log('Event added:', event)}
/>
```

### PostEditor

A rich text editor for creating social media posts with platform-specific features.

```jsx
import { PostEditor } from 'socialmedia-tools-ui';

<PostEditor 
  platforms={['twitter', 'facebook', 'instagram']}
  initialContent="What's on your mind?"
  characterLimit={280}
  onSave={(content) => console.log('Post content:', content)}
  onSchedule={(content, date) => console.log('Schedule for:', date)}
/>
```

## Theme Customization

The library supports comprehensive theming through React Context.

```jsx
import { ThemeProvider } from 'socialmedia-tools-ui';

// Custom theme
const darkTheme = {
  colors: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#1e1e1e',
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: '8px',
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.12)',
    large: '0 8px 16px rgba(0,0,0,0.14)'
  }
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* Your components here */}
    </ThemeProvider>
  );
}
```

## Advanced Usage

### Calendar Events

Create structured calendar events for your social media schedule:

```jsx
import { Calendar } from 'socialmedia-tools-ui';

// Create events
const events = [
  {
    id: 'post-1',
    title: 'Product Launch Tweet',
    description: 'Announce the new feature set',
    startTime: new Date(2023, 5, 15, 14, 0),
    endTime: new Date(2023, 5, 15, 14, 30),
    color: '#1DA1F2',
    isAllDay: false,
    services: ['twitter'],
    metadata: {
      approvalStatus: 'pending',
      targetAudience: 'developers'
    }
  },
  {
    id: 'post-2',
    title: 'Instagram Campaign',
    description: 'Lifestyle photos of product in use',
    startTime: new Date(2023, 5, 16),
    isAllDay: true,
    color: '#E1306C',
    services: ['instagram'],
    metadata: {
      approvalStatus: 'approved',
      campaign: 'summer-launch'
    }
  }
];

<Calendar 
  events={events}
  viewOptions={{
    defaultView: 'week',
    showWeekends: true
  }}
/>
```

### Available Social Media Platforms

```jsx
import { availablePlatforms } from 'socialmedia-tools-ui';

console.log(availablePlatforms); 
// ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'pinterest']
```

## API Reference

Complete API documentation is available in our [API docs](https://github.com/yourusername/react-sm-lib/docs/api.md).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/yourusername/react-sm-lib/CONTRIBUTING.md) for details.

## License

MIT
