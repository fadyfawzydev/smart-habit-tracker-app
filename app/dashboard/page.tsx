import { auth0 } from "@/lib/auth0";
import { Container, Grid, Typography, Box } from "@mui/material";

export default async function Dashboard() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5">
            Please log in to view your dashboard
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {session.user.name}!
        </Typography>
        <Grid container spacing={3}>
          {/* Add your dashboard content here */}
        </Grid>
      </Box>
    </Container>
  );
}
