import { GetAppsProps, GetAppsResponse, MapId, ShowLocationProps } from './type';
export type { DirectionMode, GetAppsProps, GetAppsResponse, MapId, SharedOptions, ShowLocationProps, } from './type';
export { Popup } from './components/popup/Popup';
export type { PopupProps } from './components/popup/Popup';
export declare const showLocation: ({ latitude, longitude, address, words, sourceLatitude, sourceLongitude, appleIgnoreLatLon, alwaysIncludeGoogle, googleForceLatLon, googlePlaceId, title: customTitle, app: customApp, dialogTitle: customDialogTitle, dialogMessage: customDialogMessage, cancelText: customCancelText, appsWhiteList: customAppsWhiteList, appsBlackList: customAppsBlackList, appTitles, naverCallerName, directionsMode, }: ShowLocationProps) => Promise<MapId | null | undefined>;
export declare function getApps({ alwaysIncludeGoogle, appsWhiteList, appsBlackList, appTitles, naverCallerName, ...rest }: GetAppsProps): Promise<GetAppsResponse[]>;
