import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface EmptyStateProps {
  onAddHabit: () => void;
}

export default function EmptyState({ onAddHabit }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 2,
        border: "1px dashed",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No habits added yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click the + button above to start tracking your first habit
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onAddHabit}>
        Add Your First Habit
      </Button>
    </Box>
  );
}
