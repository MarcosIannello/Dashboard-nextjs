
import { cookies } from "next/headers";
import Link from "next/link";

import { CiChat1, CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

export const TopMenu = async () => {

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get('cart');
    const cart = cartCookie ? JSON.parse(cartCookie.value ?? '{}') : {};


    const getTotalCount = (): number => {
        let items = 0;

        Object.values(cart).forEach((element) => {
            items += element as number;
        });

        return items;
    }

    return (

        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5 shadow-xl">

            <div className="px-6 flex items-center justify-between space-x-4">
                <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
                <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                    <CiMenuBurger size={30} />
                </button>
                <div className="flex space-x-2 items-center">

                    <div hidden className="md:block">
                        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                <CiSearch size={25} />
                            </span>
                            <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                        </div>
                    </div>

                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                        <CiSearch size={25} />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                        <CiChat1 size={25} />
                    </button>

                    <div className="flex items-center justify-center">
                        <Link href='/modules/dashboard/cart' className="p-2 flex items-center justify-center w-12 h-12 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                            <span className="text-sm  text-blue-800">{getTotalCount()}</span>
                            <IoCartOutline size={25} />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopMenu
