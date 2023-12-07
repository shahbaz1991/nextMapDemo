'use client'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Map from './Map'
import EventsList from './EventsList'
import { Libraries, useLoadScript } from '@react-google-maps/api'
import EventModal from './EventModal'
import { eventList } from '@/utils'

type LocationType = {
    lat: number;
    lng: number
}

const defaultLoc = {
    lat: 27.672932021393862, lng: 85.31184012689732
}

export type EventPropsTypes = {
    id: number;
    placeId?: string;
    lat: number,
    lng: number,
    eventType: string,
}

function Main() {
    const [mapRef, setMapsRef] = useState<google.maps.Map>({} as google.maps.Map)
    const [currentLoc, setCurrentLoc] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [eventModal, setEventModal] = useState(false);
    const [circleBounds, setCircleBounds] = useState<google.maps.Circle>({} as google.maps.Circle);

    const [userEventList, setUserEventList] = useState<EventPropsTypes[]>([] as EventPropsTypes[]);
    const [userUEL, setUserUEL] = useState<EventPropsTypes[]>([] as EventPropsTypes[]);
    const [curIndex, setCurIndex] = useState(14);

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



    useEffect(() => {
        if (Object.keys(circleBounds).length !== 0) {
            const newList = eventList.filter(item => circleBounds.getBounds()?.contains({ lat: item.lat, lng: item.lng }))
            const unfiltered = eventList.filter(item => !circleBounds.getBounds()?.contains({ lat: item.lat, lng: item.lng }))
            setUserEventList(newList)
            setUserUEL(unfiltered)
        }
    }, [circleBounds]);

    useEffect(() => {
        console.log('main', userUEL);
    }, [userEventList, userUEL])

    return (
        <div className='md:ml-[100px] sm:ml-[10px]'>
            {(Object.keys(currentLoc).length !== 0) ?
                <>
                    <div className='h-[500px] w-[636px] flex flex-row grow gap-x-2 box-border'>
                        <Map
                            mapRef={mapRef}
                            setMapsRef={setMapsRef}
                            setEventModal={setEventModal}
                            currentLoc={currentLoc}
                            userEventList={userEventList}
                            setUserEventList={setUserEventList}
                            circleBounds={circleBounds}
                            setCircleBounds={setCircleBounds}
                            userUEL={userUEL}
                            setUserUEL={setUserUEL}
                        />
                        {/* <EventsList /> */}
                    </div>
                    {
                        eventModal &&
                        <EventModal
                            mapRef={mapRef}
                            setEventModal={setEventModal}
                            setUserEventList={setUserEventList}
                            userEventList={userEventList}
                            userUEL={userUEL}
                            setUserUEL={setUserUEL}
                            circleBounds={circleBounds}
                            curIndex={curIndex}
                            setCurIndex={setCurIndex}
                        />
                    }
                    <div className='absolute right-5 top-2 w-[400px]'>
                        <p className='text-[13px]'>Map shows a circle of 50 kms where center is the base location of the user i.e. KOLKATA <span className='text-[10px]'>(circle is for reference only will not be shown in prod)</span>
                            <br></br>Event Markers which fall within the 50kms radius are showns initially.
                            <br></br>The <span className='text-blue-600'>Blue pin (Cluster)</span> shows the grouping up of 8 event markers.</p>
                        <br></br>
                        <h4>Scenario 1 - Grouping up (Clustering) of event markers of same type when zoomed in</h4>
                        <p className='text-[13px] font-serif'>As the Cluster marker is clicked or user zoom-in then the grouping of similar event marker clusters are showns blue and green and number shows the number of event markers in the cluster.</p>
                        <br></br>
                        <h4>Scenario 2 - Showing near by event markers when user drag and stops</h4>
                        <p className='text-[13px]  font-serif'>As the user drags and stops then other markers will show up which fall within the range.</p>
                        <br></br>
                        <h4>Scenario 3 - Showing near by event markers when user changes base location</h4>
                        <p className='text-[13px]  font-serif'>In this scenario if the user changes his/her base location then the event markers of that location with show up.
                            Here we are setting up a event marker in Bhubanesware and as the user changes base location to a nearby place to Bhubanesware say Cuttack then
                            the Bhubanesware event marker will appear.
                        </p>
                    </div>
                </>
                : <div className='w-[60%] flex justify-center items-center'>
                    <p>Loading Map...</p>
                </div>
            }
        </div>
    )
}

export default Main