import React, { ReactNode } from 'react'
import {cn} from "@/lib/utils";

const Layout = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <main className={cn('bg-gray-950 text-white min-h-dvh', className)}>
      {children}
    </main>
  )
}

export default Layout
