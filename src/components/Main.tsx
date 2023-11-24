'use client'
import React, { useEffect, useState } from 'react'
import Map from './Map'
import EventsList from './EventsList'
import CenterLoc from './CenterLoc'
import { Libraries, useLoadScript } from '@react-google-maps/api'
import EventModal from './EventModal'

type LocationType = {
    lat: number;
    lng: number
}

const defaultLoc = {
    lat: 27.672932021393862, lng: 85.31184012689732
}

type EventPropsTypes = {
    location: google.maps.LatLngLiteral;
    placeId?: string;
}

function Main() {
    const [mapRef, setMapsRef] = useState<google.maps.Map>({} as google.maps.Map)
    const [currentLoc, setCurrentLoc] = useState<LocationType | null>(null);
    const [eventModal, setEventModal] = useState(false);
    const [userEventList, setUserEventList] = useState<EventPropsTypes[]>([] as EventPropsTypes[])

    useEffect(() => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                setCurrentLoc({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                })

            });
        }
    }, [navigator.geolocation])

    return (
        <div className='mx-[5%]'>
            <div className='bg-blue-400 h-[50px] w-[100%]'>
                <CenterLoc />
            </div>
            <div className='flex flex-row grow gap-x-2 box-border'>
                <Map mapRef={mapRef} setMapsRef={setMapsRef} setEventModal={setEventModal} currentLoc={currentLoc || defaultLoc} userEventList={userEventList} />
                <EventsList />
            </div>
            {
                eventModal &&
                <EventModal mapRef={mapRef} setEventModal={setEventModal} setUserEventList={setUserEventList} userEventList={userEventList} />
            }
        </div>
    )
}

export default Main