
import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import Canvas from 'react-native-canvas';

const MainScreen = () => {
    const ref = useRef(null);

    useEffect(() => {
      if (ref.current) {
        const canvas = ref.current;
        canvas.width = 400; // Set the canvas width
        canvas.height = 600; // Set the canvas height
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        ctx.beginPath();
        ctx.arc(.45*width, height/2, width/3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#F8F2E8';
        ctx.fill();
        ctx.lineWidth = 20; // Set the line width
        ctx.strokeStyle = 'green'; // Set the stroke color
        ctx.stroke(); // Apply the stroke
        ctx.beginPath();
        ctx.arc(.45*width, height/3.55, width/20, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#D1671B';
        ctx.fill();
         // Draw text in the middle of the first circle
    ctx.fillStyle = '#D1671B'; // Set the text color
    ctx.font = '60px Arial'; // Set the font size and family
    ctx.textAlign = 'center'; // Center the text horizontally
    ctx.textBaseline = 'middle'; // Center the text vertically
    ctx.fillText('15,5°', 0.45*width, height / 2);

      }
    }, [ref]);

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.text}>Vatupassi</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
            <Canvas ref={ref} />
        </SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.bottomText}></Text>
        </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1671B',
        padding: 16,
        margin: 0,
    },
    text: {
        fontSize: 32, // Increase the font size
        color: 'green', // Set the text color
        padding: 16,
    },
    canvas:{
        margin: 0,
        padding: 0,
        height: '400px',
        width: '100%',
        backgroundColor: '#eeeeee',
    },
    bottomText: {
        fontSize: 24, // Increase the font size
        fontWeight: 'bold',
        color: '#D1671B' // Make the text bold
        
    },
});

export default MainScreen;