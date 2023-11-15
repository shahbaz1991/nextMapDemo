'use client'
import { mapStyle1 } from '@/utils';
import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef, useState } from 'react'

type LocationType = {
    lat: number;
    lng: number
}
function Map3() {
    const mapRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
                version: "weekly",
                libraries: ['places']
                // ...additionalOptions,
            });

            const { Map } = await loader.importLibrary('maps')

            const mapOptions: google.maps.MapOptions = {
                center: currentLoc,
                zoom: 14,
                mapId: 'aff7c7421bdc7a7a',
            }
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
        }
        initMap()
    }, [currentLoc])

    return (
        <div className='h-[400px] w-[400px]' ref={mapRef} />
    )
}

export default Map3