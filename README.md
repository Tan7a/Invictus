# AI Chat Interface

A responsive web application that replicates the Claude AI chat interface with modern design and interactive features.

## Features

### Core Interface
- **Dark Theme**: Professional dark mode interface matching Claude AI's aesthetic
- **Responsive Design**: Fully responsive layout that adapts to desktop, tablet, and mobile devices
- **Sidebar Navigation**: Collapsible sidebar with chat history and new chat functionality
- **Chat Messages**: Support for both AI and user messages with proper styling

### Interactive Features
- **Text Selection**: Select text in AI responses to trigger contextual actions
- **Context Menu**: Right-click or select text to access options:
  - Expand: Generate more detailed information
  - Improve: Rewrite text for better clarity
  - Find source: Locate source information
  - Ask Invictus: Generate follow-up questions
- **Configuration Panel**: Comprehensive AI settings including:
  - Role/Profession selection (Strategist, Marketer, Analyst, etc.)
  - Structure preferences (Paragraphs, Bullet points, Sections, Numbered steps)
  - Output length control with slider
  - Tone adjustment with interactive graph (Casual/Formal, Supportive/Critical)

### Responsive Behavior
- **Desktop (1200px+)**: Full sidebar and wide chat area
- **Tablet (768px-1199px)**: Compact sidebar, optimized input area
- **Mobile (480px-767px)**: Bottom navigation, stacked input elements
- **Small Mobile (<480px)**: Full mobile optimization with bottom sidebar

### Technical Features
- **Progressive Web App**: Service worker for offline functionality
- **Keyboard Shortcuts**: 
  - `Enter` to send messages
  - `Ctrl + /` to open configuration panel
  - `Escape` to close panels
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized CSS animations and efficient JavaScript

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling with responsive design
├── script.js           # Interactive JavaScript functionality
├── sw.js              # Service worker for PWA capabilities
└── README.md          # This file
```

## Usage

1. **Open the Application**: Simply open `index.html` in a web browser
2. **Start Chatting**: Type in the input field and press Enter or click send
3. **Select Text**: Click and drag to select text in AI responses
4. **Configure AI**: Click on context chips (Q Research, Project Title, Project DNA) to open settings
5. **Mobile Use**: The interface automatically adapts to mobile devices with bottom navigation

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors
The app uses CSS custom properties for easy theming:
- Primary accent: `#f59e0b` (orange)
- Background: `#1c1c1c` (dark gray)
- Sidebar: `#111111` (darker gray)
- Text: `#d9d9d9` (light gray)

### Adding New Features
1. **New Context Actions**: Add to `handleContextAction()` method in `script.js`
2. **Additional AI Roles**: Modify the role grid in `index.html`
3. **Custom Styling**: Override CSS classes in `styles.css`

## Development

To extend this application:

1. **Backend Integration**: Replace the `simulateAIResponse()` method with actual API calls
2. **Chat Persistence**: Add localStorage or database integration for chat history
3. **User Authentication**: Implement login/signup functionality
4. **File Uploads**: Add drag-and-drop file support
5. **Voice Input**: Integrate speech-to-text capabilities

## License

This project is open source and available under the MIT License.
