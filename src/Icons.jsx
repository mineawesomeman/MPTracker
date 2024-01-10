export function HappeningIcon({x, y, z}) {
    return (
        <g transform={`translate(${x-15}, ${y-15}), scale(0.3)`} z={z} className="icon">
            <path stroke="black" strokeWidth={1} fill="white" d="m 18.56 45.13 l 19.27 4.87 l 2.31 -14.23 s 4.94 -5.62 9.85 -5.62 s 9.97 5.84 9.97 5.84 v 8.92 l -19.49 7.49 v 17.07 s -3.52 7.49 -1.21 10.35 s 5.71 4.63 10.73 4.63 s 11.3 -4.19 11.3 -6.5 s -2.42 -9.25 -2.42 -9.25 v -9.36 l 22.91 -13.33 l -10.13 -20.04 l -21.65 -9.25 l -22.19 9.69 l -9.25 18.72 z"/>
            <path stroke="black" strokeWidth={1} d="m40.48,69.47c1.74-.89,5.09-2.32,9.52-2.42,3.99-.09,7.11.93,8.87,1.65"/>
        </g>
    );
}

export function ChanceIcon({x, y, z}) {
    return (
        <g transform={`translate(${x-11.5}, ${y-12}), scale(0.35)`} z={z} className="icon">
            <polygon stroke="white" strokeWidth={2} fill="green" points="32.43 .8 45.59 17.1 63.87 23.92 52.75 40.33 52.31 61.04 33.37 54.76 12.66 60.16 12.66 39.89 .81 24.48 18.61 17.98 32.43 .8"/>
            <polyline stroke="white" strokeWidth={2} fill="none" points="18.61 17.98 33.15 33.75 52.75 40.33"/>
            <polyline stroke="white" strokeWidth={2} fill="none" points="45.59 17.1 33.15 33.75 12.66 39.89"/>
            <line stroke="white" strokeWidth={2} x1="33.15" y1="33.75" x2="33.37" y2="54.76"/>
        </g>
    )
}

export function DuelIcon({x, y, z}) {
    return (
        <g transform={`translate(${x-9.5}, ${y-9.5}), scale(0.33)`} z={z} className="icon">
            <polygon stroke="white" strokeWidth={1} fill="green" points="8.6 36.22 4.16 31.87 4.16 26.54 12.29 22.19 2.65 12.41 2.65 .74 15.45 .74 28.5 14.77 42.85 .5 54.43 .5 54.43 12.64 45.5 21.57 53.44 26.54 53.44 32.91 49.75 36.59 57.41 44.67 57.41 49.21 51.03 55.59 46.35 55.59 38.13 47.37 34.02 52.47 22.82 52.47 19.35 49 18 49 9.93 55.59 6.1 55.59 .5 49.99 .5 44.25 8.6 36.22"/>
            <polyline stroke="white" strokeWidth={1} fill="none" points="28.5 14.77 17.01 26.54 12.29 22.19"/>
            <polyline stroke="white" strokeWidth={1} fill="none" points="45.5 21.57 25 40 22.96 40 15.1 32.13 15.1 28.52 17.01 26.54"/>
            <polyline stroke="white" strokeWidth={1} fill="none" points="41.85 24.85 41.85 32.27 34.11 40.01 30.5 40.01 27.88 37.4"/>
            <polyline stroke="white" strokeWidth={1} fill="none" points="7.67 35.31 10.78 35.31 19.78 44.31 19.78 49.43"/>
            <polyline stroke="white" strokeWidth={1} fill="none" points="37.32 48.37 37.32 44.32 46.34 35.3 51.04 35.3"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="51.04" y1="37.96" x2="39.97" y2="49.21"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="54.92" y1="42.05" x2="43.69" y2="52.93"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="6.85" y1="37.96" x2="17.26" y2="49.6"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="13.18" y1="52.93" x2="2.93" y2="41.84"/>
            <circle stroke="white" strokeWidth={1} fill="white" cx="9.64" cy="29.65" r="1.5"/>
            <circle stroke="white" strokeWidth={1} fill="white" cx="25.14" cy="45.54" r="1.5"/>
            <circle stroke="white" strokeWidth={1} fill="white" cx="31.64" cy="45.54" r="1.5"/>
            <circle stroke="white" strokeWidth={1} fill="white" cx="47.14" cy="29.65" r="1.5"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="25" y1="40" x2="30.5" y2="40"/>
        </g>
    )
}

export function DKIcon({x, y, z}) {
    return (
        <g transform={`translate(${x-9}, ${y-11.5}), scale(0.35)`} z={z} className="icon">
            <path stroke="white" strokeWidth={2} fill="#8b5e3c" d="m20.27,1h7.05l18.06,21.48v6.72h4.74v6.17s-3.19,4.85-3.19,7.27,1.21,2.86,1.21,2.86v7.49s-6.17,12.56-21.59,12.56S3.09,53.31,3.09,53.31v-8.04s1.54-.22,1.54-1.98-3.63-8.15-3.63-8.15v-6.06h5.07v-7.71l14.21-14.21V1Z"/>
            <path stroke="white" strokeWidth={1} fill="none" d="m3.09,49.24c4.67-1.85,6.61-4.8,22.47-4.8,19.16,0,17.89,2.94,22.58,4.8"/>
            <path stroke="white" strokeWidth={1} fill="none" d="m17.19,34.04s-.88-4.85,3.41-4.85,3.63,2.42,3.63,2.42h2.75s1.21-2.42,4.52-2.42,3.74,4.85,3.74,4.85"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="21.48" y1="35.25" x2="23.52" y2="37.29"/>
            <line stroke="white" strokeWidth={1} fill="none" x1="29.74" y1="35.25" x2="27.84" y2="37.15"/>
            <path stroke="white" strokeWidth={1} fill="none" d="m12.67,36.2l-3.85-7.01v-6.83s1.65-2.53,5.73-2.53,6.94,3.08,6.94,3.08h8.26s3.74-3.08,7.6-3.08,4.74,2.53,4.74,2.53v6.83l-3.41,7.01"/>
        </g>
    )
}

export function BowserIcon({x, y, z}) {
    return (
        <g transform={`translate(${x-8.5}, ${y-11}), scale(0.33)`} z={z} className="icon">
            <path stroke="#231f20" strokeWidth={1} fill="#ed1c24" d="m10.41,4.24S3.58,10.08,3.58,14.38s3.41,7.93,3.41,7.93c0,0-6.5,1.87-6.5,9.69,0,10.68,7.93,14.98,7.93,14.98v4.63l4.19,4.85s-2.42,1.43-2.42,3.19c0,2.64,3.63,7.27,8.04,7.27s9.03-2.53,9.03-2.53c0,0,3.42,2.53,7.27,2.53s9.63-2.76,9.63-6.73c0-2.52-2.03-3.74-2.03-3.74l3.96-4.96v-4.07s7.59-7.38,7.59-14.87-6.66-10.02-6.66-10.02c0,0,4.19-4.19,4.19-7.6s-7.97-12.44-7.97-12.44v9.58h-3.3s-5.62-9.58-7.16-9.58-1.98,3.3-1.98,3.3c0,0-2-5.29-4.03-5.29s-3.9,5.07-3.9,5.07c0,0,.22-2.75-1.43-2.75s-8.04,10.79-8.04,10.79h-2.97V4.24Z"/>
            <path stroke="#231f20" strokeWidth={1} fill="#231f20" d="m18.82,41.28l-8.05-9.84c-.15-.19-.45-.13-.52.1l-1.38,4.42,7.49,15.09c.16.33.59.41.86.16l3.03-2.81c.36-.34.95-.08.95.41v5.09l2.98-.84c1.9-.53,3.91-.49,5.78.11l2.26.73v-5.49c0-.42.52-.61.79-.29l3.26,3.88c.28.33.8.27,1-.11l7.51-14.4-1.46-5.49c-.08-.29-.46-.36-.64-.12l-7.06,9.54c-.29.41-.92.36-1.14-.09l-2.26-4.61-1.16-.32c-2.6-.73-5.35-.71-7.94.04l-1,.39-2.52,4.3c-.11.34-.56.42-.78.14Z"/>
            <polygon stroke="#231f20" strokeWidth={1} fill="#231f20" points="15.04 17.79 15.04 22.71 16.59 24.27 22.69 24.27 22.69 21.86 15.04 17.79"/>
            <polygon stroke="#231f20" strokeWidth={1} fill="#231f20" points="31.73 24.27 37.33 24.27 38.54 23.06 38.54 17.79 31.73 21.86 31.73 24.27"/>
        </g>
    )
}