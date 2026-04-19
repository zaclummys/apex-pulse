'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/app/header';
import signUpAction from '@/app/actions/commands/sign-up';

export default function SignUp() {
    const [state, action, pending] = useActionState<any, FormData>(signUpAction, {});

    return (
        <>
            <Header />

            <div className="absolute inset-0 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardAction>
                            <Link href="/sign-in">
                                Already have an account?
                            </Link>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <form id="form" className="flex flex-col gap-6" action={action}>
                            {state?.errors?.message && (
                                <p className="text-sm text-red-500">{state.errors.message}</p>
                            )}

                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </Field>

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
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}