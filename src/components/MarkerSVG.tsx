import * as React from "react"
const MarkerSVG = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={29}
        viewBox="0 0 20.5 29.6"
        {...props}
    >
        <path
            d="M3.362.343h14c1.662 0 3 1.338 3 3v14c0 1.662-1.338 3-3 3h-3.5c-2.99 11.903-3.667 11.864-7 0h-3.5c-1.662 0-3-1.338-3-3v-14c0-1.662 1.338-3 3-3z"
            style={{
                fill: "#6ff3f3",
                fillOpacity: 1,
                stroke: "#000",
                strokeWidth: 0.5,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
            }}
        />
        <text
            fill="#fff"
            fontSize={12}
            style={{
                fontFamily: "Arial,sans-serif",
                fontWeight: 700,
                textAlign: "center",
            }}
            textAnchor="middle"
            transform="translate(10 14.5)"
        >
            {props.markernumber}
        </text>
    </svg>
)
export default MarkerSVG
