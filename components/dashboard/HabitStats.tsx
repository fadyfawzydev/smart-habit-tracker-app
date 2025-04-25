'use client';

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  EmojiEvents,
  Psychology,
} from '@mui/icons-material';
import { getTagConfig } from '@/lib/tagConfig';
import { useHabits } from '@/lib/habitContext';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  tooltip?: string;
}

function StatsCard({ title, value, icon, color, tooltip }: StatsCardProps) {
  return (
    <Tooltip title={tooltip} arrow>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, sm: 1.5, lg: 2 },
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5, lg: 2 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: color,
            opacity: 0.2,
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 32, sm: 36, lg: 40 },
            height: { xs: 32, sm: 36, lg: 40 },
            borderRadius: '50%',
            bgcolor: `${color}15`,
            color: color,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              bgcolor: `${color}25`,
            }
          }}
        >
          {icon}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '0.875rem', sm: '1rem', lg: '1.25rem' },
              lineHeight: 1.2
            }}
          >
            {value}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.75rem', lg: '0.875rem' },
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </Typography>
        </Box>
      </Paper>
    </Tooltip>
  );
}

export default function HabitStats() {
  const { habits, loading } = useHabits();

  const calculateStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    const totalHabits = habits.length;
    
    if (totalHabits === 0) {
      return {
        totalHabits: 0,
        completedToday: 0,
        completionRate: 0,
        averageStreak: '0.0',
        longestStreak: 0,
        topTags: [],
      };
    }

    const completedToday = habits.filter(h => h.completions[today]).length;
    const completionRate = (completedToday / totalHabits) * 100;
    const totalStreaks = habits.reduce((sum, h) => sum + (h.currentStreak || 0), 0);
    const averageStreak = (totalStreaks / totalHabits).toFixed(1);
    const longestStreak = Math.max(...habits.map(h => h.longestStreak || 0), 0);

    // Calculate tag distribution
    const tagCounts = habits.reduce((acc, habit) => {
      (habit.tags || []).forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      totalHabits,
      completedToday,
      completionRate,
      averageStreak,
      longestStreak,
      topTags,
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const stats = calculateStats();

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          mb: { xs: 1.5, sm: 2 },
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Habit Insights
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 1.5, lg: 2 },
          '& > *': {
            flex: { 
              xs: '0 0 calc(50% - 8px)',
              sm: '0 0 calc(50% - 12px)',
              lg: '0 0 calc(25% - 16px)'
            },
            minWidth: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 12px)', lg: 'calc(25% - 16px)' },
            maxWidth: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 12px)', lg: 'calc(25% - 16px)' }
          }
        }}
      >
        <Box>
          <StatsCard
            title="Total Habits"
            value={stats.totalHabits}
            icon={<Psychology fontSize="small" />}
            color="#2196f3"
            tooltip={stats.totalHabits === 0 ? "No habits yet" : "Number of habits you're tracking"}
          />
        </Box>
        <Box>
          <StatsCard
            title="Today's Progress"
            value={`${stats.completionRate.toFixed(0)}%`}
            icon={<CheckCircle fontSize="small" />}
            color="#4caf50"
            tooltip={stats.totalHabits === 0 
              ? "No habits to track" 
              : `${stats.completedToday} of ${stats.totalHabits} habits completed today`}
          />
        </Box>
        <Box>
          <StatsCard
            title="Avg. Streak"
            value={stats.averageStreak}
            icon={<TrendingUp fontSize="small" />}
            color="#ff9800"
            tooltip={stats.totalHabits === 0 ? "No streaks yet" : "Average current streak across all habits"}
          />
        </Box>
        <Box>
          <StatsCard
            title="Best Streak"
            value={stats.longestStreak}
            icon={<EmojiEvents fontSize="small" />}
            color="#e91e63"
            tooltip={stats.totalHabits === 0 ? "No streaks yet" : "Longest streak achieved across all habits"}
          />
        </Box>
      </Box>

      {stats.topTags.length > 0 && (
        <Paper 
          sx={{ 
            p: { xs: 1.5, sm: 2 },
            mt: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <Typography 
            variant="subtitle1" 
            gutterBottom
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Top Categories
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              '& > *': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }
            }}
          >
            {stats.topTags.map(([tag, count]) => {
              const config = getTagConfig(tag);
              return (
                <Chip
                  key={tag}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {config.emoji && <span>{config.emoji}</span>}
                      <span>{tag} ({count})</span>
                    </Box>
                  }
                  sx={{
                    backgroundColor: `${config.color}15`,
                    borderColor: config.color,
                    color: config.color,
                    '&:hover': {
                      backgroundColor: `${config.color}25`,
                    }
                  }}
                />
              );
            })}
          </Box>
        </Paper>
      )}
    </Box>
  );
} 