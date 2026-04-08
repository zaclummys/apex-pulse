'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Header from '@/app/header';
import signInAction from '@/app/actions/sign-in';

export default function SignIn() {
    const [state, action, pending] = useActionState<any, FormData>(signInAction, {});
    const router = useRouter();

    console.log('State:', state);
    console.log('Action:', action);
    console.log('Pending:', pending);

    return (
        <>
            <Header />
            
            <div className="absolute inset-0 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardAction>
                            <Link href="/sign-up">
                                Don't have an account?
                            </Link>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <form id="form" className="flex flex-col gap-6" action={action}>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full" form="form">
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}