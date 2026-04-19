'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { signOut } from '@/core';

export default async function signOutAction () {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (token) {
        await signOut({ token });

        cookieStore.delete('session_token');
    }

    redirect('/sign-in');
}
