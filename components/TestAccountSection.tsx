"use client";

import { Paper, Typography, Box, IconButton, Button } from "@mui/material";
import { BugReport, ContentCopy } from "@mui/icons-material";

export default function TestAccountSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <BugReport color="primary" />
        <Typography variant="subtitle1" fontWeight="medium">
          Test Account
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Email
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              bgcolor: "background.default",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ flex: 1 }}>
              test@mail.com
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                navigator.clipboard.writeText("test@mail.com");
              }}
            >
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Password
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              bgcolor: "background.default",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ flex: 1 }}>
              95iPYAeUkjcD8xR
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                navigator.clipboard.writeText("95iPYAeUkjcD8xR");
              }}
            >
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Button variant="contained" href="/auth/login" fullWidth sx={{ mt: 1 }}>
          Login with Test Account
        </Button>
      </Box>
    </Paper>
  );
}
