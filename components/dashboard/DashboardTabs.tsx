"use client";

import { useState } from "react";
import { Paper, Box, Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import HabitCards from "@/components/dashboard/HabitList";
import HabitCalendar from "@/components/dashboard/HabitCalendar";
import HabitCharts from "@/components/dashboard/HabitCharts";

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2 } }}>{children}</Box>}
    </div>
  );
}

export default function DashboardTabs() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="dashboard tabs"
        variant={isMobile ? "fullWidth" : "standard"}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            minHeight: { xs: 48, sm: 64 },
            padding: { xs: "6px 12px", sm: "12px 24px" },
          },
        }}
      >
        <Tab label="Habits" />
        <Tab label="Analytics" />
        <Tab label="Calendar" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <HabitCards />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <HabitCharts />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <HabitCalendar />
      </TabPanel>
    </Paper>
  );
}
