import React, { useState, useEffect } from 'react';
import Constants from '../config/Constants';

import currency from './currency';
import storage from './storage';

export const AppContext = React.createContext();

const PRICE_SOURCE = Constants.PRICE_SOURCE

const AppContextProvider = ({ children }) => {
    const [preferredFiatCurrency, setPreferredFiatCurrency] = useState(currency.defaultCurrency);
    const [preferredBitcoinUnit, setPreferredBitcoinUnit] = useState();
    const [latestPrice, setLatestPrice] = useState({});
    const [totalWalletBalance, setTotalWalletBalance] = useState(0);
    const [showPriceCardInHomeScreen, setShowPriceCardInHomeScreen] = useState(true);
    const [showBiometrics, setShowBiometrics] = useState(false);


    useEffect(() => {
        getPreferredCurrency();
        getPreferredBitcoinUnit();
        getPriceCardDisplayStatus();
        getBiometricsStatus();
    }, []);

    const getPreferredCurrency = async () => {
        const preferredCurrency = await currency.getPreferredCurrency();
        setPreferredFiatCurrency(preferredCurrency);
    }

    const setPreferredCurrency = () => {
        getPreferredCurrency();
    }

    const getPreferredBitcoinUnit = async () => {
        const preferredBtcUnit = await currency.getPreferredBitcoinDenomination();
        setPreferredBitcoinUnit(preferredBtcUnit);
    }

    const setPreferredBitcoinDenomination = () => {
        getPreferredBitcoinUnit();
    }

    const setPriceCardDisplayStatus = async (displayStatus) => {
        setShowPriceCardInHomeScreen(displayStatus);
        return await storage.storeItem(Constants.PRICE_CARD_DISPLAY_STATUS, displayStatus);
    }

    const getPriceCardDisplayStatus = async () => {
        const status = await storage.getItem(Constants.PRICE_CARD_DISPLAY_STATUS);
        if (!status) {
            setShowPriceCardInHomeScreen(true);
            return true;
        }
        setShowPriceCardInHomeScreen(status);
        return status;
    }

    const setBiometricsStatus = async (displayStatus) => {
        setShowBiometrics(displayStatus);
        return await storage.storeItem(Constants.BIOMETRICS_DISPLAY_STATUS, displayStatus);
    }

    const getBiometricsStatus = async () => {
        const status = await storage.getItem(Constants.BIOMETRICS_DISPLAY_STATUS);

        if (!status) {
            setShowBiometrics(false);
            return false;
        }
        setShowBiometrics(status);
        return status;
    }

    return (
        <AppContext.Provider value={
            {
                preferredFiatCurrency,
                setPreferredCurrency,
                getPreferredCurrency,
                totalWalletBalance,
                setTotalWalletBalance,
                setLatestPrice,
                latestPrice,
                PRICE_SOURCE,
                preferredBitcoinUnit,
                setPreferredBitcoinDenomination,
                setPriceCardDisplayStatus,
                getPriceCardDisplayStatus,
                showPriceCardInHomeScreen,
                setBiometricsStatus,
                showBiometrics
            }
        }>{children}</AppContext.Provider>
    )
}

export default AppContextProvider;