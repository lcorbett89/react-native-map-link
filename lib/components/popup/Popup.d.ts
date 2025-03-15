import React from 'react';
import type { ImageStyle, ModalProps, ViewStyle, TextStyle } from 'react-native';
import type { MapId, ShowLocationProps } from '../../type';
export interface PopupProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    showHeader?: boolean;
    customHeader?: React.ReactNode;
    customFooter?: React.ReactNode;
    onAppPressed: (app: MapId) => void;
    onCancelPressed: () => void;
    style?: {
        container?: ViewStyle;
        modalView?: ViewStyle;
        itemContainer?: ViewStyle;
        image?: ImageStyle;
        itemText?: TextStyle;
        headerContainer?: ViewStyle;
        titleText?: TextStyle;
        subtitleText?: TextStyle;
        cancelButtonContainer?: ViewStyle;
        cancelButtonText?: TextStyle;
        separatorStyle?: ViewStyle;
        activityIndicatorContainer?: ViewStyle;
    };
    modalProps?: ModalProps;
    options: ShowLocationProps;
}
export declare const Popup: React.FC<PopupProps>;
