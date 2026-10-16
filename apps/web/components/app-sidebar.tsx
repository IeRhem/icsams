"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  IconAdjustments,
  IconAlertTriangle,
  IconBolt,
  IconChartBar,
  IconDeviceCctv,
  IconFileAlert,
  IconHelp,
  IconLayoutDashboard,
  IconPlayerPlay,
  IconReport,
  IconSettings,
} from "@tabler/icons-react"

const navigationData = {
  user: {
    name: "Admin Operator",
    email: "operator@icsams.internal",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: <IconLayoutDashboard className="size-6" />,
    },
    {
      title: "Live Cameras",
      url: "/camaras",
      icon: <IconDeviceCctv className="size-6" />,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: <IconAlertTriangle className="size-6" />,
      badge: "3",
    },
    {
      title: "Events",
      url: "/events",
      icon: <IconBolt className="size-6" />,
    },
    {
      title: "Footage Playback",
      url: "/footage",
      icon: <IconPlayerPlay className="size-6" />,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <IconChartBar className="size-6" />,
    },
    {
      title: "Anomaly Reports",
      url: "/anomaly-report",
      icon: <IconFileAlert className="size-6" />,
    },
    {
      title: "Thresholds",
      url: "/thresholds",
      icon: <IconAdjustments className="size-6" />,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: <IconReport className="size-6" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: <IconSettings className="size-6" />,
    },
    {
      title: "Help & Docs",
      url: "#",
      icon: <IconHelp className="size-6" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">
                <IconDeviceCctv className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-wide">ICSAMS</span>
                <span className="truncate text-[11px] text-muted-foreground">
                  Surveillance & AI Monitoring
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} label="Control Center" />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
