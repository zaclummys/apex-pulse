'use client';

import Link from 'next/link';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import {
    DashboardIcon,
    SignOutIcon,
    AppIcon,
} from '@/components/icons';

export default function Layout ({ children }: { children: React.ReactNode }) {
    const items = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: <DashboardIcon />,
        }
    ];

    return (
        <>
            <SidebarProvider>
                <Sidebar variant="inset">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <AppIcon />

                                    <span className="text-base font-semibold">
                                        Apex Pulse
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton render={props => (
                                            <Link href={item.url} {...props}>
                                                {item.icon}

                                                <span>{item.title}</span>
                                            </Link>
                                        )}>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton render={props => (
                                    <Link href="/sign-out" {...props}>
                                        <SignOutIcon />

                                        <span>Sign Out</span>
                                    </Link>
                                )}>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset>
                    <div className="p-4">
                        <SidebarTrigger />
                        
                        <div>
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}