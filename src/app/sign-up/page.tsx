'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppIcon } from '@/components/icons';
import signUpAction from '@/actions/commands/sign-up';

export default function SignUp() {
    const [state, action, pending] = useActionState<any, FormData>(signUpAction, {});

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
                        &ldquo;Finally, a tool that makes Salesforce deployments visible.
                        We caught a test regression the same day it was introduced.&rdquo;
                    </p>
                    <footer className="text-sm text-muted-foreground">&mdash; Salesforce Developer</footer>
                </blockquote>
            </div>

            {/* Right form panel */}
            <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/sign-in" className="text-foreground underline underline-offset-4 hover:opacity-80">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form id="form" className="flex flex-col gap-5" action={action}>
                        {state?.errors?.message && (
                            <p className="text-sm text-destructive">{state.errors.message}</p>
                        )}

                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                                defaultValue={state?.fields?.name}
                                required
                            />
                        </Field>

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
                            {pending ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}