'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { signIn } from '@/core';

export default async function signInAction (state: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const { token } = await signIn({ email, password });

        const cookieStore = await cookies();

        cookieStore.set('session_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
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