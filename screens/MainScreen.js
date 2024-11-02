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

        //Isomman ympyrän parametrit
        const origo = { x: width / 2, y: height / 2 };
        const radius = Math.min(width, height) / 3;
        const startX = origo.x - radius/7;
        const startY = origo.y;

        //Pienemmän ympyrän parametrit
        const radius2 = Math.min(width, height) / 20;
        const startX2 = origo.x - radius/7;
        const startY2 = origo.y;

        //Kaltevuusarvo
        const degrees = 12.5;

        //Kaltevuuden suunta
        const direction = 90;
        const radians = direction * (Math.PI / 180);
        xArvo=Math.sin(radians)*radius;
        yArvo=Math.cos(radians)*radius; 

        //Piirretään isompi ympyrä
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#F8F2E8';
        ctx.fill();
        ctx.lineWidth = 20; // Set the line width
        ctx.strokeStyle = 'green'; // Set the stroke color
        ctx.stroke(); // Apply the stroke

        //Piirretään pienempi ympyrä
        ctx.beginPath();
        ctx.arc(startX2+xArvo, startY2-yArvo, radius2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#D1671B';
        ctx.fill();
         // Draw text in the middle of the first circle
    ctx.fillStyle = '#D1671B'; // Set the text color
    ctx.font = '60px Arial'; // Set the font size and family
    ctx.textAlign = 'center'; // Center the text horizontally
    ctx.textBaseline = 'middle'; // Center the text vertically
    ctx.fillText(degrees + ' °', 0.45*width, height / 2);

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