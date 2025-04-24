"use client";

import {
  IconButton,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme as useCustomTheme } from "../theme/ThemeProvider";

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useCustomTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        aria-label="toggle dark mode"
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
} 