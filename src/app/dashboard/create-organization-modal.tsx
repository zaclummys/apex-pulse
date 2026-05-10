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

import createOrganizationAction from '@/actions/commands/create-organization';

const initialState: Parameters<typeof createOrganizationAction>[0] = {
    fields: { organizationName: '' },
};

export default function CreateOrganizationModal () {
    const [state, action, pending] = useActionState(createOrganizationAction, initialState);

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>
                Create organization
            </SheetTrigger>

            <SheetContent showCloseButton={false}>
                <SheetHeader>
                    <SheetTitle>Create Organization</SheetTitle>
                    <SheetDescription>
                        Give your organization a name to get started.
                    </SheetDescription>
                </SheetHeader>

                <form className="flex flex-col gap-4 p-4" action={action}>
                    {state?.errors?.message && (
                        <span className="text-sm text-red-500">{state.errors.message}</span>
                    )}

                    <Field>
                        <FieldLabel htmlFor="organizationName">Name</FieldLabel>
                        <Input
                            id="organizationName"
                            name="organizationName"
                            placeholder="My Organization"
                            defaultValue={state.fields.organizationName}
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
