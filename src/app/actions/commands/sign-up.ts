'use server';

import { redirect } from 'next/navigation';

import { signUp } from '@/core';

export default async function signUpAction (state: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signUp({
            name,
            email,
            password,
        });
    } catch {
        console.error('An error occurred during sign-up');

        return {
            errors: {
                message: 'Email already in use',
            },
        };
    }

    redirect('/sign-in');
}