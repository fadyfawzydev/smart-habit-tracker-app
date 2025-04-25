import { useState } from "react";
import {
  TextField,
  Box,
  Chip,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import { Tag } from "@mui/icons-material";
import { Habit } from "@/lib/types";
import { tagConfigs, getTagConfig } from "@/lib/tagConfig";

interface HabitFormProps {
  initialData?: {
    title: string;
    description: string;
    tags: string[];
    frequency: Habit["frequency"];
  };
  onSubmit: (data: Omit<Habit, "id" | "createdAt" | "completions">) => void;
  onCancel: () => void;
}

export default function HabitForm({
  initialData,
  onSubmit,
  onCancel,
}: HabitFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [titleTouched, setTitleTouched] = useState(false);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [frequencyType, setFrequencyType] = useState<
    Habit["frequency"]["type"]
  >(initialData?.frequency.type || "daily");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(
    initialData?.frequency.daysOfWeek || []
  );

  const handleSubmit = () => {
    if (!title.trim()) return;

    // If no tags are selected, add "Other" as default
    const finalTags = tags.length > 0 ? tags : ["Other"];

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      tags: finalTags,
      frequency: {
        type: frequencyType,
        ...(frequencyType === "weekly" && { daysOfWeek }),
      },
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
    });
  };

  const availableTags = Object.keys(tagConfigs);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTitleTouched(true)}
        fullWidth
        required
        error={titleTouched && !title.trim()}
        helperText={titleTouched && !title.trim() ? "Title is required" : ""}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {tags.map((tag) => {
            const config = getTagConfig(tag);
            return (
              <Chip
                key={tag}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {config.emoji && <span>{config.emoji}</span>}
                    <span>{tag}</span>
                  </Box>
                }
                onDelete={() => setTags(tags.filter((t) => t !== tag))}
                sx={{
                  backgroundColor: `${config.color}20`,
                  borderColor: config.color,
                  color: config.color,
                  "& .MuiChip-deleteIcon": {
                    color: config.color,
                    "&:hover": {
                      color: "white",
                    },
                  },
                }}
              />
            );
          })}
        </Box>

        <Autocomplete
          multiple
          freeSolo
          options={availableTags}
          value={tags}
          onChange={(_, newValue) => setTags(newValue)}
          renderOption={(props, option) => {
            const config = getTagConfig(option);
            const { key, ...otherProps } = props;
            return (
              <li key={key} {...otherProps}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: `${config.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: config.color,
                    }}
                  >
                    {config.emoji}
                  </Box>
                  <Typography>{option}</Typography>
                </Box>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select or create tags"
              placeholder="Type to add tags"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Tag sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              paddingLeft: "12px",
            },
          }}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Frequency</InputLabel>
        <Select
          value={frequencyType}
          label="Frequency"
          onChange={(e) =>
            setFrequencyType(e.target.value as Habit["frequency"]["type"])
          }
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>

      {frequencyType === "weekly" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Select Days
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              "& .MuiButtonBase-root": {
                minWidth: "auto",
                width: "50px",
                height: "50px",
                padding: "4px",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: "divider",
                "&.Mui-checked": {
                  backgroundColor: "primary.main",
                  color: "white",
                  borderColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              },
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <Button
                  key={index}
                  variant={
                    daysOfWeek.includes(
                      [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][index]
                    )
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => {
                    const dayName = [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ][index];
                    setDaysOfWeek((prev) =>
                      prev.includes(dayName)
                        ? prev.filter((d) => d !== dayName)
                        : [...prev, dayName]
                    );
                  }}
                >
                  {day}
                </Button>
              )
            )}
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onCancel} fullWidth>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Save
        </Button>
      </Box>
    </Box>
  );
}
