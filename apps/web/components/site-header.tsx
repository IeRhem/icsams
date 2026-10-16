import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconBell } from "@tabler/icons-react"
import { buttonVariants } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-1 h-4 data-vertical:self-auto"
          />
          <div className="text-xs text-muted-foreground hidden sm:block">
            System Status: <span className="text-emerald-500 font-medium">Operational</span> (12 Streams Active)
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/alerts"
            className={buttonVariants({ variant: "secondary", size: "icon-lg" })}
            title="Active Alerts"
          >
            <IconBell className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}

