'use server';

import { redirect } from 'next/navigation';

export default async function signInAction (state: any, formData: FormData) {
    console.log('State:', state);
    console.log('FormData:', formData);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Email:', email);
    console.log('Password:', password);

    redirect('/dashboard');
}