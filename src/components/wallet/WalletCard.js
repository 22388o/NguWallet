import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../config/Colors';
import common from '../../config/common';
import Localize from '../../config/Localize';
import unitConverter from '../../helpers/unitConverter';
import walletDiscovery from '../../helpers/walletDiscovery';
import { AppContext } from '../../ngu_modules/appContext';

function WalletCard({ onPress, wallet, shouldRefreshBalance }) {
    const [balance, setBalance] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const { preferredBitcoinUnit } = useContext(AppContext);

    const getBalance = async (shouldRefreshBalance) => {
        if (!shouldRefreshBalance) {
            return;
        }
        if (wallet) {
            setIsFetching(true);

            const walletClass = await walletDiscovery.getWalletInstance(wallet);
            const walletBalance = await walletClass.fetchBalance(wallet.id);
            console.log(walletBalance)
            const btc = unitConverter.convertToPreferredBTCDenominator(walletBalance, preferredBitcoinUnit);
            setBalance(btc);
            setIsFetching(false);
        }
    }
    useEffect(() => {
        getBalance(shouldRefreshBalance);
    }, [shouldRefreshBalance])

    const btc = unitConverter.convertToPreferredBTCDenominator(wallet.balance, preferredBitcoinUnit);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container]}>
                <View style={styles.detailsContainer}>
                    <View style={styles.textType}>
                        <Text style={[styles.text, styles.bottomRowText]}>{wallet.type}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.text}>{wallet.name}</Text>

                </View>
                <View style={[styles.balanceContainer]}>
                    <Text style={[styles.price, styles.textAlign, styles.bottomRowText]}>{preferredBitcoinUnit?.title}</Text>
                    <Text numberOfLines={1} style={[styles.price, styles.textAlign]}>
                        {isFetching ? Localize.getLabel('updating') : btc}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 1,
        borderColor: Colors.textGray,
        borderWidth: 0.3,
        borderRightColor: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },

    detailsContainer: {
        justifyContent: 'center',
        width: '60%'
    },
    balanceContainer: {
        flex: 1,
        marginRight: 0,
        justifyContent: 'center',
        padding: 2,

    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 8,
        paddingBottom: 8,
    },
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 8,
        paddingBottom: 8,
    },
    textType: {
        borderRadius: 5,
    },
    textAlign: {
        textAlign: 'right'
    },
    bottomRowText: {
        color: '#89888f',
        //fontWeight: '600',
    }
});

export default WalletCard;