import { auth0 } from '@/lib/auth0';
import { Button, Container, Typography, Box } from '@mui/material';

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Smart Habit Tracker
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Build better habits, track your progress, and achieve your goals
        </Typography>
        {session ? (
          <Button
            variant="contained"
            size="large"
            href="/dashboard"
          >
            Go to Dashboard
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              href="/auth/login?screen_hint=signup"
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/auth/login"
            >
              Log In
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
