export const getUserData = jest.fn();
export const updateUserData = jest.fn().mockResolvedValue(undefined);
export const addHabit = jest.fn().mockResolvedValue(undefined);
export const updateHabit = jest.fn().mockResolvedValue(undefined);
export const deleteHabit = jest.fn().mockResolvedValue(undefined);

export const dataStore = {
  users: {},
}; 