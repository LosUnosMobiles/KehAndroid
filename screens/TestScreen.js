<<<<<<< HEAD:screens/testScreen.js
import React from 'react';
import useSpiritLevel, { toDegrees } from '../hooks/vatuHook';
=======
import React, {useEffect} from 'react';
import useSpiritLevel from '../hooks/vatuHook';
>>>>>>> main:screens/TestScreen.js
import { View, Text, StyleSheet } from 'react-native';

const SpiritLevelDisplay = () => {
    const orientation = useSpiritLevel();

    // Convert radians to degrees
    //const toDegrees = (radians) => (radians * 180) / Math.PI;

    const alphaDegrees = toDegrees(orientation.alpha);
    const betaDegrees = toDegrees(orientation.beta);
    const gammaDegrees = toDegrees(orientation.gamma);
    const combinedAngleDegrees = toDegrees(orientation.combinedAngle);

    const isLevel = Math.abs(combinedAngleDegrees) < 1; // Consider the device level if beta is within 5 degrees of 0

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Device Orientation</Text>
<<<<<<< HEAD:screens/testScreen.js
            <Text>Alpha (z-axis): {alphaDegrees.toFixed(2)}°</Text>
            <Text>Beta (x-axis): {betaDegrees.toFixed(2)}°</Text>
            <Text>Gamma (y-axis): {gammaDegrees.toFixed(2)}°</Text>
            <Text>Combined Angle: {combinedAngleDegrees.toFixed(2)}°</Text>
            <Text style={styles.levelText}>{isLevel ? 'The device is level' : 'The device is not level'}</Text>
=======
            <Text>Alpha (z-axis): {orientation.x.toFixed(2)}</Text>
            <Text>Beta (x-axis): {orientation.y.toFixed(2)}</Text>
            <Text>Gamma (y-axis): {orientation.z.toFixed(2)}</Text>
>>>>>>> main:screens/TestScreen.js
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    levelText: {
        fontSize: 18,
        color: 'red',
    },
});

export default SpiritLevelDisplay;