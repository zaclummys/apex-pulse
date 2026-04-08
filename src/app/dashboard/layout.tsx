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
    Building,
    LayoutDashboard,
    Rocket,
    Settings,
    Zap,
} from 'lucide-react';

export default function Layout ({ children }: { children: React.ReactNode }) {
    const items = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: <LayoutDashboard />,
        },
        {
            title: 'Deployments',
            url: '/dashboard/deployments',
            icon: <Rocket />,
        },
        {
            title: 'Organizations',
            url: '/dashboard/organizations',
            icon: <Building />,
        },
        {
            title: 'Settings',
            url: '/dashboard/settings',
            icon: <Settings />,
        },
    ];

    return (
        <>
            <SidebarProvider>
                <Sidebar variant="inset">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Zap />

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
                </Sidebar>

                <SidebarInset>
                    <div className="p-2">
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