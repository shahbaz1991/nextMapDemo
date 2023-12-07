import Link from 'next/link'
import React from 'react'
import HouseSimpleSVG from '../../public/HouseSimpleSVG'
import HouseSimple2SVG from '../../public/HouseSimple2SVG'
import BookOpenSVG from '../../public/BookOpenSVG'
import SideMenuItem from './SideNavItem'

function SideNav() {
    return (
        <ul className='flex w-[315px] pt-[84px] gap-1 h-screen fixed flex-col pl-[39px] bg-gradient-to-r from-[rgba(245,245,245,1)] to-[rgba(245,245,245,0)]'>
            <SideMenuItem name={'Home'} svg={<HouseSimple2SVG />} />
            <SideMenuItem name={'Reading List'} svg={<BookOpenSVG />} />
            <SideMenuItem name={'Bandmap'} svg={<HouseSimpleSVG/>} />
        </ul>
    )
}

export default SideNav