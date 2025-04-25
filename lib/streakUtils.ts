export function calculateStreaks(completions: Record<string, boolean>): {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
} {
  const dates = Object.keys(completions)
    .filter(date => completions[date])
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak
  const lastDate = new Date(dates[0]);
  lastDate.setHours(0, 0, 0, 0);
  
  if (lastDate.getTime() === today.getTime() || 
      lastDate.getTime() === today.getTime() - 86400000) { // 86400000 = 1 day in ms
    currentStreak = 1;
    let prevDate = lastDate;
    
    for (let i = 1; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      currentDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((prevDate.getTime() - currentDate.getTime()) / 86400000);
      
      if (diffDays === 1) {
        currentStreak++;
        prevDate = currentDate;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  tempStreak = 1;
  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const prevDate = new Date(dates[i - 1]);
    const diffDays = Math.floor((prevDate.getTime() - currentDate.getTime()) / 86400000);
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    currentStreak,
    longestStreak,
    lastCompletedDate: dates[0] || null
  };
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 100) return '🔥🔥🔥';
  if (streak >= 50) return '🔥🔥';
  if (streak >= 10) return '🔥';
  if (streak >= 5) return '✨';
  if (streak >= 3) return '⭐';
  return '';
}

export function getStreakColor(streak: number): string {
  if (streak >= 100) return '#FF4500'; // Orange Red
  if (streak >= 50) return '#FF8C00'; // Dark Orange
  if (streak >= 10) return '#FFA500'; // Orange
  if (streak >= 5) return '#FFD700'; // Gold
  if (streak >= 3) return '#DAA520'; // Goldenrod
  return '#808080'; // Gray
} 