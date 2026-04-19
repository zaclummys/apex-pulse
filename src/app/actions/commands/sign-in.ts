'use server';

import { redirect } from 'next/navigation';

import { signIn } from '@/core';
import { setSessionToken } from '@/lib/session-cookie';

export default async function signInAction (state: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const {
            error,
            success,
        } = await signIn({ email, password });

        if (error) {
            return {
                fields: { email },
                errors: {
                    message: error.message,
                }
            };
        }

        await setSessionToken({
            token: success.sessionToken,
            maxAgeInSeconds: success.sessionDurationInMilliseconds / 1000,
        });
    } catch (error) {
        console.error('An error occurred during sign-in:', error);

        return {
            fields: { email },
            errors: {
                message: 'An unexpected error occurred. Please try again later.',
            },
        };
    }

    redirect('/dashboard');
}