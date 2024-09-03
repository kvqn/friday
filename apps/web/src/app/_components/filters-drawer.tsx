"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Filters } from "./filters"

export function FiltersDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="block w-1/2 lg:hidden">Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters & Settings</DrawerTitle>
          <DrawerDescription>
            Filter the logs or change how they look
          </DrawerDescription>
        </DrawerHeader>
        <Filters />
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
