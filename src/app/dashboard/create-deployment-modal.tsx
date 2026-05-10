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
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';

import createDeploymentAction from '@/actions/commands/create-deployment';

export default function CreateDeploymentModal ({ organizations }: { organizations: { id: string; name: string }[] }) {
    const [state, action, pending] = useActionState<any, FormData>(createDeploymentAction, {});

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>
                Create deployment
            </SheetTrigger>

            <SheetContent showCloseButton={false}>
                <SheetHeader>
                    <SheetTitle>Create Deployment</SheetTitle>
                    <SheetDescription>
                        Select an organization and upload a Salesforce deploy result JSON file.
                    </SheetDescription>
                </SheetHeader>

                <form className="flex flex-col gap-4 p-4" action={action}>
                    {state?.errors?.message && (
                        <p className="text-sm text-red-500">{state.errors.message}</p>
                    )}

                    <Field>
                        <FieldLabel htmlFor="organizationId">Organization</FieldLabel>
                        <select
                            id="organizationId"
                            name="organizationId"
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select an organization</option>
                            {organizations.map((org) => (
                                <option key={org.id} value={org.id}>{org.name}</option>
                            ))}
                        </select>
                    </Field>

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
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Creating...' : 'Create'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
