"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Habit } from "@/lib/types";
import HabitForm from "./HabitForm";

interface AddHabitDialogProps {
  open: boolean;
  onClose: () => void;
  onAddHabit: (habit: Omit<Habit, "id" | "createdAt" | "completions">) => void;
}

export default function AddHabitDialog({
  open,
  onClose,
  onAddHabit,
}: AddHabitDialogProps) {
  const handleSubmit = (data: Omit<Habit, "id" | "createdAt" | "completions">) => {
    onAddHabit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Add />
          Add New Habit
        </Box>
      </DialogTitle>
      <DialogContent>
        <HabitForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
