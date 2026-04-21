'use server';

import { redirect } from 'next/navigation';

import { getUserIdByToken } from '@/core';
import { getSessionToken } from '@/lib/session-cookie';

export default async function getCurrentUserIdAction () {
    const token = await getSessionToken();

    if (!token) {
        redirect('/sign-in');
    }

    try {
        return await getUserIdByToken(token);
    } catch {
        redirect('/sign-in');
    }
}