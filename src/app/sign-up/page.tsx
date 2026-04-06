import Link from 'next/link';

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center">
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
                    <form className="flex flex-col gap-6">
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" placeholder="Enter your password" />
                        </Field>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}