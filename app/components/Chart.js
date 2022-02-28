import React from 'react';
import { Text, View, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

import Colors from '../config/Colors';

function Chart({ priceHistory, preferredFiatCurrency }) {
    const { width, height } = Dimensions.get("window");

    const wp = (number) => {
        let givenWidth = typeof number === "number" ? number : parseFloat(number);
        return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
    };

    return (
        <View style={styles.container}>
            <LineChart.Provider data={priceHistory}>
                <LineChart
                    width={wp("100%")}
                    height={250}
                    yGutter={25}>
                    <LineChart.Path color={Colors.white} width={2} />
                    <LineChart.CursorCrosshair color={Colors.white} />
                    <LineChart.CursorLine color={Colors.white}>
                        <LineChart.Tooltip
                            position="top"
                        >
                            <LineChart.PriceText
                                style={styles.priceText}
                                format={({ value }) => {
                                    'worklet';
                                    return `${preferredFiatCurrency.symbol}${value} ${preferredFiatCurrency.endPointKey}`;
                                }}
                            />
                            <LineChart.DatetimeText
                                style={styles.dateText}
                                locale={preferredFiatCurrency.locale}
                                options={{
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                }}
                            />
                        </LineChart.Tooltip>
                    </LineChart.CursorLine>
                </LineChart>
            </LineChart.Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 260,
        paddingTop: 30
    },

    priceText: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: '500'
    },
    dateText: {
        color: '#6d767f',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    }
});

export default Chart;