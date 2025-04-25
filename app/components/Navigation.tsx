import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { ThemeToggle } from "./ThemeToggle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MobileNavigation from "./MobileNavigation";

export default async function Navigation() {
  const session = await auth0.getSession();

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" component="div">
          Smart Habit Tracker
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <ListItem>
          <ListItemIcon>
            <ThemeToggle />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </ListItem>
        {session ? (
          <>
            <ListItem>
              <ListItemText
                primary={`Hi, ${session.user.name?.split(" ")[0]}`}
                primaryTypographyProps={{
                  sx: {
                    color: "primary.main",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem>
              <Button
                color="inherit"
                href="/auth/logout"
                component="a"
                fullWidth
                startIcon={<LogoutIcon />}
                sx={{
                  justifyContent: "flex-start",
                  pl: 2,
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "white",
                  },
                }}
              >
                Logout
              </Button>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <Button
              color="inherit"
              href="/auth/login"
              component="a"
              fullWidth
              startIcon={<LoginIcon />}
              sx={{
                justifyContent: "flex-start",
                pl: 2,
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <MobileNavigation drawerContent={drawerContent} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            "& a": {
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          <Link href="/">Smart Habit Tracker</Link>
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <ThemeToggle />
          {session ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                Hi, {session.user.given_name}
              </Typography>
              <Button
                color="inherit"
                href="/auth/logout"
                component="a"
                startIcon={<LogoutIcon />}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "white",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              href="/auth/login"
              component="a"
              startIcon={<LoginIcon />}
              sx={{
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
