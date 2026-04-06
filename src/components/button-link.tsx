'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ButtonLink({ href, children, ...props }: { href: string, children: React.ReactNode } & React.ComponentProps<typeof Button>) {
    return (
        <Button
            {...props}
            nativeButton={false}
            render={buttonProps => (
                <Link href={href} {...buttonProps}>
                    {children}
                </Link>
            )}
        />
    );
}