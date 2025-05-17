# Code-Circuit-Hackathon
# FlashMaster - Smart Flashcard Web App

A modern flashcard application built with React and TailwindCSS that helps you master any subject through spaced repetition learning.

## Features

- 📚 Create and manage flashcards with topics
- 🔄 Spaced repetition algorithm for optimal learning
- 🌓 Dark/Light mode support
- 📊 Learning analytics and progress tracking
- ❤️ Favorite sets for quick access
- ⏱️ Auto-advance timer for efficient review
- 🔔 Daily study reminders
- 📱 Responsive design for all devices

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Technologies Used

- React
- TailwindCSS
- Chart.js
- Local Storage for data persistence

## Features in Detail

### Core Functionality
- **Smart Flashcard System**: Implements spaced repetition learning technique for optimal memory retention
- **Multi-Category Support**: Pre-built card sets for multiple subjects including:
  - Programming Languages (JavaScript, Python, Java)
  - Web Technologies (HTML, CSS)
  - Languages (Spanish, French, Japanese)
  - Academic Subjects (Mathematics, Biology, Chemistry)
  - Professional Skills (Business, Economics)

### Card Management
- **Create Custom Cards**: Add personalized flashcards with front/back content and topic categorization
- **Import/Export**: Share and backup your card collections in JSON format
- **Card Sets**: Pre-made card sets available for quick start
- **Difficulty Tracking**: Cards are automatically categorized as Easy, Intermediate, or Hard based on review performance
- **Delete & Undo**: Remove cards with an undo option available for 5 seconds

### Study Features
- **Spaced Repetition**: Smart scheduling of reviews based on performance
- **Review Sessions**: Interactive card review with correct/incorrect tracking
- **Auto-advance Timer**: Configurable auto-flip timer (3, 5, or 10 seconds)
- **Progress Tracking**: Track review history and performance
- **Wrong Answer Review**: Special review mode for incorrectly answered cards

### User Interface
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Card Animations**: Smooth flip animations for card review
- **Modern UI**: Clean, intuitive interface with Tailwind CSS styling
- **Hero Section**: Welcoming dashboard with clear navigation

### Analytics & Progress Tracking
- **Learning Analytics Dashboard**: Comprehensive statistics including:
  - Total Reviews
  - Average Reviews per Card
  - Mastered Cards Count
  - Mastery Rate
- **Progress Visualization**:
  - 7-day Review History Chart
  - Category Progress Bars
  - Current Learning Streak

### Customization & Settings
- **Study Reminders**: Optional daily study reminders at 9 AM
- **Sort Options**: Sort decks by recently used, oldest, or newest
- **Category Filters**: Filter cards by subject category
- **Difficulty Filters**: Filter cards by difficulty level
- **Favorite Topics**: Mark and easily access favorite subjects

### Organization
- **Topic Categories**: Organize cards by subjects and topics
- **Search Functionality**: Search across all cards and topics
- **Category Navigation**: Easy browsing through different subject areas
- **Card Sets Management**: Import and remove entire sets of cards

### User Experience
- **Progress Indicators**: Visual feedback on review progress
- **Undo Actions**: Safety net for accidental deletions
- **Keyboard Shortcuts**: Efficient navigation and review process
- **Performance Feedback**: Immediate feedback during review sessions
- **Session Summary**: Detailed review session results with success rate
### Spaced Repetition
Cards are scheduled for review based on your performance. The better you know a card, the less frequently it appears.

### Learning Analytics
Track your progress with detailed statistics including:
- Total reviews
- Average reviews per card
- Mastery rate
- Daily review history

### Study Sets
- Pre-built sets for common subjects
- Import/Export functionality
- Favorite sets for quick access
- Categorized browsing

### Smart Review System
- Three difficulty levels (Easy, Intermediate, Hard)
- Auto-advance timer option
- Daily study reminders
- Progress tracking

## License

MIT License 
