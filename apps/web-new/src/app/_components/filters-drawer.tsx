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
        <Button className="block lg:hidden">Filters</Button>
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
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
