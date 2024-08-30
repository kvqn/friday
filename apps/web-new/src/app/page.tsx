import type { Metadata } from "next"
import { FiltersDrawer } from "./_components/filters-drawer"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Filters } from "./_components/filters"
import { Logs } from "./_components/logs"
import { LogsPagination } from "./_components/pagination"

export const metadata: Metadata = {
  title: "Friday Logs",
}

export default async function Page() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <div className="h-screen">
          <Filters />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex flex-grow flex-col items-center p-4">
          <LogsPagination />
          <Logs />
          <FiltersDrawer />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
