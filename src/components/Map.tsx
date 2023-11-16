'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, InfoBox, Libraries, useLoadScript } from '@react-google-maps/api'
import { eventList } from '@/utils';
import MarkerSVG from '../../public/MarkerSVG';
import { Root, createRoot } from 'react-dom/client'
import CircleSVG from '../../public/CircleSVG';

const libraries = ['places', 'marker']
function Map({ currentLoc }: { currentLoc: google.maps.LatLngLiteral }) {

    const [mapRef, setMapsRef] = useState<google.maps.Map>()

    const mapCenter = useMemo(() => (
        currentLoc
    ), [currentLoc]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false,
            scrollwheel: false,
            center: mapCenter,
            mapId: process.env.NEXT_PUBLIC_MAP_ID,
        }), [mapCenter]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        libraries: libraries as Libraries,
    })

    if (!isLoaded) {
        return (
            <div className='w-[60%] flex justify-center items-center'>
                <p>Loading Map...</p>
            </div>
        )
    }

    return (
        <>
            <GoogleMap
                onLoad={(map) => {
                    setMapsRef(map)
                }}
                zoom={15}
                options={mapOptions}
                mapContainerStyle={{ width: '60%' }}
            >
                {/* {mapRef &&
                    <AdvMarker position={mapCenter} map={mapRef}>
                            <CircleSVG />
                    </AdvMarker>
                } */}
                {
                    mapRef && eventList.map((item, index) => (
                        <AdvMarker key={index} position={item} map={mapRef}>
                            <MarkerSVG markernumber={index + 1} />
                        </AdvMarker>
                    ))
                }
                {
                    // mapRef && 
                    // <InfoBox>
                    //     <div className='border border-gray-800 bg-teal-500 h-[20px] w-[20px]'><p>Info Box</p></div>
                    // </InfoBox>
                }
            </GoogleMap>
        </>
    )
}

const AdvMarker = ({ position, map, children }: {
    position: google.maps.LatLngLiteral;
    map: google.maps.Map
    children: React.ReactNode
}) => {
    const rootRef = useRef<Root>()
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>()

    useEffect(() => {
        if (!rootRef?.current) {
            const container = document.createElement("div")
            rootRef.current = createRoot(container)
            markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: position,
                content: container
            })
        }
    }, [])

    useEffect(() => {
        if (markerRef?.current) {
            rootRef.current?.render(children)
            markerRef.current.position = position
            markerRef.current.map = map
        }
    }, [position, map, children])
    return (null)
}
export default Map