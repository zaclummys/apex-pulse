import { redirect } from 'next/navigation';

export default function signUpAction (formState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Email:', email);
    console.log('Password:', password);

    redirect('/sign-in');
}