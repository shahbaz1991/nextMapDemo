'use client'
import React, { useLayoutEffect, useState } from 'react'
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
    const [currentLoc, setCurrentLoc] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [eventModal, setEventModal] = useState(false);
    const [userEventList, setUserEventList] = useState<EventPropsTypes[]>([] as EventPropsTypes[])

    useLayoutEffect(() => {
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
            {(Object.keys(currentLoc).length !== 0) ?
                <>
                    <div className='h-[500px] flex flex-row grow gap-x-2 box-border'>
                        <Map mapRef={mapRef} setMapsRef={setMapsRef} setEventModal={setEventModal} currentLoc={currentLoc} userEventList={userEventList} />
                        {/* <EventsList /> */}
                    </div>
                    {
                        eventModal &&
                        <EventModal mapRef={mapRef} setEventModal={setEventModal} setUserEventList={setUserEventList} userEventList={userEventList} />
                    }
                </>
                : <div className='w-[60%] flex justify-center items-center'>
                    <p>Loading Map...</p>
                </div>
            }
        </div>
    )
}

export default Main