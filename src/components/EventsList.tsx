import { eventList } from '@/utils'
import React from 'react'

function EventsList() {
    return (
        <div className='w-[30%] h-[500px] scroll-m-2 overflow-y-auto'>
            {eventList.map((item, index) => (
                <div key={index} className='box-border rounded-3xl break-words p-[2px]  m-[3px] bg-gradient-to-b from-zinc-50'> 
                   {/* bg-gradient-to-b from-zinc-50 */}
                    <p>Marker: {index + 1}</p>
                    <p>{item.lat}</p>
                    <p>{item.lng}</p>
                </div>
            ))}
        </div>
    )
}

export default EventsList