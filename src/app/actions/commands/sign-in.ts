'use server';

import { redirect } from 'next/navigation';

import { signIn } from '@/core';
import { setSessionToken } from '@/lib/session-cookie';

export default async function signInAction (state: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const { token } = await signIn({ email, password });

        await setSessionToken(token);
    } catch (error) {
        console.error('An error occurred during sign-in:', error);

        return {
            errors: {
                message: 'Invalid email or password',
            },
        };
    }

    redirect('/dashboard');
}