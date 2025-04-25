import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth0';
import { addHabit, deleteHabit, getUserData, updateHabit, updateUserData } from '@/lib/data-store';
import { Habit, UserData } from '@/lib/types';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await getUserData(user.sub);
    return NextResponse.json(userData?.habits || []);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user || !user.sub || !user.name || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user exists, if not create a new user entry
    let userData = await getUserData(user.sub);
    if (!userData) {
      const newUserData: UserData = {
        name: user.name,
        email: user.email,
        habits: []
      };
      await updateUserData(user.sub, newUserData);
      userData = newUserData;
    }

    const habit: Habit = await request.json();
    await addHabit(user.sub, habit);
    return NextResponse.json({ success: true });
  } catch {
    console.error('Error in POST /api/habits');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...updatedHabit } = await request.json();
    await updateHabit(user.sub, id, updatedHabit);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    await deleteHabit(user.sub, id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 