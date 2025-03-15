import React from 'react';
import type { ListRenderItem } from 'react-native';
import type { MapId } from '../../type';
declare const PopupFlatList: ({ separator, data, renderItem, keyExtractor, }: {
    separator: React.ReactNode;
    data: MapId[];
    renderItem: ListRenderItem<MapId>;
    keyExtractor: (item: MapId) => string;
}) => React.JSX.Element;
export default PopupFlatList;
