'use server';

import { redirect } from 'next/navigation';

import { signOut } from '@/core';
import { getSessionToken, deleteSessionToken } from '@/lib/session-cookie';

export default async function signOutAction () {
    const token = await getSessionToken();

    if (token) {
        await signOut({ token });

        await deleteSessionToken();
    }

    redirect('/sign-in');
}
