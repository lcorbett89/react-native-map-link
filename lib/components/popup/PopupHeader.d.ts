import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
declare const PopupHeader: ({ showHeader, customHeader, style: { headerContainer: styleHeaderContainer, titleText: styleTitleText, subtitleText: styleSubtitleText, }, options, }: {
    showHeader: boolean;
    customHeader?: React.ReactNode;
    style: {
        headerContainer?: ViewStyle;
        titleText?: TextStyle;
        subtitleText?: TextStyle;
    };
    options: {
        dialogTitle?: string | null;
        dialogMessage?: string | null;
    };
}) => string | number | true | Iterable<React.ReactNode> | React.JSX.Element | null;
export default PopupHeader;
