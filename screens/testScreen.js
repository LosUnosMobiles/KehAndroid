import React from 'react';
import useSpiritLevel from '../hooks/vatuHook';
import { View, Text, StyleSheet } from 'react-native';

const SpiritLevelDisplay = () => {
    const orientation = useSpiritLevel();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Device Orientation</Text>
            <Text>Alpha (z-axis): {orientation.alpha.toFixed(2)}</Text>
            <Text>Beta (x-axis): {orientation.beta.toFixed(2)}</Text>
            <Text>Gamma (y-axis): {orientation.gamma.toFixed(2)}</Text>
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
});

export default SpiritLevelDisplay;