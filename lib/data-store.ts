import { DataStore, Habit, UserData } from './types';

const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

if (!BIN_ID || !API_KEY) {
  console.error('Missing environment variables:');
  console.error('NEXT_PUBLIC_JSONBIN_BIN_ID:', BIN_ID);
  console.error('JSONBIN_API_KEY:', API_KEY ? 'Set' : 'Not Set');
  throw new Error('JSONBin.io credentials are not configured');
}

export async function readDataStore(): Promise<DataStore> {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        'X-Master-Key': API_KEY as string,
      } as HeadersInit,
    });

    if (!response.ok) {
      console.error('JSONBin.io read error:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.record || { users: {} };
  } catch (error) {
    console.error('Error reading data store:', error);
    return { users: {} };
  }
}

export async function writeDataStore(data: DataStore): Promise<void> {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY as string,
      } as HeadersInit,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('JSONBin.io write error:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to update data: ${response.status} ${response.statusText}`);
    }
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