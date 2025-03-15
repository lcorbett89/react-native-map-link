import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
declare const PopupFooter: ({ customFooter, onCancelPressed, style: { cancelButtonContainer: styleCancelButtonContainer, cancelButtonText: styleCancelButtonText, }, options, }: {
    customFooter?: React.ReactNode;
    onCancelPressed: () => void;
    style: {
        cancelButtonContainer?: ViewStyle;
        cancelButtonText?: TextStyle;
    };
    options: {
        cancelText?: string | null;
    };
}) => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
export default PopupFooter;
