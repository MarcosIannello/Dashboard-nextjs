'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export interface SideBarItemprops {
    icon: React.ReactNode,
    title: string,
    link: string 
}

export const SideBarItem = ({icon, title, link}: SideBarItemprops) => {

  const pathName = usePathname()

  return (
        <li>
            <Link 
              href={link} className={
              `relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r hover:bg-sky-600
               ${link === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400':''}`
            }>
              {icon}
              <span className=" group-hover:text-white">{title}</span>
            </Link>
        </li>
  )
}

export default SideBarItem
