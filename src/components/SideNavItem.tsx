import Link from 'next/link'
import React from 'react'

function SideMenuItem({ name, svg }: {
    name: string,
    svg: React.ReactNode ////background: #8A8797  25C030;
}) {
    return (
        <Link href={'/maps'} className='group h-[48px] w-[236px] flex items-center rounded-lg pl-[16px] active:bg-gradient-to-r hover:bg-gradient-to-r to-[rgba(235,235,235,1)] from-[rgba(235,235,235,0)]'>
            <div className='w-[27px] h-[27px] text-[#8A8797] group-active:text-[#25C030] group-hover:text-[#25C030]'>{svg}</div>
            <p className='text-[15px] ml-[5px]'>
                {name}
            </p>
        </Link>
    )
}

export default SideMenuItem