import { eventList } from '@/utils'
import React from 'react'

function EventsList() {
    return (
        <div className='w-[30%] h-[500px] scroll-m-2 overflow-y-auto'>
            {eventList.map((item, index) => (
                <div key={index} className='box-border border break-words border-gray-700 p-[2px] my-[2px]'>
                    <p>Marker: {index + 1}</p>
                    <p>{item.lat}</p>
                    <p>{item.lng}</p>
                </div>
            ))}
        </div>
    )
}

export default EventsList