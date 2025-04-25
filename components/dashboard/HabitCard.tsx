import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  useTheme,
  Divider,
  LinearProgress,
  Tooltip,
  Stack,
} from "@mui/material";
import { CheckCircle, Edit, Delete, CalendarToday } from "@mui/icons-material";
import { Habit } from "@/lib/types";
import { getTagConfig } from "@/lib/tagConfig";
import {
  calculateStreaks,
  getStreakEmoji,
  getStreakColor,
} from "@/lib/streakUtils";

interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitCard({
  habit,
  onComplete,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const theme = useTheme();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
  const isCompleted = habit.completions[today];
  const streakData = calculateStreaks(habit.completions);
  const streakEmoji = getStreakEmoji(streakData.currentStreak);
  const streakColor = getStreakColor(streakData.currentStreak);

  // Format frequency display
  const formatFrequency = (frequency: Habit["frequency"]) => {
    if (frequency.type === "daily") return "Daily";
    if (frequency.type === "weekly") {
      if (frequency.daysOfWeek?.length === 7) return "Daily";
      if (frequency.daysOfWeek?.length === 5) return "Weekdays";
      if (frequency.daysOfWeek?.length === 2) return "Weekends";
      return `${frequency.daysOfWeek?.length} days/week`;
    }
    if (frequency.type === "monthly") {
      return `Monthly (${frequency.daysOfMonth} days)`;
    }
    return frequency.type;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 260,
        position: "relative",
        transition: "all 0.3s ease-in-out",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={2}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {habit.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {habit.description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Edit Habit">
                <IconButton
                  size="small"
                  onClick={() => onEdit(habit)}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Habit">
                <IconButton
                  size="small"
                  onClick={() => onDelete(habit.id)}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "error.main",
                      backgroundColor: "error.light",
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Progress Section */}
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="caption" color="text.secondary">
                Today&apos;s Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isCompleted ? "100%" : "0%"}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={isCompleted ? 100 : 0}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: isCompleted
                    ? "success.main"
                    : "primary.main",
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          {/* Info Section */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              icon={<CalendarToday fontSize="small" />}
              label={formatFrequency(habit.frequency)}
              size="small"
              sx={{
                backgroundColor: `${streakColor}20`,
                color: streakColor,
                borderColor: streakColor,
                fontWeight: 500,
              }}
            />
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <span style={{ fontSize: "1.2rem" }}>{streakEmoji}</span>
                  <span>{streakData.currentStreak} days</span>
                </Box>
              }
              size="small"
              sx={{
                backgroundColor: `${streakColor}20`,
                color: streakColor,
                borderColor: streakColor,
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Tags Section */}
          {habit.tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {habit.tags.map((tag) => {
                const config = getTagConfig(tag);
                return (
                  <Chip
                    key={tag}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        {config.emoji && <span>{config.emoji}</span>}
                        <span>{tag}</span>
                      </Box>
                    }
                    size="small"
                    sx={{
                      backgroundColor: `${config.color}20`,
                      color: config.color,
                      borderColor: config.color,
                      fontWeight: 500,
                    }}
                  />
                );
              })}
            </Box>
          )}
        </Stack>
      </CardContent>

      <Divider sx={{ opacity: 0.5 }} />

      <CardActions sx={{ p: 1.5 }}>
        <Button
          fullWidth
          variant={isCompleted ? "contained" : "outlined"}
          color={isCompleted ? "success" : "primary"}
          startIcon={<CheckCircle />}
          onClick={() => onComplete(habit.id)}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 1,
          }}
        >
          {isCompleted ? "Completed" : "Mark Complete"}
        </Button>
      </CardActions>
    </Card>
  );
}
