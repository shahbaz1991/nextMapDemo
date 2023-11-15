// 'use client'
// import React, { useEffect, useState } from 'react'
// import { Loader } from "@googlemaps/js-api-loader"
// import { mapStyle1 } from '@/utils';

// type LocationType = {
//     lat: number;
//     lng: number
// }
// function Map2() {
//     const [currentLoc, setCurrentLoc] = useState<LocationType | null>(null);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function (location) {
//                 setCurrentLoc({
//                     lat: location.coords.latitude,
//                     lng: location.coords.longitude,
//                 })

//             });
//         }
//     }, [])

//     useEffect(() => {
//         const loader = new Loader({
//             apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
//             version: "weekly",
//             libraries: ['places']
//             // ...additionalOptions,
//         });

//         if (currentLoc) {
//             loader.load().then(async () => {
//                 const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//                 let map = new Map(document.getElementById("map") as HTMLElement, {
//                     center: currentLoc,
//                     zoom: 14,
//                     styles: mapStyle1,

//                 });
//             });
//         }
//     }, [currentLoc])

//     return (
//         <div id='map' className='h-[400px] w-[400px]' />
//     )
// }

// export default Map2