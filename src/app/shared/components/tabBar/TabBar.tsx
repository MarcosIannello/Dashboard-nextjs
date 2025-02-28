'use client';

import { setCookie } from "cookies-next";
import { useState } from "react";

interface props {
    currentTab?: number,
    tabOptions?: number[]
}

export const TabBar = ({currentTab = 1, tabOptions = [1,2,3,4,5]}:props) => {

    const [selected, setSelected] = useState(currentTab)



    const onTabSelected = (tab: number) => {
        setSelected(tab);
        setCookie('currentTab', tab.toString());
    }

    return (
        <div className={`grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2`}>
            {
                tabOptions.map((tabOption) => (
                    <div key={tabOption}>
                        <input checked = {selected === tabOption} onChange={() => {}} type="radio" id={tabOption.toString()} className="peer hidden" />
                        <label onClick={() => onTabSelected(tabOption)} className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            {tabOption}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}