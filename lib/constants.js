"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorsPopup = exports.appKeys = exports.icons = exports.generateTitles = exports.prefixForGoogleMaps = exports.generatePrefixes = exports.isIOS = void 0;
const react_native_1 = require("react-native");
exports.isIOS = react_native_1.Platform.OS === 'ios';
const generatePrefixes = ({ alwaysIncludeGoogle, naverCallerName, }) => {
    return {
        'apple-maps': exports.isIOS ? 'maps://' : 'applemaps://',
        'google-maps': (0, exports.prefixForGoogleMaps)(alwaysIncludeGoogle),
        citymapper: 'citymapper://',
        uber: 'uber://',
        lyft: 'lyft://',
        transit: 'transit://',
        truckmap: 'truckmap://',
        waze: 'waze://',
        yandex: 'yandexnavi://',
        moovit: 'moovit://directions',
        'yandex-maps': 'yandexmaps://maps.yandex.ru/',
        'yandex-taxi': 'yandextaxi://',
        kakaomap: 'kakaomap://',
        tmap: 'tmap://',
        mapycz: exports.isIOS ? 'szn-mapy://' : 'mapycz://',
        'maps-me': 'mapsme://',
        osmand: exports.isIOS ? 'osmandmaps://' : 'osmand.geo://',
        gett: 'gett://',
        navermap: naverCallerName ? 'nmap://' : 'nmap-disabled://',
        dgis: 'dgis://2gis.ru/',
        liftago: 'lftgpas://',
        petalmaps: 'petalmaps://',
        sygic: 'com.sygic.aura://',
        w3w: 'w3w://',
    };
};
exports.generatePrefixes = generatePrefixes;
const prefixForGoogleMaps = (alwaysIncludeGoogle) => {
    return exports.isIOS && !alwaysIncludeGoogle
        ? 'comgooglemaps://'
        : 'https://www.google.com/maps/';
};
exports.prefixForGoogleMaps = prefixForGoogleMaps;
const generateTitles = (titles) => {
    return {
        'apple-maps': 'Apple Maps',
        'google-maps': 'Google Maps',
        citymapper: 'Citymapper',
        uber: 'Uber',
        lyft: 'Lyft',
        transit: 'The Transit App',
        truckmap: 'TruckMap',
        waze: 'Waze',
        yandex: 'Yandex.Navi',
        moovit: 'Moovit',
        'yandex-taxi': 'Yandex Taxi',
        'yandex-maps': 'Yandex Maps',
        kakaomap: 'Kakao Maps',
        tmap: 'TMAP',
        mapycz: 'Mapy.cz',
        'maps-me': 'Maps Me',
        osmand: 'OsmAnd',
        gett: 'Gett',
        navermap: 'Naver Map',
        dgis: '2GIS',
        liftago: 'Liftago',
        petalmaps: 'Petal Maps',
        sygic: 'Sygic',
        w3w: 'What3Words',
        ...(titles || {}),
    };
};
exports.generateTitles = generateTitles;
exports.icons = {
    'apple-maps': require('./images/apple-maps.png'),
    'google-maps': require('./images/google-maps.png'),
    citymapper: require('./images/citymapper.png'),
    uber: require('./images/uber.png'),
    lyft: require('./images/lyft.png'),
    transit: require('./images/transit.png'),
    truckmap: require('./images/truckmap.png'),
    waze: require('./images/waze.png'),
    yandex: require('./images/yandex.png'),
    moovit: require('./images/moovit.png'),
    'yandex-taxi': require('./images/yandex-taxi.png'),
    'yandex-maps': require('./images/yandex-maps.png'),
    kakaomap: require('./images/kakao-map.png'),
    tmap: require('./images/tmap.png'),
    mapycz: require('./images/mapycz.png'),
    'maps-me': require('./images/maps-me.png'),
    osmand: require('./images/osmand.png'),
    gett: require('./images/gett.png'),
    navermap: require('./images/naver-map.png'),
    dgis: require('./images/dgis.png'),
    liftago: require('./images/liftago.png'),
    petalmaps: require('./images/petalmaps.png'),
    sygic: require('./images/sygic.png'),
    w3w: require('./images/w3w.png'),
};
exports.appKeys = Object.keys(exports.icons);
exports.colorsPopup = {
    black: '#464646',
    gray: '#BBC4CC',
    lightGray: '#ACBBCB',
    lightBlue: '#ECF2F8',
};
