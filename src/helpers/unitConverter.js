import BigNumber from "bignumber.js";

function satoshiToBTC(satoshi) {
    return new BigNumber(satoshi).dividedBy(100000000).toString(10);
}

function satoshiToMBTC(satoshi) {
    return new BigNumber(satoshi).dividedBy(100000).toNumber();
}

function satoshiToBits(satoshi) {
    return new BigNumber(satoshi).dividedBy(100).toNumber();
}

function convertToPreferredBTCDenominator(satoshi, preferredBTCUnit) {
    if (preferredBTCUnit?.name === 'BTC') {
        return satoshiToBTC(satoshi);
    }
    else if (preferredBTCUnit?.name === 'mBTC') {
        return satoshiToMBTC(satoshi);
    }
    else if (preferredBTCUnit?.name === 'BITS') {
        return satoshiToBits(satoshi);
    }
    else {
        return satoshi;
    }
}

function getFiatAmountForBTC(satoshi, fiat) {
    const btc = satoshiToBTC(satoshi);
    const amountInFiat = (btc / 1) * fiat;
    return amountInFiat.toFixed(2);
}

export default {
    convertToPreferredBTCDenominator,
    getFiatAmountForBTC
}