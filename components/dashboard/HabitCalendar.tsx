"use client";

import { useState } from "react";
import { Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useHabits } from "@/lib/habitContext";

export default function HabitCalendar() {
  const { habits, loading } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const getCompletionStatus = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateString = date.toISOString().split("T")[0];
    return habits.some((habit) => habit.completions[dateString]);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Typography>Loading calendar...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Month Navigation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            px: 1,
          }}
        >
          <IconButton
            onClick={handlePrevMonth}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {formatMonthYear(currentDate)}
          </Typography>
          <IconButton
            onClick={handleNextMonth}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Calendar Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            maxWidth: "600px",
            mx: "auto",
            width: "100%",
            "& > *": {
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
              minWidth: 0,
              p: 0.5,
              height: { xs: "36px", sm: "40px", md: "44px" },
              width: { xs: "36px", sm: "40px", md: "44px" },
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
            },
          }}
        >
          {/* Weekday Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Typography
              key={day}
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {day}
            </Typography>
          ))}

          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: startingDay }).map((_, index) => (
            <Box key={`empty-${index}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const isCompleted = getCompletionStatus(day);
            const isToday =
              new Date().getDate() === day &&
              new Date().getMonth() === currentDate.getMonth() &&
              new Date().getFullYear() === currentDate.getFullYear();

            return (
              <Tooltip
                key={day}
                title={isCompleted ? "Habits completed" : "No habits completed"}
                arrow
              >
                <Box
                  sx={{
                    position: "relative",
                    bgcolor: isCompleted
                      ? "success.light"
                      : "background.default",
                    border: isToday ? "2px solid" : "1px solid",
                    borderColor: isToday ? "primary.main" : "divider",
                    "&:hover": {
                      bgcolor: isCompleted ? "success.main" : "action.hover",
                      transform: "scale(1.05)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "inherit",
                      boxShadow: isCompleted
                        ? "0 0 0 1px rgba(76, 175, 80, 0.2)"
                        : "none",
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: isCompleted ? "white" : "text.primary",
                      fontWeight: isToday ? 600 : 400,
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
