import { EventPropsTypes } from "@/components/Main"

export const mapStyle1 = [
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "-8"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "color": "#acacac"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#484848"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ff0000"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-3"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "72"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "23"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "30"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-19"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "2"
            },
            {
                "gamma": "1.21"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "15"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "-43"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "22"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "weight": "0.12"
            },
            {
                "lightness": "-23"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "5"
            },
            {
                "visibility": "on"
            },
            {
                "lightness": "5"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": "-24"
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-88"
            },
            {
                "lightness": "-23"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "0.01"
            },
            {
                "lightness": "9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-32"
            },
            {
                "gamma": "2.99"
            }
        ]
    }
]

export const mapStyle2 = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
]

export const eventList: EventPropsTypes[] = [
    {
        id: 0, lat: 22.57081966903408, lng: 88.43293100998314, eventType: 'blue'
    },
    {
        id: 1, lat: 22.571488377884414, lng: 88.42754974728076, eventType: 'yellow'
    },
    {
        id: 2, lat: 22.56959118695109, lng: 88.43143970179288, eventType: 'green'
    },
    {
        id: 3, lat: 22.569888401362235, lng: 88.43479782742992, eventType: 'green'
    },
    {
        id: 4, lat: 22.57193852577691, lng: 88.43454327386266, eventType: 'blue'
    },
    {
        id: 5, lat: 22.571507866742078, lng: 88.43063573077494, eventType: 'yellow'
    },
    {
        id: 6, lat: 22.56836547459435, lng: 88.4326821056448, eventType: 'green'
    },
    {
        id: 7, lat: 22.57147268507993, lng: 88.4354862087245, eventType: 'blue'
    },
    {
        id: 8, lat: 22.827577897983478, lng: 88.63739069968172, eventType: 'green'
    },
    {
        id: 9, lat: 22.680674156027028, lng: 88.86261041650417, eventType: 'green'
    },
    // outside
    {
        id: 10, lat: 23.057745329820065, lng: 88.82690485164207, eventType: 'green'
    },
    {
        id: 11, lat: 22.7338816819745, lng: 89.04113824081465, eventType: 'green'
    },
    {
        id: 12, lat: 22.294939490792476, lng: 87.8985601652276, eventType: 'blue'
    },
    {
        id: 13, lat: 22.43717726075172, lng: 87.8628546003655, eventType: 'blue'
    }
]