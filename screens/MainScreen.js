import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import React, {useRef, useEffect,useReducer} from 'react';
//import Canvas from 'react-native-canvas';
import {SafeAreaView} from 'react-native-safe-area-context';
import colorScheme from "../styles/colorScheme";
import { Canvas, Circle, Group, Text as SkiaText, useFont, matchFont, Skia } from "@shopify/react-native-skia";

import vatuHook from "../hooks/vatuHook";

const fontFamily = Platform.select({ ios: "Helvetica", default: "sans-serif" });
const fontStyle = {
  fontFamily,
  fontSize: 60,
  fontStyle: "normal",
  fontWeight: "normal",
};
const font = matchFont(fontStyle);

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const textXOffset = 0.15*windowDimensions.width;
const textYOffset = 20;

const MainScreen = () => {
    const slopeAndOrientation = vatuHook();
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
        return Math.min(width, height) / 2.5;
    }

    /**
     * Calculate small indicator circle coordinates from direction given by useSpiritLevel-hook.
     * @param width width of the canvas
     * @param height height of the canvas
     * @returns {{x: number, y: number}}
     */
    const getPositionUsingCurrentDirection = (width,height) => {
        const direction = slopeAndOrientation.direction; //direction in radians
        const xVal = Math.cos(direction) * getRadius(width, height);
        const yVal = Math.sin(direction) * getRadius(width, height);
        return {x: xVal, y: yVal};
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Vatupassi</Text>
            </View>
            <View style={styles.padding}/>
            <Canvas style={{...styles.canvas}}>
                <Group>
                    <Circle  // Rim
                        cx={dimensions.window.width / 2}
                        cy={dimensions.window.width / 2}
                        r={getRadius(dimensions.window.width, dimensions.window.width)+10}
                        color={colorScheme.accent}
                    />
                    <Circle  // Inner circle
                        cx={dimensions.window.width / 2}
                        cy={dimensions.window.width / 2}
                        r={getRadius(dimensions.window.width, dimensions.window.width) - 10}
                        color={colorScheme.innerCircle}
                    />
                    <Circle // Indicator circle
                        cx={dimensions.window.width / 2 + getPositionUsingCurrentDirection(dimensions.window.width, dimensions.window.width).x}
                        cy={dimensions.window.width / 2 + getPositionUsingCurrentDirection(dimensions.window.width, dimensions.window.width).y}
                        r={Math.min(dimensions.window.width, dimensions.window.width) / 20}
                        color={colorScheme.primary}
                    />
                </Group>
                <SkiaText x={dimensions.window.width / 2 - textXOffset} y={dimensions.window.width / 2 + textYOffset} text={slopeAndOrientation.combinedAngle + "°"}  font={font}/>
            </Canvas>
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
        width: windowDimensions.width,
        height: windowDimensions.width,
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
    safeArea: {
        height:'100%',
        backgroundColor: colorScheme.background
    }

});

export default MainScreen;