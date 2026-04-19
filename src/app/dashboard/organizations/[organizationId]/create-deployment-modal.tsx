'use client';

import { useActionState } from 'react';

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';

import createDeploymentAction from '@/app/actions/commands/create-deployment';

export default function CreateDeploymentModal ({ organizationId }: { organizationId: string }) {
    const [state, action, pending] = useActionState<any, FormData>(createDeploymentAction, {});

    return (
        <Sheet>
            <SheetTrigger render={<Button />}>
                Create Deployment
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Deployment</SheetTitle>
                    <SheetDescription>
                        Upload a Salesforce deploy result JSON file.
                    </SheetDescription>
                </SheetHeader>

                <form id="create-deployment-form" className="flex flex-col gap-4 p-4" action={action}>
                    <input type="hidden" name="organizationId" value={organizationId} />

                    {state?.errors?.message && (
                        <p className="text-sm text-red-500">{state.errors.message}</p>
                    )}

                    <Field>
                        <FieldLabel htmlFor="deployResponse">Deploy Result JSON</FieldLabel>
                        <Input
                            id="deployResponse"
                            name="deployResponse"
                            type="file"
                            accept=".json"
                            required
                        />
                    </Field>

                    <SheetFooter>
                        <SheetClose render={<Button variant="outline" />}>
                            Cancel
                        </SheetClose>

                        <Button type="submit" disabled={pending}>
                            {pending ? 'Creating...' : 'Create'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
