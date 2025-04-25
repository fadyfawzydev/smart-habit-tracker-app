import { DataStore, Habit, UserData } from './types';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure the data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    await fs.promises.mkdir(dataDir, { recursive: true });
  }
};

// Initialize the data store if it doesn't exist
const initializeDataStore = async () => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    await fs.promises.writeFile(
      DATA_FILE_PATH,
      JSON.stringify({ users: {} }, null, 2)
    );
  }
};

export async function readDataStore(): Promise<DataStore> {
  try {
    await ensureDataDirectory();
    await initializeDataStore();
    
    const data = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data store:', error);
    return { users: {} };
  }
}

export async function writeDataStore(data: DataStore): Promise<void> {
  try {
    await ensureDataDirectory();
    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to data store:', error);
    throw error;
  }
}

export async function getUserData(userId: string): Promise<UserData | null> {
  try {
    const data = await readDataStore();
    return data.users[userId] || null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

export async function updateUserData(userId: string, userData: UserData): Promise<void> {
  try {
    const data = await readDataStore();
    data.users[userId] = userData;
    await writeDataStore(data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

export async function addHabit(userId: string, habit: Habit): Promise<void> {
  try {
    const userData = await getUserData(userId);
    if (!userData) {
      throw new Error('User not found');
    }
    
    userData.habits.push(habit);
    await updateUserData(userId, userData);
  } catch (error) {
    console.error('Error adding habit:', error);
    throw error;
  }
}

export async function updateHabit(userId: string, habitId: string, updatedHabit: Partial<Habit>): Promise<void> {
  try {
    const userData = await getUserData(userId);
    if (!userData) {
      throw new Error('User not found');
    }
    
    const habitIndex = userData.habits.findIndex(h => h.id === habitId);
    if (habitIndex === -1) {
      throw new Error('Habit not found');
    }
    
    userData.habits[habitIndex] = { ...userData.habits[habitIndex], ...updatedHabit };
    await updateUserData(userId, userData);
  } catch (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
}

export async function deleteHabit(userId: string, habitId: string): Promise<void> {
  try {
    const userData = await getUserData(userId);
    if (!userData) {
      throw new Error('User not found');
    }
    
    userData.habits = userData.habits.filter(h => h.id !== habitId);
    await updateUserData(userId, userData);
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
} 