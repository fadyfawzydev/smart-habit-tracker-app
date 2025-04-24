import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { ThemeToggle } from "./ThemeToggle";

export default async function Navigation() {
  const session = await auth0.getSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Smart Habit Tracker
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle />
          {session ? (
            <>
              <Typography variant="body1">
                Hi, {session.user.name?.split(' ')[0]}
              </Typography>
              <Button color="inherit" href="/auth/logout" component="a">
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" href="/auth/login" component="a">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
