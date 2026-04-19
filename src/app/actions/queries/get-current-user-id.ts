'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserIdByToken } from '@/core';

export default async function getCurrentUserIdAction () {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
        redirect('/sign-in');
    }

    try {
        return await getUserIdByToken(token);
    } catch {
        redirect('/sign-in');
    }
}