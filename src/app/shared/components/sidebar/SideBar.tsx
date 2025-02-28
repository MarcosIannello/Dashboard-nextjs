
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BiBasket } from "react-icons/bi"
import { BsCookie } from "react-icons/bs"
import { CiLogout } from "react-icons/ci"
import { ImProfile } from "react-icons/im"
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline } from "react-icons/io5"
import { RiNextjsFill } from "react-icons/ri"
import { SessionButton } from "./SessionButton"
import SideBarItem, { SideBarItemprops } from "./SideBarItem"

export const sideBarItems: SideBarItemprops[] = [
  {
    title: 'Dashboard',
    icon: <IoCalendarOutline />,
    link: '/modules/dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest Todos',
    link: '/modules/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    link: '/modules/dashboard/server-todos'
  },
  {
    icon: <BsCookie />,
    title: 'Cookies',
    link: '/modules/dashboard/cookies'
  },
  {
    icon: <BiBasket />,
    title: 'Products',
    link: '/modules/dashboard/products'
  },
  {
    icon: < ImProfile />,
    title: 'Profile',
    link: '/modules/dashboard/profile'
  }
]

export const SideBar = async () => {

  const session = await getServerSession(authOptions);
  const userRol = session?.user?.roles ?? ['client']

  if (!session) {
    redirect("/api/auth/signin");
  }


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gray-800 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">

          <Link href="/dashboard" title="home" className="">
            <RiNextjsFill size={50} className="rounded-full p-1 bg-white" />
          </Link>
        </div>

        <div className="mt-8 text-center flex flex-col justify-center items-center">
          <Image src={session.user?.image ?? ''} alt="" width={80} height={80} className="rounded-full justify-center" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session.user?.name}</h5>
          <span className="hidden text-gray-400 lg:block">{userRol.join(',')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            sideBarItems.map((item, index) => {
              return (
                <SideBarItem icon={item.icon} title={item.title} link={item.link} key={index} />
              )
            })
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <SessionButton title="logOut" icon={<CiLogout />} />
      </div>
    </aside>
  )
}

export default SideBar
