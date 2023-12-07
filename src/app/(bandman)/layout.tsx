import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import React from 'react'

function BandmapLayout({ children }:
    {
        children: React.ReactNode
    }) {
    return (
        <div className='bg-zinc-100 flex'>
            <SideNav />
            <div className='flex-1 flex-col ml-[315px] min-h-screen'>
                <Header />
                <div className='bg-white flex flex-grow min-h-[500px] rounded-tl-[50px] pt-[27px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BandmapLayout