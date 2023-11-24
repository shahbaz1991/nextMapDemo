import React, { useEffect } from 'react'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

const SearchBox = ({ map, currentLoc }: { map: google.maps.Map, currentLoc: google.maps.LatLngLiteral }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        googleMaps: map,
        debounce: 300,
    });


    useEffect(() => {           //ChIJy0Nb1Ql1AjoRPoIXP02Wpkg
        console.log(currentLoc);

        async function getAdd() {
            if (map) {
                await getGeocode({
                    location: currentLoc
                    // {
                    //     lat: 22.5694426,
                    //     lng: 88.43344599999999,
                    // }
                    // placeId: 'ChIJy0Nb1Ql1AjoRPoIXP02Wpkg'
                }).then((addr) => {
                    if (addr[0]?.address_components) {
                        const a = addr[0]?.address_components.filter((item) => item.types.includes('locality') || item.types.includes('country'))
                        console.log('a', a)
                        // setSearchText(`${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}`)
                        setValue(`${a[0]?.long_name || ''}, ${a[1]?.long_name || ''}`, false)
                        map.panTo(currentLoc)
                    }
                    console.log('addr', addr)
                })
            }
        }
        getAdd()
    }, [map, currentLoc])

    const handleInput = (e: any) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: string }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    map.panTo({ lat, lng })
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} className='w-[250px] cursor-pointer bg-white rounded-sm drop-shadow-md' onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div className='absolute left-[6%] top-[2%] z-10'>
            {map &&
                <input
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Enter Location"
                    className='w-[250px] rounded-sm p-[2px]'
                />
            }
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul>{renderSuggestions()}</ul>}

        </div>
    );
};

export default SearchBox