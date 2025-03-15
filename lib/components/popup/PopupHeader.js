"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const constants_1 = require("../../constants");
const PopupHeader = ({ showHeader = true, customHeader, style: { headerContainer: styleHeaderContainer, titleText: styleTitleText, subtitleText: styleSubtitleText, }, options, }) => {
    if (!showHeader) {
        return null;
    }
    if (customHeader) {
        return customHeader;
    }
    const dialogTitle = options.dialogTitle
        ? options.dialogTitle
        : 'Open in Maps';
    const dialogMessage = options.dialogMessage
        ? options.dialogMessage
        : 'What app would you like to use?';
    return (<react_native_1.View style={[styles.headerContainer, styleHeaderContainer]}>
      <react_native_1.Text style={[styles.titleText, styleTitleText]}>{dialogTitle}</react_native_1.Text>
      {dialogMessage ? (<react_native_1.Text style={[styles.subtitleText, styleSubtitleText]}>
          {dialogMessage}
        </react_native_1.Text>) : null}
    </react_native_1.View>);
};
exports.default = PopupHeader;
const styles = react_native_1.StyleSheet.create({
    headerContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: constants_1.colorsPopup.lightBlue,
        padding: 15,
    },
    titleText: {
        fontSize: 16,
        textAlign: 'center',
        color: constants_1.colorsPopup.black,
    },
    subtitleText: {
        fontSize: 12,
        color: constants_1.colorsPopup.lightGray,
        textAlign: 'center',
        marginTop: 10,
    },
});
