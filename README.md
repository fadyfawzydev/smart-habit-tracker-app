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
- **JSONBin.io Integration**
  - Secure cloud storage
  - Real-time data synchronization
  - Persistent habit data
  - User preferences storage

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

### Backend
- **Data Storage**: JSONBin.io
- **Authentication**: Auth0

### Development Tools
- TypeScript
- ESLint
- PostCSS
- Jest for testing
- Turbopack (for development)

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- Yarn package manager
- JSONBin.io account (free tier)

### Setup JSONBin.io
1. Create a JSONBin.io account at [https://jsonbin.io/](https://jsonbin.io/)
2. Create a new bin:
   - Click "Create New Bin"
   - Give it a name (e.g., "habit-tracker")
   - Click "Create"
3. Get your credentials:
   - Go to your profile → API Keys
   - Copy your Master Key (starts with `$2b$10$`)
   - Copy your Bin ID

### Environment Variables
Create a `.env.local` file in the project root with the following variables:

```bash
# Auth0 Configuration
AUTH0_DOMAIN=dev-rykhzmm8gt5rmq6d.us.auth0.com
AUTH0_CLIENT_ID=AnZgGkbTijG4xCesQ9UA9fRpIpjX29jK
AUTH0_CLIENT_SECRET=oO_BtmgVRYgC1QDrBOrajyVVEyN9cIa_D8PKPbDhpu8XO9H00xQURzx8Q3uQborE
AUTH0_SECRET=0106330b9578e7a0f9b5f952c7e39a1766d59436b8a13bfcd5b827cf9bc9162d
APP_BASE_URL=http://localhost:3000/

# JSONBin.io Configuration
NEXT_PUBLIC_JSONBIN_BIN_ID=680be3098561e97a5007992e
JSONBIN_API_KEY=$2a$10$.EDltonN.rU19wP07vfaVOEmVL.EWfN0BHCIoN9xnFPT297lYu3Iq
```

⚠️ **Security Note**: 
- Never commit the `.env.local` file to version control
- Keep your Auth0 and JSONBin.io credentials secure
- The provided credentials are for development only. For production, use your own secure credentials.

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
   - Create `.env.local` file as described above
   - Add your JSONBin.io credentials

4. Start the development server
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Testing the Setup
To verify your JSONBin.io setup is working correctly, visit:
```
http://localhost:3000/api/test-connection
```
You should see a success message if everything is configured properly.

### Building for Production

To create a production build:

```bash
yarn build
```

This will:
- Compile and optimize all pages
- Generate static pages where possible
- Create server-side rendered pages
- Optimize assets and images
- Generate middleware

To start the production server:

```bash
yarn start
```

### Testing

Run the test suite:

```bash
yarn test
```

Run tests in watch mode during development:

```bash
yarn test:watch
```

Generate test coverage report:

```bash
yarn test:coverage
```

The project includes:
- Unit tests for components and utilities
- Integration tests for API routes
- Mock implementations for Next.js features
- Jest configuration in `jest.config.js` and `jest.setup.js`

## Test Account

For testing purposes, you can use the following test account credentials:

- **Email**: test@mail.com
- **Password**: 95iPYAeUkjcD8xR

The test account comes with pre-configured habits and data to help you explore the application's features. You can find the test account login section on the home page.

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
│   └── __mocks__/       # Mock implementations for testing
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
