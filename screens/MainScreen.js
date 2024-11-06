import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Canvas from 'react-native-canvas';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import colorScheme from "../styles/colorScheme";

// TODO: Replace with the real hook
import leikkiHook from "../hooks/leikkiHook";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const MainScreen = () => {
    const canvasRef = useRef(null);
    const slopeAndOrientation = leikkiHook();
    const dimensions = {
        window: windowDimensions,
        screen: screenDimensions,
    };

    /**
     * Get radius for slope direction indicator.
     * @param width
     * @param height
     * @returns {number}
     */
    const getRadius = (width, height) => {
        return Math.min(width, height) / 3;
    }

    /**
     * Calculate small indicator circle coordinates from direction given by useSpiritLevel-hook.
     * @returns {{x: number, y: number}}
     */
    const getPositionUsingCurrentDirection = (canvas) => {
        const [width, height] = [canvas.width, canvas.height];
        const direction = slopeAndOrientation[1];
        console.log(direction)
        // const radians = direction * (Math.PI / 180);
        const xVal = Math.sin(direction) * getRadius(width, height);
        const yVal = Math.cos(direction) * getRadius(width, height);
        return {x: xVal, y: yVal};
    }

    /**
     * Draws the spirit level indicator.
     * @param ref
     */
    const drawSpiritLevel = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = dimensions.window.width; // Set the canvas width
            canvas.height = dimensions.window.width; // Set the canvas height
            console.log(canvas.height);


            drawLargeCircles(canvas);
            drawOrientationDirectionCircle(canvas);
            showSlopeDegrees(canvas, slopeAndOrientation[0]);
        }
    }

    /**
     * Draw spirit level indicator outer circle onto `canvas`
     * @param canvas
     */
    const drawLargeCircles = (canvas) => {
        const ctx = canvas.getContext('2d');
        const [width, height] = [canvas.width, canvas.height];

        // Large circle parameters
        const radius = getRadius(width, height);
        const origo = {x: width / 2, y: height / 2};
        const startX = origo.x;
        const startY = origo.y;

        // Draw large circle
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#F8F2E8';
        ctx.fill();
        ctx.lineWidth = 20; // Set the line width
        ctx.strokeStyle = colorScheme.accent; // Set the stroke color
        ctx.stroke(); // Apply the stroke
    }

    /**
     * Draw slope direction indicator circle.
     * @param canvas
     */
    const drawOrientationDirectionCircle = (canvas) => {
        const [width, height] = [canvas.width, canvas.height];
        const origo = {x: width / 2, y: height / 2};

        // Smaller circle parameters
        const radius2 = Math.min(width, height) / 20;
        const startX2 = origo.x;
        const startY2 = origo.y;

        // Draw smaller circle
        let ctx = canvas.getContext('2d');
        const {x, y} = getPositionUsingCurrentDirection(canvas)
        ctx.beginPath();
        ctx.arc(startX2 + x, startY2 - y, radius2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = colorScheme.primary;
        ctx.fill();
    }

    /**
     * Draw slope degrees text onto canvas.
     * @param canvas
     * @param degreesText
     */
    const showSlopeDegrees = (canvas, degreesText) => {
        let ctx = canvas.getContext('2d');
        const [width, height] = [canvas.width, canvas.height];
        ctx.fillStyle = colorScheme.text; // Set the text color
        ctx.font = '60px Arial'; // Set the font size and family
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
        ctx.fillText(degreesText + ' °', 0.5 * width, height / 2);
    }

    useEffect(() => {
        drawSpiritLevel(canvasRef);
    }, [canvasRef, slopeAndOrientation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Vatupassi</Text>
            </View>
            <View style={styles.padding}/>
            <Canvas ref={canvasRef} style={{...styles.canvas}}/>
            <View style={styles.padding}/>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>FUBAR</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        margin: 0,
    },
    canvas: {
        marginTop: "auto",
        marginBottom: "auto",
        backgroundColor: colorScheme.background,
    },
    padding: {
        height:20,
    },
    banner: {
        backgroundColor: colorScheme.primary,
        width: "100%",
        alignItems: "center",
    },
    bannerText: {
        fontSize: 32, // Increase the font size
        color: colorScheme.lightText, // Set the text color
        padding: 16,
        width: "100%",
        textAlign: 'center',
    },
    // bottomText: {
    //     fontSize: 24, // Increase the font size
    //     fontWeight: 'bold',
    //     color: colorScheme.text // Make the text bold
    // },
    safeArea: {
        height:'100%',
        backgroundColor: colorScheme.background
    }

});

export default MainScreen;