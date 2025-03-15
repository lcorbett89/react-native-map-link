"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMapUrl = exports.checkOptions = exports.getDirectionsModeSygic = exports.getDirectionsModeGoogleMaps = exports.getDirectionsModeAppleMaps = exports.askAppChoice = exports.checkNotSupportedApps = exports.getNotSupportedApps = exports.isSupportedApp = exports.isAppInstalled = exports.getAvailableApps = void 0;
const react_native_1 = require("react-native");
const constants_1 = require("./constants");
const getAvailableApps = async (prefixes) => {
    const availableApps = [];
    await Promise.all(Object.keys(prefixes).map(async (app) => {
        try {
            const isInstalled = await (0, exports.isAppInstalled)(app, prefixes);
            if (isInstalled) {
                availableApps.push(app);
            }
        }
        catch (error) {
            console.error(`Error checking if ${app} is installed:`, error);
        }
    }));
    return availableApps;
};
exports.getAvailableApps = getAvailableApps;
const isAppInstalled = (app, prefixes) => {
    return new Promise((resolve) => {
        if (!(app in prefixes)) {
            return resolve(false);
        }
        react_native_1.Linking.canOpenURL(prefixes[app])
            .then((result) => {
            resolve(!!result);
        })
            .catch(() => resolve(false));
    });
};
exports.isAppInstalled = isAppInstalled;
const isSupportedApp = (app) => {
    return constants_1.appKeys.includes(app);
};
exports.isSupportedApp = isSupportedApp;
const getNotSupportedApps = (apps) => {
    return apps.filter((app) => !(0, exports.isSupportedApp)(app));
};
exports.getNotSupportedApps = getNotSupportedApps;
const checkNotSupportedApps = (apps) => {
    const notSupportedApps = (0, exports.getNotSupportedApps)(apps);
    if (notSupportedApps.length) {
        throw new MapsException(`appsWhiteList [${notSupportedApps}] are not supported apps, please provide some of the supported apps [${constants_1.appKeys}]`);
    }
};
exports.checkNotSupportedApps = checkNotSupportedApps;
const askAppChoice = ({ dialogTitle, dialogMessage, cancelText, appsWhiteList, appsBlackList, prefixes, appTitles, }) => {
    return new Promise(async (resolve) => {
        let availableApps = await (0, exports.getAvailableApps)(prefixes);
        if (appsWhiteList && appsWhiteList.length) {
            availableApps = availableApps.filter((appName) => appsWhiteList.includes(appName));
        }
        if (appsBlackList && appsBlackList.length) {
            availableApps = availableApps.filter((appName) => !appsBlackList.includes(appName));
        }
        if (availableApps.length < 2) {
            return resolve(availableApps[0] || null);
        }
        if (constants_1.isIOS) {
            const options = availableApps.map((app) => appTitles?.[app]);
            options?.push(cancelText || '');
            react_native_1.ActionSheetIOS.showActionSheetWithOptions({
                title: dialogTitle || '',
                message: dialogMessage || '',
                options: options || [],
                cancelButtonIndex: options ? options.length - 1 : 0,
            }, (buttonIndex) => {
                if (buttonIndex === options.length - 1) {
                    return resolve(null);
                }
                return resolve(availableApps[buttonIndex]);
            });
            return;
        }
        const options = availableApps.map((app) => ({
            text: appTitles?.[app] || '',
            onPress: () => resolve(app),
        }));
        options.unshift({
            text: cancelText || '',
            onPress: () => resolve(null),
        });
        return react_native_1.Alert.alert(dialogTitle || '', dialogMessage || '', options, {
            cancelable: true,
            onDismiss: () => resolve(null),
        });
    });
};
exports.askAppChoice = askAppChoice;
const getDirectionsModeAppleMaps = (directionsMode) => {
    const modeMap = {
        car: 'd',
        bike: 'b',
        walk: 'w',
        'public-transport': 'r',
    };
    return modeMap[directionsMode || ''] || undefined;
};
exports.getDirectionsModeAppleMaps = getDirectionsModeAppleMaps;
const getDirectionsModeGoogleMaps = (directionsMode) => {
    const modeMap = {
        car: 'driving',
        walk: 'walking',
        'public-transport': 'transit',
        bike: 'bicycling',
    };
    return modeMap[directionsMode || ''] || undefined;
};
exports.getDirectionsModeGoogleMaps = getDirectionsModeGoogleMaps;
const getDirectionsModeSygic = (directionsMode) => {
    const modeMap = {
        car: 'drive',
        walk: 'walk',
        'public-transport': 'show',
        bike: 'show',
    };
    return modeMap[directionsMode || ''] || undefined;
};
exports.getDirectionsModeSygic = getDirectionsModeSygic;
const checkOptions = ({ latitude, longitude, address, words, googleForceLatLon, googlePlaceId, title, app, prefixes, appTitles, appsWhiteList, }) => {
    if (!(latitude && longitude) && !address) {
        throw new MapsException('`latitude` & `longitude` or `address` is required. Both cannot be undefined.');
    }
    if (address && typeof address !== 'string') {
        throw new MapsException('Option `address` should be of type `string`.');
    }
    if (words && typeof words !== 'string') {
        throw new MapsException('Option `words` should be of type `string`.');
    }
    if (title && typeof title !== 'string') {
        throw new MapsException('`title` should be of type `string`.');
    }
    if (googleForceLatLon && typeof googleForceLatLon !== 'boolean') {
        throw new MapsException('Option `googleForceLatLon` should be of type `boolean`.');
    }
    if (googlePlaceId && typeof googlePlaceId !== 'string') {
        throw new MapsException('Option `googlePlaceId` should be of type `string`.');
    }
    if (app && !(app in prefixes)) {
        throw new MapsException('Option `app` should be undefined, null, or one of the following: "' +
            Object.keys(prefixes).join('", "') +
            '".');
    }
    if (appsWhiteList && appsWhiteList.length) {
        (0, exports.checkNotSupportedApps)(appsWhiteList);
    }
    if (appTitles && typeof appTitles !== 'object') {
        throw new MapsException('Option `appTitles` should be of type `object`.');
    }
};
exports.checkOptions = checkOptions;
const generateMapUrl = ({ app, directionsMode, appleIgnoreLatLon, googleForceLatLon, googlePlaceId, naverCallerName, lat, lng, latlng, sourceLat, sourceLng, sourceLatLng, address, words, title, encodedTitle, prefixes, useSourceDestiny, }) => {
    let url = '';
    switch (app) {
        case 'apple-maps':
            const appleDirectionMode = (0, exports.getDirectionsModeAppleMaps)(directionsMode);
            url = prefixes['apple-maps'];
            if (address) {
                url = `${url}?address=${address}`;
            }
            else {
                if (useSourceDestiny || directionsMode) {
                    url = `${url}?daddr=${latlng}`;
                    url += sourceLatLng ? `&saddr=${sourceLatLng}` : '';
                }
                else if (!appleIgnoreLatLon) {
                    url = `${url}?ll=${latlng}`;
                }
            }
            url +=
                useSourceDestiny || directionsMode || address || !appleIgnoreLatLon
                    ? '&'
                    : '?';
            url += `q=${title ? encodedTitle : 'Location'}`;
            url += appleDirectionMode ? `&dirflg=${appleDirectionMode}` : '';
            break;
        case 'google-maps':
            const googleDirectionMode = (0, exports.getDirectionsModeGoogleMaps)(directionsMode);
            // Always using universal URL instead of URI scheme since the latter doesn't support all parameters (#155)
            if (useSourceDestiny || directionsMode) {
                // Use "dir" as this will open up directions
                url = 'https://www.google.com/maps/dir/?api=1';
                url += sourceLatLng ? `&origin=${sourceLatLng}` : '';
                if (!googleForceLatLon && title) {
                    url += `&destination=${encodedTitle}`;
                }
                else if (!googleForceLatLon && address) {
                    url += `&destination=${address}`;
                }
                else {
                    url += `&destination=${latlng}`;
                }
                url += googlePlaceId ? `&destination_place_id=${googlePlaceId}` : '';
                url += googleDirectionMode ? `&travelmode=${googleDirectionMode}` : '';
            }
            else {
                if (address) {
                    url = `https://www.google.com/maps/search/?api=1&query=${address}`;
                }
                else {
                    // Use "search" as this will open up a single marker
                    url = 'https://www.google.com/maps/search/?api=1';
                    if (!googleForceLatLon && title) {
                        url += `&query=${encodedTitle}`;
                    }
                    else {
                        url += `&query=${latlng}`;
                    }
                    url += googlePlaceId ? `&query_place_id=${googlePlaceId}` : '';
                }
            }
            break;
        case 'citymapper':
            if (address) {
                url = `${prefixes.citymapper}directions?endname=${address}`;
            }
            else {
                url = `${prefixes.citymapper}directions?endcoord=${latlng}`;
                if (title) {
                    url += `&endname=${encodedTitle}`;
                }
                if (useSourceDestiny) {
                    url += `&startcoord=${sourceLatLng}`;
                }
            }
            break;
        case 'uber':
            if (address) {
                url = `${prefixes.uber}?action=setPickup&pickup=my_location&dropoff=${address}`;
            }
            else {
                url = `${prefixes.uber}?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`;
                if (title) {
                    url += `&dropoff[nickname]=${encodedTitle}`;
                }
                url += useSourceDestiny
                    ? `&pickup[latitude]=${sourceLat}&pickup[longitude]=${sourceLng}`
                    : '&pickup=my_location';
            }
            break;
        case 'lyft':
            if (address) {
                url = `${prefixes.lyft}ridetype?id=lyft&destination[address]=${address}`;
            }
            else {
                url = `${prefixes.lyft}ridetype?id=lyft&destination[latitude]=${lat}&destination[longitude]=${lng}`;
                if (useSourceDestiny) {
                    url += `&pickup[latitude]=${sourceLat}&pickup[longitude]=${sourceLng}`;
                }
            }
            break;
        case 'transit':
            if (address) {
                url = `${prefixes.transit}directions?destination=${address}`;
            }
            else {
                url = `${prefixes.transit}directions?to=${latlng}`;
            }
            if (useSourceDestiny) {
                url += `&from=${sourceLatLng}`;
            }
            break;
        case 'truckmap':
            if (address) {
                // Constructed from documentation from https://truckmap.com/solutions/developer
                url = `https://truckmap.com/place/${address}`;
            }
            else {
                url = `https://truckmap.com/place/${lat},${lng}`;
                if (useSourceDestiny) {
                    url = `https://truckmap.com/route/${sourceLat},${sourceLng}/${lat},${lng}`;
                }
            }
            break;
        case 'waze':
            if (address) {
                url = `${prefixes.waze}?q=${address}`;
            }
            else {
                url = `${prefixes.waze}?ll=${latlng}&navigate=yes`;
                if (title) {
                    url += `&q=${encodedTitle}`;
                }
            }
            break;
        case 'yandex':
            if (address) {
                url = `${prefixes.yandex}?text=${address}`;
            }
            else {
                url = `${prefixes.yandex}build_route_on_map?lat_to=${lat}&lon_to=${lng}`;
                if (useSourceDestiny) {
                    url += `&lat_from=${sourceLat}&lon_from=${sourceLng}`;
                }
            }
            break;
        case 'moovit':
            if (address) {
                url = `${prefixes.moovit}?dest_name=${address}`;
            }
            else {
                url = `${prefixes.moovit}?dest_lat=${lat}&dest_lon=${lng}`;
                if (title) {
                    url += `&dest_name=${encodedTitle}`;
                }
                if (useSourceDestiny) {
                    url += `&orig_lat=${sourceLat}&orig_lon=${sourceLng}`;
                }
            }
            break;
        case 'yandex-taxi':
            if (address) {
                throw new MapsException('yandex-taxi does not support passing the address or has not been implemented yet.');
            }
            else {
                url = `${prefixes['yandex-taxi']}route?end-lat=${lat}&end-lon=${lng}&appmetrica_tracking_id=1178268795219780156`;
            }
            break;
        case 'yandex-maps':
            if (address) {
                url = `${prefixes['yandex-maps']}?text=${address}`;
            }
            else {
                url = `${prefixes['yandex-maps']}?pt=${lng},${lat}`;
            }
            break;
        case 'kakaomap':
            if (address) {
                url = `${prefixes.kakaomap}route?ep=${address}`;
            }
            else {
                url = `${prefixes.kakaomap}look?p=${latlng}`;
                if (useSourceDestiny) {
                    url = `${prefixes.kakaomap}route?sp=${sourceLat},${sourceLng}&ep=${latlng}&by=CAR`;
                }
            }
            break;
        case 'tmap':
            if (address) {
                url = `${prefixes.tmap}search?name=${address}`;
            }
            else {
                url = `${prefixes.tmap}viewmap?x=${lng}&y=${lat}`;
                if (useSourceDestiny) {
                    url = `${prefixes.tmap}route?startx=${sourceLng}&starty=${sourceLat}&goalx=${lng}&goaly=${lat}`;
                }
            }
            break;
        case 'mapycz':
            if (address) {
                url = `${prefixes.mapycz}www.mapy.cz/zakladni?q=${address}`;
            }
            else {
                url = `${prefixes.mapycz}www.mapy.cz/zakladni?x=${lng}&y=${lat}&source=coor&id=${lng},${lat}`;
            }
            break;
        case 'maps-me':
            if (address) {
                url = `${prefixes['maps-me']}?q=${address}`;
            }
            else {
                url = `${prefixes['maps-me']}route?sll=${sourceLat},${sourceLng}&saddr= &dll=${lat},${lng}&daddr=${title}&type=vehicle`;
            }
            break;
        case 'osmand':
            if (address) {
                url = `${prefixes.osmand}show_map?addr=${address}`;
            }
            else {
                url = constants_1.isIOS
                    ? `${prefixes.osmand}?lat=${lat}&lon=${lng}`
                    : `${prefixes.osmand}?q=${lat},${lng}`;
            }
            break;
        case 'gett':
            if (address) {
                throw new MapsException('gett does not support passing the address or has not been implemented yet.');
            }
            else {
                url = `${prefixes.gett}order?pickup=my_location&dropoff_latitude=${lat}&dropoff_longitude=${lng}`;
            }
            break;
        case 'navermap':
            if (address) {
                url = `${prefixes.navermap}search?query=${address}`;
            }
            else {
                url = `${prefixes.navermap}map?lat=${lat}&lng=${lng}&appname=${naverCallerName}`;
                if (useSourceDestiny) {
                    url = `${prefixes.navermap}route?slat=${sourceLat}&slng=${sourceLng}&dlat=${lat}&dlng=${lng}&appname=${naverCallerName}`;
                }
            }
            break;
        case 'dgis':
            if (address) {
                url = `${prefixes.dgis}?q=${address}`;
            }
            else {
                url = `${prefixes.dgis}routeSearch/to/${lng},${lat}/go`;
                if (useSourceDestiny) {
                    url = `${prefixes.dgis}routeSearch/to/${lng},${lat}/from/${sourceLng},${sourceLat}/go`;
                }
            }
            break;
        case 'liftago':
            if (address) {
                throw new MapsException('liftago does not support passing the address or has not been implemented yet.');
            }
            else {
                url = `${prefixes.liftago}order?destinationLat=${lat}&destinationLon=${lng}`;
                if (title) {
                    url += `&destinationName=${encodedTitle}`;
                }
                if (useSourceDestiny) {
                    url += `&pickupLat=${sourceLat}&pickupLon=${sourceLng}`;
                }
            }
            break;
        case 'petalmaps':
            if (address) {
                // Got this from this documentation https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/petal-maps-introduction-0000001059189679
                url = `${prefixes.petalmaps}textSearch?text=${address}`;
            }
            else {
                url = `${prefixes.petalmaps}navigation?daddr=${lat},${lng}`;
                if (useSourceDestiny) {
                    url += `&saddr=${sourceLat},${sourceLng}`;
                }
            }
            break;
        case 'sygic':
            const sygicDirectionsMode = (0, exports.getDirectionsModeSygic)(directionsMode);
            if (address) {
                throw new MapsException('sygic does not support passing the address or has not been implemented yet.');
            }
            else {
                url = `${prefixes.sygic}coordinate|${lng}|${lat}|`;
            }
            url += sygicDirectionsMode ? `${sygicDirectionsMode}` : '';
            break;
        case 'w3w':
            // w3w only supports passing the 3 word reference or the current user location
            // https://developer.what3words.com/tutorial/mobile-linking-to-the-what3words-app#supported-uris
            if (words) {
                url = `${prefixes.w3w}show?threewords=${words}`;
            }
            else {
                url = `${prefixes.w3w}show?currentlocation`;
            }
            break;
    }
    return url;
};
exports.generateMapUrl = generateMapUrl;
class MapsException extends Error {
    constructor(message) {
        super(message);
        this.name = 'MapsException';
    }
}
