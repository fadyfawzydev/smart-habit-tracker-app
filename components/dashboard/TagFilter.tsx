import { Box, Typography, Chip } from "@mui/material";
import { Habit } from "@/lib/types";
import { getTagConfig } from "@/lib/tagConfig";

interface TagFilterProps {
  habits: Habit[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export default function TagFilter({ habits, selectedTag, onTagSelect }: TagFilterProps) {
  const allTags = [
    "All",
    ...Array.from(new Set(habits.flatMap((habit) => habit.tags))),
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Filter by Tags
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allTags.map((tag) => {
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
              onClick={() => onTagSelect(tag)}
              color={selectedTag === tag ? "primary" : "default"}
              variant={selectedTag === tag ? "filled" : "outlined"}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  selectedTag === tag ? config.color : "transparent",
                borderColor: config.color,
                color: selectedTag === tag ? "white" : config.color,
                "&:hover": {
                  backgroundColor: `${config.color}20`,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
} 