import { getUser } from "@/lib/auth0";
import { Container, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import HabitStats from "@/components/dashboard/HabitStats";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { HabitProvider } from "@/lib/habitContext";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <HabitProvider>
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Box 
          sx={{ 
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Welcome back!
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            gutterBottom
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Track your habits and build a better you
          </Typography>
        </Box>

        {/* Stats Section - Always visible */}
        <Box 
          sx={{ 
            mb: { xs: 2, sm: 3, md: 4 },
            '& > *': {
              mb: { xs: 2, sm: 0 }
            }
          }}
        >
          <HabitStats />
        </Box>

        {/* Tabbed Content */}
        <DashboardTabs />
      </Container>
    </HabitProvider>
  );
}
