# Social Media Widget

A customizable React component for displaying social media links.

## Installation

```bash
npm install socialmedia-widget
# or
yarn add socialmedia-widget
```

## Usage

```jsx
import { SocialMediaWidget } from 'socialmedia-widget';

function App() {
  return (
    <div>
      <SocialMediaWidget 
        links={[
          { platform: 'twitter', url: 'https://twitter.com/yourusername' },
          { platform: 'facebook', url: 'https://facebook.com/yourusername' },
          { platform: 'instagram', url: 'https://instagram.com/yourusername' }
        ]}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| links | Array | An array of social media link objects |
| theme | String | Optional theme for the widget (light/dark) |

## License

MIT
