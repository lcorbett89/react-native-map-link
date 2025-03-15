import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { MapId } from '../../type';
declare const PopupItem: ({ item, style: { itemContainer: styleItemContainer, image: styleImage, itemText: styleItemText, }, onAppPressed, titles, }: {
    item: MapId;
    style: {
        itemContainer?: ViewStyle;
        image?: ImageStyle;
        itemText?: TextStyle;
    };
    onAppPressed: (app: MapId) => void;
    titles: Record<MapId, string>;
}) => React.JSX.Element;
export default PopupItem;
