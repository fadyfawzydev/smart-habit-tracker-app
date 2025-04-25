import { GET, POST, PUT, DELETE } from '../route';
import { getUser } from '@/lib/auth0';
import { getUserData, updateUserData, addHabit, updateHabit, deleteHabit } from '@/lib/data-store';
import { NextResponse } from 'next/server';

jest.mock('@/lib/auth0');
jest.mock('@/lib/data-store');

describe('Habits API', () => {
  const mockUser = {
    sub: 'auth0|123',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockHabit = {
    id: 'habit1',
    title: 'Exercise',
    description: 'Daily workout',
    frequency: {
      type: 'daily',
    },
    createdAt: '2024-03-20',
    completions: {},
    tags: ['health'],
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (getUser as jest.Mock).mockResolvedValue(mockUser);
  });

  describe('GET /api/habits', () => {
    it('should return habits for authenticated user', async () => {
      const mockUserData = {
        name: mockUser.name,
        email: mockUser.email,
        habits: [mockHabit],
      };

      (getUserData as jest.Mock).mockResolvedValue(mockUserData);

      const response = await GET();
      expect(response).toBeInstanceOf(NextResponse);
      
      const data = await response.json();
      expect(data).toEqual([mockHabit]);
      expect(getUser).toHaveBeenCalled();
      expect(getUserData).toHaveBeenCalledWith(mockUser.sub);
    });

    it('should return empty array if user has no habits', async () => {
      (getUserData as jest.Mock).mockResolvedValue(null);

      const response = await GET();
      expect(response).toBeInstanceOf(NextResponse);
      
      const data = await response.json();
      expect(data).toEqual([]);
    });

    it('should return 401 if user is not authenticated', async () => {
      (getUser as jest.Mock).mockResolvedValue(null);

      const response = await GET();
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('POST /api/habits', () => {
    it('should create a new habit for authenticated user', async () => {
      (getUserData as jest.Mock).mockResolvedValue({
        name: mockUser.name,
        email: mockUser.email,
        habits: [],
      });

      const request = new Request('http://localhost/api/habits', {
        method: 'POST',
        body: JSON.stringify(mockHabit),
      });

      const response = await POST(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual({ success: true });
      expect(addHabit).toHaveBeenCalledWith(mockUser.sub, mockHabit);
    });

    it('should create user data if it does not exist', async () => {
      (getUserData as jest.Mock).mockResolvedValue(null);

      const request = new Request('http://localhost/api/habits', {
        method: 'POST',
        body: JSON.stringify(mockHabit),
      });

      const response = await POST(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual({ success: true });
      expect(updateUserData).toHaveBeenCalledWith(mockUser.sub, {
        name: mockUser.name,
        email: mockUser.email,
        habits: [],
      });
      expect(addHabit).toHaveBeenCalledWith(mockUser.sub, mockHabit);
    });

    it('should return 401 if user is not authenticated', async () => {
      (getUser as jest.Mock).mockResolvedValue(null);

      const request = new Request('http://localhost/api/habits', {
        method: 'POST',
        body: JSON.stringify(mockHabit),
      });

      const response = await POST(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('PUT /api/habits', () => {
    it('should update an existing habit', async () => {
      const updatedHabit = {
        ...mockHabit,
        title: 'Updated Exercise',
      };

      const request = new Request('http://localhost/api/habits', {
        method: 'PUT',
        body: JSON.stringify(updatedHabit),
      });

      const response = await PUT(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual({ success: true });
      expect(updateHabit).toHaveBeenCalledWith(
        mockUser.sub,
        updatedHabit.id,
        expect.objectContaining({ title: 'Updated Exercise' })
      );
    });

    it('should return 401 if user is not authenticated', async () => {
      (getUser as jest.Mock).mockResolvedValue(null);

      const request = new Request('http://localhost/api/habits', {
        method: 'PUT',
        body: JSON.stringify(mockHabit),
      });

      const response = await PUT(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('DELETE /api/habits', () => {
    it('should delete an existing habit', async () => {
      const request = new Request('http://localhost/api/habits', {
        method: 'DELETE',
        body: JSON.stringify({ id: mockHabit.id }),
      });

      const response = await DELETE(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual({ success: true });
      expect(deleteHabit).toHaveBeenCalledWith(mockUser.sub, mockHabit.id);
    });

    it('should return 401 if user is not authenticated', async () => {
      (getUser as jest.Mock).mockResolvedValue(null);

      const request = new Request('http://localhost/api/habits', {
        method: 'DELETE',
        body: JSON.stringify({ id: mockHabit.id }),
      });

      const response = await DELETE(request);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data).toEqual({ error: 'Unauthorized' });
    });
  });
}); 