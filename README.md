# Smart Habit Tracker

A modern, feature-rich habit tracking application built with Next.js, React, and Material-UI. This application helps users build and maintain positive habits through an intuitive interface and powerful tracking features.

## Features

### Core Features
- **Habit Management**
  - Create, edit, and delete habits
  - Set custom habit frequencies and goals
  - Add tags for better organization
  - Track habit completion status

### Visualization & Analytics
- **Interactive Dashboard**
  - Habit completion calendar view
  - Progress charts and statistics
  - Visual habit streaks tracking
  - Performance analytics

### User Experience
- **Modern UI/UX**
  - Responsive design
  - Material-UI components
  - Smooth animations with Framer Motion
  - Dark/Light theme support

### Data Management
- **Local Storage**
  - Persistent habit data
  - User preferences storage
  - Progress tracking history

## Tech Stack

### Frontend
- **Framework**: Next.js 15.3.1
- **UI Library**: React 19
- **Styling**: 
  - Material-UI v7
  - TailwindCSS
  - Emotion for styled components
- **Charts**: 
  - Chart.js
  - Recharts
- **Animations**: Framer Motion

### Development Tools
- TypeScript
- ESLint
- PostCSS
- Turbopack (for development)

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- Yarn package manager

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
smart-habit-tracker-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # App-specific components
│   ├── dashboard/         # Dashboard pages
│   └── theme/            # Theme configuration
├── components/            # Shared components
│   ├── dashboard/        # Dashboard-specific components
│   └── shared/          # Reusable components
├── data/                 # Local data storage
├── lib/                  # Utility functions and helpers
├── public/              # Static assets
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
