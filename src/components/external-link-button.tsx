'use client';

import { ExternalLinkIcon, ChevronRightIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function ExternalLinkButton({ href }: { href: string }) {
    return (
        <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={(props) => (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
            )}
        >
            <ExternalLinkIcon className="size-3.5 shrink-0" />
            <span className="truncate max-w-xs">{href}</span>
            <ChevronRightIcon className="size-3 shrink-0 opacity-50" />
        </Button>
    );
}
