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
import { title } from 'process';

export default function Dashboard() {
    const items = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: <LayoutDashboard />,
        },
        {
            title: 'Deployments',
            url: '/deployments',
            icon: <Rocket />,
        },
        {
            title: 'Organizations',
            url: '/organizations',
            icon: <Building />,
        },
        {
            title: 'Settings',
            url: '/settings',
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
                                        <SidebarMenuButton>
                                            {item.icon}

                                            <span>
                                                {item.title}
                                            </span>
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

                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}