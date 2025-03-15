import type { MapId } from './type';
export declare const isIOS: boolean;
export declare const generatePrefixes: ({ alwaysIncludeGoogle, naverCallerName, }: {
    alwaysIncludeGoogle?: boolean | undefined;
    naverCallerName?: string | undefined;
}) => Record<MapId, string>;
export declare const prefixForGoogleMaps: (alwaysIncludeGoogle?: boolean) => string;
export declare const generateTitles: (titles?: Record<string, string>) => Record<string, string>;
export declare const icons: Record<string, number>;
export declare const appKeys: string[];
export declare const colorsPopup: {
    black: string;
    gray: string;
    lightGray: string;
    lightBlue: string;
};
