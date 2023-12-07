import { Autocomplete } from '@react-google-maps/api'
import React, { useEffect, useState, useRef } from 'react'
import { EventPropsTypes } from './Main';
import { eventList } from '@/utils';

function EventModal({ mapRef, setEventModal, setUserEventList, userEventList, userUEL, setUserUEL, circleBounds, curIndex, setCurIndex }: {
    mapRef: google.maps.Map,
    setEventModal: React.Dispatch<React.SetStateAction<boolean>>,
    userEventList: EventPropsTypes[],
    setUserEventList: React.Dispatch<React.SetStateAction<EventPropsTypes[]>>
    userUEL: EventPropsTypes[],
    setUserUEL: React.Dispatch<React.SetStateAction<EventPropsTypes[]>>,
    circleBounds: google.maps.Circle,
    curIndex: number,
    setCurIndex: React.Dispatch<React.SetStateAction<number>>,
}) {

    const [searchBoxInner, setSearchBoxInner] = useState<google.maps.places.Autocomplete | null>(null);
    const focusRef = useRef<HTMLInputElement>()

    const onPlacesChangedInner = () => {
        if (searchBoxInner) {
            const latlng = searchBoxInner.getPlace() as google.maps.places.PlaceResult
            if (latlng) {
                const lat = latlng.geometry?.location?.lat() as number
                const lng = latlng.geometry?.location?.lng() as number
                if ((Object.keys(circleBounds).length !== 0) && (circleBounds.getBounds()?.contains({ lat, lng }))) {
                    setUserEventList([
                        ...userEventList,
                        {
                            id: curIndex,
                            lat, lng,
                            placeId: latlng.place_id,
                            eventType: 'blue'
                        }
                    ])
                    setCurIndex(curIndex + 1)
                } else {
                    setUserUEL([...userUEL, {
                        id: curIndex,
                        lat, lng,
                        placeId: latlng.place_id,
                        eventType: 'blue'
                    }])
                    setCurIndex(curIndex + 1)
                }
                setEventModal(false)
                // mapRef?.panTo({ lat, lng })
                // mapRef?.setZoom(13)
            } else {
                console.log('no-result-Inner');
            }
        }
    }

    const onSBLoadInner = (ref: google.maps.places.Autocomplete) => {
        setSearchBoxInner(ref);
    }

    return (
        <div className='absolute md:left-[110px] sm:left-[15px] top-[15%]'>
            {
                mapRef &&
                <Autocomplete
                    onLoad={onSBLoadInner}
                    onPlaceChanged={onPlacesChangedInner}
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
            }
        </div>
    )
}

export default EventModal