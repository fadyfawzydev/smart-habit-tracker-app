export const getUser = jest.fn();
export const auth0 = {
  handleAuth: jest.fn(),
  handleLogin: jest.fn(),
  handleCallback: jest.fn(),
  handleLogout: jest.fn(),
  withApiAuthRequired: jest.fn((handler) => handler),
  withPageAuthRequired: jest.fn((handler) => handler),
  getSession: jest.fn(),
}; 