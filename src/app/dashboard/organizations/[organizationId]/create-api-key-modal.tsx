'use client';

import { useActionState, useState } from 'react';
import { CopiedIcon, CopyIcon } from '@/components/icons';

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

import createApiKeyAction from '@/actions/commands/create-api-key';

const initialState: Parameters<typeof createApiKeyAction>[0] = {
    fields: { name: '' },
};

export default function CreateApiKeyModal ({ organizationId }: { organizationId: string }) {
    const [state, action, pending] = useActionState(createApiKeyAction, initialState);
    const [copied, setCopied] = useState(false);

    function handleCopy () {
        if (!state.createdKey) return;
        navigator.clipboard.writeText(state.createdKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>
                Create API Key
            </SheetTrigger>

            <SheetContent showCloseButton={false}>
                <SheetHeader>
                    <SheetTitle>Create API Key</SheetTitle>
                    <SheetDescription>
                        Give your API key a name to identify it.
                    </SheetDescription>
                </SheetHeader>

                <form className="flex flex-col gap-4 p-4" action={action}>
                    <input type="hidden" name="organizationId" value={organizationId} />

                    {state?.errors?.message && (
                        <span className="text-sm text-red-500">{state.errors.message}</span>
                    )}

                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            placeholder="My API Key"
                            required
                        />
                    </Field>

                    <SheetFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Creating...' : 'Create'}
                        </Button>
                    </SheetFooter>

                    {state?.createdKey && (
                        <div className="flex flex-col gap-2 rounded-lg border border-dashed p-3">
                            <span className="text-xs text-muted-foreground">
                                Copy your API key now — it won't be shown again.
                            </span>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="group flex items-center justify-between gap-3 rounded-md bg-muted px-3 py-2 transition-colors hover:bg-muted/70"
                            >
                                <code className="flex-1 truncate text-left text-sm">{state.createdKey}</code>
                                <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
                                    {copied ? <CopiedIcon className="size-4 text-green-500" /> : <CopyIcon className="size-4" />}
                                </span>
                            </button>
                        </div>
                    )}
                </form>
            </SheetContent>
        </Sheet>
    );
}
