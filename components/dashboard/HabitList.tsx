"use client";

import { useState } from "react";
import { Box, Typography, Fab, useTheme } from "@mui/material";
import { Add, Tag } from "@mui/icons-material";
import { Habit } from "@/lib/types";
import { useHabits } from "@/lib/habitContext";
import HabitCard from "./HabitCard";
import TagFilter from "./TagFilter";
import EmptyState from "./EmptyState";
import AddHabitDialog from "./AddHabitDialog";
import EditHabitDialog from "./EditHabitDialog";

export default function HabitsList() {
  const { habits, refreshHabits } = useHabits();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const theme = useTheme();

  const handleComplete = async (habitId: string) => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
      
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const updatedCompletions = {
        ...habit.completions,
        [today]: !habit.completions[today],
      };

      await fetch("/api/habits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: habitId,
          completions: updatedCompletions,
        }),
      });

      await refreshHabits();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleDelete = async (habitId: string) => {
    try {
      await fetch("/api/habits", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: habitId }),
      });
      await refreshHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleAddHabit = async (
    habitData: Omit<Habit, "id" | "createdAt" | "completions">
  ) => {
    try {
      const newHabit = {
        ...habitData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completions: {},
      };

      await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      await refreshHabits();
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const handleEditHabit = async (
    habitData: Omit<Habit, "id" | "createdAt" | "completions">
  ) => {
    if (!selectedHabit) return;

    try {
      await fetch("/api/habits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedHabit.id,
          ...habitData,
        }),
      });

      await refreshHabits();
      setEditDialogOpen(false);
      setSelectedHabit(null);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const filteredHabits =
    selectedTag === "All"
      ? habits
      : habits.filter((habit) => habit.tags.includes(selectedTag));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          <Tag /> Your Habits
        </Typography>
        {habits.length > 0 && (
          <Fab
            color="primary"
            size="small"
            onClick={() => setAddDialogOpen(true)}
            sx={{ 
              boxShadow: theme.shadows[4],
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 }
            }}
          >
            <Add fontSize="small" />
          </Fab>
        )}
      </Box>

      {habits.length > 0 && (
        <TagFilter
          habits={habits}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      )}

      {habits.length === 0 ? (
        <EmptyState onAddHabit={() => setAddDialogOpen(true)} />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: { xs: 2, sm: 3 },
            width: "100%",
            "& > *": {
              width: "100%",
              maxWidth: "100%"
            }
          }}
        >
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={handleComplete}
              onEdit={(habit) => {
                setSelectedHabit(habit);
                setEditDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}

      <AddHabitDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAddHabit={handleAddHabit}
      />

      <EditHabitDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedHabit(null);
        }}
        onUpdateHabit={handleEditHabit}
        habit={selectedHabit}
      />
    </Box>
  );
}
