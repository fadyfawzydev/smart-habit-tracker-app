"use client";

import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Habit } from "@/lib/types";
import HabitForm from "./HabitForm";

interface EditHabitDialogProps {
  open: boolean;
  onClose: () => void;
  habit: Habit | null;
  onUpdateHabit: (habit: Omit<Habit, "id" | "createdAt" | "completions">) => void;
}

export default function EditHabitDialog({
  open,
  onClose,
  habit,
  onUpdateHabit,
}: EditHabitDialogProps) {
  const handleSubmit = (data: Omit<Habit, "id" | "createdAt" | "completions">) => {
    onUpdateHabit(data);
    onClose();
  };

  if (!habit) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Edit />
          Edit Habit
        </Box>
      </DialogTitle>
      <DialogContent>
        <HabitForm
          initialData={{
            title: habit.title,
            description: habit.description,
            tags: habit.tags,
            frequency: habit.frequency,
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
