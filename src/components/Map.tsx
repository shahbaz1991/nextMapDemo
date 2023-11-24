'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Autocomplete, CircleF, GoogleMap, InfoBox, Libraries, MarkerF, StandaloneSearchBox, StandaloneSearchBoxProps, useLoadScript } from '@react-google-maps/api'
import { eventList } from '@/utils';
import { Root, createRoot } from 'react-dom/client'
import Image from 'next/image';
import usePlacesAutocomplete, { LatLng, getGeocode, getLatLng } from 'use-places-autocomplete';
import SearchBox from './SearchBox';

const libraries = ["places", "marker"]

type EventPropsTypes = {
    location: google.maps.LatLngLiteral;
    placeId?: string;
}

function Map({ mapRef, setMapsRef, currentLoc, setEventModal, userEventList }: {
    mapRef: google.maps.Map,
    setMapsRef: React.Dispatch<React.SetStateAction<google.maps.Map>>,
    currentLoc: google.maps.LatLngLiteral,
    setEventModal: React.Dispatch<React.SetStateAction<boolean>>,
    userEventList: EventPropsTypes[],
}) {
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [searchBoxInner, setSearchBoxInner] = useState<google.maps.places.Autocomplete | null>(null);
    const [newLatLng, setNewLatLng] = useState<google.maps.LatLngLiteral | null>(null)
    // const [circleBounds, setCircleBounds] = useState<google.maps.Circle | null>(null);
    const [defaultValue, setDefaultValue] = useState('')
    const [searchAutoBox, setSearchAutoBox] = useState<google.maps.places.Autocomplete | null>(null);

    const mapCenter: google.maps.LatLngLiteral = useMemo(() => (
        currentLoc
    ), [currentLoc]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        libraries: libraries as Libraries,
    })

    const onPlacesChanged = () => {
        if (searchBox) {
            // console.log('searchBox', searchBox.getPlaces());
            const latlng = searchBox.getPlaces() as google.maps.places.PlaceResult[]
            if (latlng.length !== 0) {
                const lat = latlng[0].geometry?.location?.lat() as number
                const lng = latlng[0].geometry?.location?.lng() as number
                mapRef?.setCenter({ lat, lng })
            } else {
                console.log('no- result');
            }
        }
    }

    const onAutoPlacesChanged = () => {
        if (searchAutoBox) {
            // console.log('searchBox', searchBox.getPlaces());
            const latlng = searchAutoBox.getPlace() as google.maps.places.PlaceResult
            if (latlng?.geometry) {
                const lat = latlng?.geometry?.location?.lat() as number
                const lng = latlng?.geometry?.location?.lng() as number
                mapRef?.setCenter({ lat, lng })
            } else {
                console.log('no- result');
            }
        }
    }

    useEffect(() => {           //ChIJy0Nb1Ql1AjoRPoIXP02Wpkg
        async function getAdd() {
            await getGeocode({
                location: mapCenter
                // {
                //     lat: 22.5694426,
                //     lng: 88.43344599999999,
                // }
                // placeId: 'ChIJy0Nb1Ql1AjoRPoIXP02Wpkg'
            }).then((addr) => {
                let aa: google.maps.GeocoderResult[] = []
                addr.forEach(item => {
                    if ((item.geometry.location.lat() === mapCenter.lat) && (item.geometry.location.lng() === mapCenter.lng)) {
                        aa.push(item)
                    }
                })
                if (addr[0]?.address_components) {
                    const a = addr[0]?.address_components.filter((item) => item.types.includes('locality') || item.types.includes('country'))
                    // console.log('a', a)
                    // setSearchText(`${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}`)
                    setDefaultValue(`${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}`)
                    // setNewLatLng(mapCenter)
                    // mapRef.setCenter(currentLoc)
                }
            })
        }
        if ((Object.keys(mapRef).length !== 0) && mapCenter) {
            getAdd()
        }
    }, [mapRef, mapCenter])

    // // getting address 
    // useEffect(() => {           //ChIJy0Nb1Ql1AjoRPoIXP02Wpkg
    //     async function getAdd() {
    //         if (mapRef && searchBox) {
    //             const addr = await getGeocode({
    //                 // location: {
    //                 //     lat: 22.5694426,
    //                 //     lng: 88.43344599999999,
    //                 // }
    //                 placeId: 'ChIJy0Nb1Ql1AjoRPoIXP02Wpkg'
    //             })
    //             if (addr[0]?.address_components) {
    //                 let address = ''
    //                 const a = addr[0]?.address_components.filter((item) => item.types.includes('locality') || item.types.includes('country'))
    //                 console.log('a', a)
    //                 // setSearchText(`${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}`)
    //                 searchBox.setValues({ value: `${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}` })
    //             }
    //             console.log('addr', addr)
    //         }
    //     }
    //     getAdd()
    // }, [mapRef, searchBox])

    const onSBLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
        // mapRef?.setCenter(currentLoc)
    }

    const onSBAutoLoad = (ref: google.maps.places.Autocomplete) => {
        setSearchAutoBox(ref);
        // mapRef?.setCenter(currentLoc)
    }

    // const onPlacesChangedInner = () => {
    //     if (searchBoxInner) {
    //         const latlng = searchBoxInner.getPlace() as google.maps.places.PlaceResult
    //         if (latlng) {
    //             const lat = latlng.geometry?.location?.lat() as number
    //             const lng = latlng.geometry?.location?.lng() as number
    //             setUserEventList([...userEventList, {
    //                 location: { lat, lng },
    //                 placeId: latlng.place_id,
    //             }])
    //             setEventModal(false)
    //             // mapRef?.setCenter({ lat, lng })
    //             // mapRef?.setZoom(8)
    //         } else {
    //             console.log('no-result-Inner');
    //         }
    //     }
    // }
    // const onSBLoadInner = (ref: google.maps.places.Autocomplete) => {
    //     setSearchBoxInner(ref);
    // }

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
            scrollwheel: false,
            center: mapCenter,
            mapId: process.env.NEXT_PUBLIC_MAP_ID,
            maxZoom: 16,
            minZoom: 5, //Number(16 - Math.log(100) / Math.log(2)),
            zoomControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        }), [mapCenter]);

    // const onClickMap = (e: google.maps.MapMouseEvent) => {
    // setUserEventList([...userEventList, {
    //     lat: e.latLng?.lat() as number,
    //     lng: e.latLng?.lng() as number,
    // }])
    // }

    const onPressedCreateEvent = () => {
        setEventModal(true)
    }

    if (!isLoaded) {
        return (
            <div className='w-[60%] flex justify-center items-center'>
                <p>Loading Map...</p>
            </div>
        )
    }

    return (
        <>
            {/* {
                mapRef &&
                <SearchBox map={mapRef} currentLoc={currentLoc} />
            } */}
            {
                (Object.keys(mapRef).length !== 0) &&
                <>
                    {/* <StandaloneSearchBox
                        onLoad={onSBLoad}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type='text'
                            defaultValue={defaultValue}
                            // value={searchText}
                            // onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "0px",
                                zIndex: 10,
                                marginLeft: "5%"
                            }}
                        />
                    </StandaloneSearchBox> */}
                    <Autocomplete
                        onLoad={onSBAutoLoad}
                        onPlaceChanged={onAutoPlacesChanged}
                        types={['(regions)']}
                    >
                        <input
                            type='text'
                            defaultValue={defaultValue}
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "7%",
                                zIndex: 10
                                // marginLeft: "-120x"
                            }}
                        />
                    </Autocomplete>
                </>
            }
            {
                mapCenter &&
                <button className='z-10 absolute left-[350px] border-2 border-white rounded-sm p-1 shadow-xl bg-white text-sm' onClick={onPressedCreateEvent}>
                    Create Event
                </button>
            }
            <GoogleMap
                onLoad={(map) => {
                    setMapsRef(map)
                }}
                // onCenterChanged={() => {
                //     console.log('cir', circleBounds);
                //     const mapCenterNew = mapRef?.getCenter()
                //     if (mapCenterNew) {
                //         if (newLatLng && circleBounds && !circleBounds?.getBounds()?.contains(mapCenterNew)) {
                //             mapRef?.panTo(newLatLng)
                //             console.log(mapRef?.getBounds()?.contains(newLatLng));
                //         }
                //     }
                // }}
                // onClick={onClickMap}
                zoom={16}
                options={mapOptions}
                mapContainerStyle={{ width: 600 }} //60%
            >
                {/* {
                    mapCenter &&
                    <Autocomplete
                        onLoad={onSBLoadInner}
                        onPlaceChanged={onPlacesChangedInner}
                    // options={{
                    //     bounds: circleBounds?.getBounds(),
                    //     strictBounds: true
                    // }}
                    >
                        <input
                            type='text'
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                // marginLeft: "-120x"
                            }}
                        />
                    </Autocomplete>
                } */}
                {
                    (Object.keys(mapRef).length !== 0) &&
                    <CircleF
                        center={mapRef.getCenter()}
                        radius={50000}
                        onLoad={(e) => {
                            const circleBounds = e.getBounds()
                            if (circleBounds) {
                                mapRef?.fitBounds(circleBounds)
                            }
                        }
                        }
                        options={{
                            fillColor: 'transparent',//'#ffc0cb',//'transparent',
                            strokeColor: 'transparent',
                            strokeOpacity: 0.8,
                        }}
                    />
                }
                {
                    (Object.keys(mapRef).length !== 0) && eventList.map((item, index) => (
                        <MarkerF key={index} position={item} icon={{
                            url: `${(index == 0) ? '/blueMarker.png' : (index == 1) ? '/greenMarker.png' : '/yellowMarker.png'}`, scaledSize: {
                                width: 20, height: 20, equals: () => false
                            }
                        }}
                        />
                    ))
                }
                {
                    (userEventList.length !== 0) && (Object.keys(mapRef).length !== 0) && userEventList.map((item, index) => (
                        <MarkerF position={item.location} icon={{
                            url: ('/blueMarker.png'),
                            scaledSize: {
                                width: 25, height: 25, equals: () => false
                            }
                        }}
                        />
                    ))
                }
                {/* {mapRef &&
                    <AdvMarker position={mapCenter} map={mapRef}>
                            <CircleSVG />
                    </AdvMarker>
                } */}
                {/* <MarkerF position={mapCenter} icon={{
                    url: '/greenMarker.png', scaledSize: {
                        width: 20, height: 20, equals: () => false
                    }
                }} /> */}

                {/* {
                    mapRef && eventList.map((item, index) => (
                        <AdvMarker key={index} position={item} map={mapRef}>
                            <Image src={'/markerPNG.png'} width={20} height={20} alt='mark-img' />
                        </AdvMarker>
                    ))
                }
                {
                    (userEventList.length !== 0) && mapRef && userEventList.map((item, index) => (
                        <AdvMarker key={index} position={item} map={mapRef}>
                            <Image src={'/markerPNG.png'} width={20} height={20} alt='mark-img' />
                        </AdvMarker>
                    ))
                } */}
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
                content: container,
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