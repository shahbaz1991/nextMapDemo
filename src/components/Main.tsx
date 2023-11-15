'use client'
import React, { useEffect, useState } from 'react'
import Map from './Map'
import EventsList from './EventsList'
import CenterLoc from './CenterLoc'

type LocationType = {
    lat: number;
    lng: number
}

const defaultLoc = {
    lat: 27.672932021393862, lng: 85.31184012689732
}

function Main() {
    const [currentLoc, setCurrentLoc] = useState<LocationType | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                setCurrentLoc({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                })

            });
        }
    }, [])

    return (
        <div className='mx-[5%]'>
            <div className='bg-blue-400 h-[50px] w-[100%]'>
                <CenterLoc />
            </div>
            <div className='flex flex-row grow gap-x-2 box-border'>
                <Map currentLoc={currentLoc || defaultLoc} />
                <EventsList />
            </div>
        </div>
    )
}

export default Main