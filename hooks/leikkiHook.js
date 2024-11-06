import {useState} from "react";

const leikkiHook = () => {
    const [slopeAndDirection, setSlopeAndDirection] = useState(["45.0", Math.PI/2]);
    return slopeAndDirection;
}

export default leikkiHook