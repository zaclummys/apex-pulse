import Link from 'next/link';

import { Zap } from 'lucide-react';
import ButtonLink from '@/components/button-link';

export default function Header () {
    return (
        <header className="container mx-auto flex flex-row justify-between p-4 z-1">
            <Link href="/" className="flex flex-row items-center gap-2">
                <Zap className='inline-block mr-2' />

                <span>Apex Pulse</span>
            </Link>

            <div className="self-end flex flex-row gap-4">
                <ButtonLink href="/sign-in" variant="outline" size="sm">
                    Sign In
                </ButtonLink>

                <ButtonLink href="/sign-up" size="sm">
                    Sign Up
                </ButtonLink>
            </div>
        </header>
    );
}

