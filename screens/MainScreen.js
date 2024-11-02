
import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import Canvas from 'react-native-canvas';

const MainScreen = () => {
    const ref = useRef(null);

    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext('2d');
        ctx.beginPath();
        ctx.arc(100, 100, 40, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
      }
    }, [ref]);

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.text}>Vatupassi</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
            <Canvas style={{ width: '100%', height: '100%', backgroundColor: 'black' }} ref={ref} />
        </SafeAreaView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
});

export default MainScreen;