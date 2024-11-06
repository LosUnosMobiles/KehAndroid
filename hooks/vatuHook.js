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
 * @returns {number} orientation.combinedAngle - The combined angle of alpha and beta (in radians), calculated using the Pythagorean theorem.
 * @returns {string} orientation.status - The status of the device motion sensor permission.
 */

import { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';

const useSpiritLevel = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0, combinedAngle: 0, direction: 0, status: hasPermission });

    // Calculate the combined angle using the Pythagorean theorem
    
    orientation.combinedAngle = combine(orientation.beta, orientation.gamma);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await DeviceMotion.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        requestPermission();
    }, []);

    useEffect(() => {
        const subscription = DeviceMotion.addListener((motionData) => {
            const { alpha, beta, gamma } = motionData.rotation;
            setOrientation({ alpha, beta, gamma, combinedAngle: combine(beta, gamma), direction: toDirection(beta, gamma), status: hasPermission });
        });

        DeviceMotion.setUpdateInterval(200); // Set the update interval to 200ms

        return () => {
            subscription.remove();
        };
    }, [hasPermission]);

    return orientation;
};

export const toDegrees = (radians) => (radians * 180) / Math.PI;

export const combine = (a, b) => Math.sqrt(a ** 2 + b ** 2).toFixed(2);

export const toDirection = (a, b) => Math.atan2(a, b);

export default useSpiritLevel;