# API Documentation

## Components

### AccountCard

Display information about a social media account.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `platform` | `string` | Social media platform identifier | Required |
| `username` | `string` | Account username | Required |
| `avatar` | `string` | URL to avatar image | `undefined` |
| `stats` | `object` | Account statistics: `{followers, following, posts}` | `{}` |
| `verified` | `boolean` | Whether the account is verified | `false` |
| `onClick` | `function` | Click handler for the card | `undefined` |
| `className` | `string` | Additional CSS class for styling | `''` |

### AccountContainer

Container for organizing multiple account cards.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `title` | `string` | Container title | `''` |
| `layout` | `'grid'` \| `'list'` | Layout arrangement | `'grid'` |
| `maxColumns` | `number` | Maximum columns in grid layout | `3` |
| `className` | `string` | Additional CSS class for styling | `''` |
| `children` | `node` | AccountCard components | Required |

### Calendar

Calendar component for scheduling posts.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `events` | `array` | Array of event objects | `[]` |
| `onEventClick` | `function` | Handler for clicking events | `undefined` |
| `onEventAdd` | `function` | Handler for adding events | `undefined` |
| `onEventUpdate` | `function` | Handler for updating events | `undefined` |
| `onEventDelete` | `function` | Handler for deleting events | `undefined` |
| `viewOptions` | `object` | Calendar view settings | `{}` |
| `className` | `string` | Additional CSS class for styling | `''` |

#### Event Object Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `id` | `string` | Unique event identifier | Yes |
| `title` | `string` | Event title | No |
| `description` | `string` | Event description | No |
| `startTime` | `Date` \| `string` | Event start time | Yes |
| `endTime` | `Date` \| `string` | Event end time | No |
| `color` | `string` | Event color (CSS color) | No |
| `isAllDay` | `boolean` | Whether the event spans all day | No |
| `metadata` | `object` | Additional event data | No |
| `services` | `string[]` | Social media services for the event | No |

### PostEditor

Rich text editor for creating social media posts.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `platforms` | `string[]` | Target platforms for the post | `[]` |
| `initialContent` | `string` | Starting content text | `''` |
| `characterLimit` | `number` | Maximum character count | `undefined` |
| `onContentChange` | `function` | Handler when content changes | `undefined` |
| `onSave` | `function` | Handler for saving content | `undefined` |
| `onSchedule` | `function` | Handler for scheduling posts | `undefined` |
| `attachments` | `array` | Array of attachment objects | `[]` |
| `className` | `string` | Additional CSS class for styling | `''` |

### ThemeProvider

Context provider for theme customization.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `theme` | `object` | Theme configuration object | Default theme |
| `children` | `node` | Child components | Required |

#### Theme Object Properties

```javascript
{
  colors: {
    primary: '#4F46E5',
    secondary: '#10B981',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: {
      primary: '#111827',
      secondary: '#6B7280'
    },
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: '6px',
  shadows: {
    small: '0 1px 2px rgba(0,0,0,0.05)',
    medium: '0 4px 6px rgba(0,0,0,0.05)',
    large: '0 10px 15px rgba(0,0,0,0.05)'
  }
}
```

## Hooks

### useTheme

```javascript
import { useTheme } from 'socialmedia-tools-ui';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Themed component
    </div>
  );
}
```

## CalendarEvent Class

### Constructor

```javascript
import { CalendarEvent } from 'socialmedia-tools-ui';

const event = new CalendarEvent({
  id: 'unique-id',
  title: 'My Social Post',
  description: 'Description of the post',
  startTime: new Date(2023, 5, 15, 14, 0),
  endTime: new Date(2023, 5, 15, 14, 30),
  color: '#1DA1F2',
  isAllDay: false,
  metadata: { importance: 'high' },
  services: ['twitter', 'facebook']
});
```

### Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `hasEndTime()` | None | `boolean` | Checks if the event has an end time |
| `static fromObject(eventData)` | `eventData`: Object | `CalendarEvent` | Creates a CalendarEvent from a plain object |
| `static fromArray(eventsArray)` | `eventsArray`: Array | `Array<CalendarEvent>` | Converts an array of plain objects to CalendarEvent instances |

## Constants

### availablePlatforms

Array of supported social media platforms:
- 'twitter'
- 'facebook'
- 'instagram'
- 'linkedin'
- 'youtube'
- 'tiktok'
- 'pinterest'
