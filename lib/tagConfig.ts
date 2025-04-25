export type TagConfig = {
  color: string;
  emoji: string;
};

export const tagConfigs: Record<string, TagConfig> = {
  'Health': { color: '#4CAF50', emoji: '🏥' },
  'Productivity': { color: '#2196F3', emoji: '📈' },
  'Fitness': { color: '#FF5722', emoji: '💪' },
  'Learning': { color: '#9C27B0', emoji: '📚' },
  'Mindfulness': { color: '#00BCD4', emoji: '🧘' },
  'Other': { color: '#9E9E9E', emoji: '📝' }
};

export function getTagConfig(tag: string | undefined | null): TagConfig {
  // If tag is undefined, null, or empty, return the "Other" config
  if (!tag || tag.trim() === '') {
    return tagConfigs['Other'];
  }

  // If the tag exists in our config, return it
  if (tagConfigs[tag]) {
    return tagConfigs[tag];
  }

  // For custom tags, generate a consistent color based on the tag name
  const customColor = stringToColor(tag);
  return {
    color: customColor,
    emoji: '📝' // Default emoji for custom tags
  };
}

// Helper function to generate a consistent color from a string
function stringToColor(str: string): string {
  if (!str || typeof str !== 'string') {
    return tagConfigs['Other'].color;
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
} 