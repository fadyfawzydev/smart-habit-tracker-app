'use client';

import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { getTagConfig } from '@/lib/tagConfig';
import { useHabits } from '@/lib/habitContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function HabitCharts() {
  const { habits, loading } = useHabits();
  const [tabValue, setTabValue] = useState(0);

  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    return days.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      const dateString = date.toISOString().split('T')[0];

      const completions = habits.reduce((count, habit) => {
        return count + (habit.completions[dateString] ? 1 : 0);
      }, 0);

      return {
        name: day,
        completions,
        percentage: habits.length > 0 ? (completions / habits.length) * 100 : 0,
      };
    });
  };

  const getMonthlyData = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(monthStart);
      date.setDate(i + 1);
      const dateString = date.toISOString().split('T')[0];

      const completions = habits.reduce((count, habit) => {
        return count + (habit.completions[dateString] ? 1 : 0);
      }, 0);

      return {
        name: `${i + 1}`,
        completions,
        percentage: habits.length > 0 ? (completions / habits.length) * 100 : 0,
      };
    });
  };

  const getTagDistribution = () => {
    const tagCounts = habits.reduce((acc, habit) => {
      habit.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts).map(([name, value]) => ({
      name,
      value,
      color: getTagConfig(name).color,
    }));
  };

  if (loading) {
    return <Typography>Loading charts...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Habit Analytics
      </Typography>
      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
        <Tab label="Weekly Progress" />
        <Tab label="Monthly Progress" />
        <Tab label="Tag Distribution" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getWeeklyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Completion Rate']}
              />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getMonthlyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Completion Rate']}
              />
              <Bar dataKey="percentage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getTagDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getTagDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>
    </Box>
  );
} 