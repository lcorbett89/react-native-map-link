import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { MapId } from '../../type';
declare const PopupBody: ({ isLoading, style: { activityIndicatorContainer: styleActivityIndicatorContainer, separatorStyle: styleSeparatorStyle, itemContainer: styleItemContainer, image: styleImage, itemText: styleItemText, }, apps, onAppPressed, titles, }: {
    isLoading: boolean;
    style: {
        activityIndicatorContainer?: ViewStyle;
        separatorStyle?: ViewStyle;
        itemContainer?: ViewStyle;
        image?: ImageStyle;
        itemText?: TextStyle;
    };
    apps: MapId[];
    onAppPressed: (app: MapId) => void;
    titles: Record<string, string>;
}) => React.JSX.Element;
export default PopupBody;
