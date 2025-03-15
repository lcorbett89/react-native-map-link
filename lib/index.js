"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApps = exports.showLocation = exports.Popup = void 0;
const react_native_1 = require("react-native");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
var Popup_1 = require("./components/popup/Popup");
Object.defineProperty(exports, "Popup", { enumerable: true, get: function () { return Popup_1.Popup; } });
const showLocation = async ({ latitude, longitude, address, sourceLatitude, sourceLongitude, appleIgnoreLatLon, alwaysIncludeGoogle, googleForceLatLon, googlePlaceId, title: customTitle, app: customApp, dialogTitle: customDialogTitle, dialogMessage: customDialogMessage, cancelText: customCancelText, appsWhiteList: customAppsWhiteList, appsBlackList: customAppsBlackList, appTitles, naverCallerName, directionsMode, }) => {
    const prefixes = (0, constants_1.generatePrefixes)({
        alwaysIncludeGoogle,
        naverCallerName,
    });
    (0, utils_1.checkOptions)({
        latitude,
        longitude,
        address,
        googleForceLatLon,
        googlePlaceId,
        title: customTitle,
        app: customApp,
        prefixes,
        appTitles,
        appsWhiteList: customAppsWhiteList,
    });
    let useSourceDestiny = false;
    let sourceLat;
    let sourceLng;
    let sourceLatLng;
    let fullAddress;
    if (sourceLatitude != null && sourceLongitude != null) {
        useSourceDestiny = true;
        sourceLat =
            typeof sourceLatitude === 'string'
                ? parseFloat(sourceLatitude)
                : sourceLatitude;
        sourceLng =
            typeof sourceLongitude === 'string'
                ? parseFloat(sourceLongitude)
                : sourceLongitude;
        sourceLatLng = `${sourceLat},${sourceLng}`;
    }
    if (address) {
        fullAddress = encodeURIComponent(address);
    }
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    const latlng = `${lat},${lng}`;
    const title = customTitle && customTitle.length ? customTitle : null;
    const encodedTitle = encodeURIComponent(title ?? '');
    let app = customApp && customApp.length ? customApp : null;
    const dialogTitle = customDialogTitle && customDialogTitle.length
        ? customDialogTitle
        : 'Open in Maps';
    const dialogMessage = customDialogMessage && customDialogMessage.length
        ? customDialogMessage
        : 'What app would you like to use?';
    const cancelText = customCancelText && customCancelText.length ? customCancelText : 'Cancel';
    const appsWhiteList = customAppsWhiteList && customAppsWhiteList.length
        ? customAppsWhiteList
        : null;
    const appsBlackList = customAppsBlackList && customAppsBlackList.length
        ? customAppsBlackList
        : null;
    if (!app) {
        app = await (0, utils_1.askAppChoice)({
            dialogTitle,
            dialogMessage,
            cancelText,
            appsWhiteList,
            appsBlackList,
            prefixes,
            appTitles: (0, constants_1.generateTitles)(appTitles),
        });
    }
    const url = (0, utils_1.generateMapUrl)({
        app,
        directionsMode,
        appleIgnoreLatLon,
        googleForceLatLon,
        googlePlaceId,
        naverCallerName,
        lat,
        lng,
        latlng,
        sourceLat,
        sourceLng,
        sourceLatLng,
        address: fullAddress,
        title,
        encodedTitle,
        prefixes,
        useSourceDestiny,
    });
    if (url !== '') {
        return react_native_1.Linking.openURL(url).then(() => Promise.resolve(app));
    }
};
exports.showLocation = showLocation;
async function getApps({ alwaysIncludeGoogle, appsWhiteList, appsBlackList, appTitles, naverCallerName, ...rest }) {
    let apps = await (0, utils_1.getAvailableApps)((0, constants_1.generatePrefixes)({ alwaysIncludeGoogle, naverCallerName }));
    if (appsWhiteList && appsWhiteList.length) {
        (0, utils_1.checkNotSupportedApps)(appsWhiteList);
        apps = apps.filter((appName) => appsWhiteList.includes(appName));
    }
    if (appsBlackList && appsBlackList.length) {
        apps = apps.filter((appName) => !appsBlackList.includes(appName));
    }
    const titles = (0, constants_1.generateTitles)({ ...appTitles });
    async function open(app) {
        return (0, exports.showLocation)({
            ...rest,
            app,
            alwaysIncludeGoogle,
            appsWhiteList,
            appsBlackList,
            appTitles,
            naverCallerName,
        });
    }
    const list = [];
    for (const app of apps) {
        list.push({
            id: app,
            name: titles[app],
            icon: constants_1.icons[app],
            open: () => open(app),
        });
    }
    return list;
}
exports.getApps = getApps;
