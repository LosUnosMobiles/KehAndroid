/**
 * Custom hook that uses the device's motion sensors to provide orientation data.
 * 
 * @file useSpiritLevel.js
 * @module useSpiritLevel
 * 
 * @requires useState
 * @requires useEffect
 * @requires expo-sensors.DeviceMotion
 * 
 * @returns {Object} orientation - The current orientation of the device.
 * @returns {number} orientation.alpha - The alpha rotation (in radians), representing the rotation around the z-axis.
 * @returns {number} orientation.beta - The beta rotation (in radians), representing the rotation around the x-axis.
 * @returns {number} orientation.gamma - The gamma rotation (in radians), representing the rotation around the y-axis.
 */

import { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';

const useSpiritLevel = () => {
    const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

    useEffect(() => {
        const subscription = DeviceMotion.addListener((motionData) => {
            const { alpha, beta, gamma } = motionData.rotation;
            setOrientation({ alpha, beta, gamma });
        });

        DeviceMotion.setUpdateInterval(100); // Set the update interval to 100ms

        return () => {
            subscription.remove();
        };
    }, []);

    return orientation;
};

export default useSpiritLevel;
