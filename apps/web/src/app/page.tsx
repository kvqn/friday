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
  const options = <Filters />
  const page = (
    <div className="flex flex-grow flex-col items-center gap-4">
      <LogsPagination />
      <Logs />
    </div>
  )

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden p-4 lg:hidden">
        {page}
        <div className="flex w-full items-center justify-center gap-4 bg-background pt-4">
          <FiltersDrawer />
        </div>
      </div>

      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <div className="block h-screen">{options}</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>{page}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
