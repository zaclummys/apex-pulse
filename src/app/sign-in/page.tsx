'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppIcon } from '@/components/icons';
import signInAction from '@/actions/commands/sign-in';

export default function SignIn() {
    const [state, action, pending] = useActionState<any, FormData>(signInAction, {});

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left branding panel */}
            <div className="hidden lg:flex flex-col justify-between bg-muted p-12">
                <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
                    <AppIcon className="w-5 h-5" />
                    Apex Pulse
                </Link>

                <blockquote className="flex flex-col gap-3">
                    <p className="text-lg text-foreground">
                        &ldquo;Apex Pulse cut our time spent digging through deployment logs in half.
                        Every result is right there, organized and searchable.&rdquo;
                    </p>
                    <footer className="text-sm text-muted-foreground">— Salesforce Developer</footer>
                </blockquote>
            </div>

            {/* Right form panel */}
            <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="text-foreground underline underline-offset-4 hover:opacity-80">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <form id="form" className="flex flex-col gap-5" action={action}>
                        {state?.errors?.message && (
                            <p className="text-sm text-destructive">{state.errors.message}</p>
                        )}

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                defaultValue={state?.fields?.email}
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </Field>

                        <Button type="submit" className="w-full" disabled={pending}>
                            {pending ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}