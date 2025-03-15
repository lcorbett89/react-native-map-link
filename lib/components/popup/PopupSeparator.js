"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const constants_1 = require("../../constants");
const PopupSeparator = ({ style: { separatorStyle: styleSeparator }, }) => {
    return <react_native_1.View style={[styles.separatorStyle, styleSeparator]}/>;
};
exports.default = PopupSeparator;
const styles = react_native_1.StyleSheet.create({
    separatorStyle: {
        flex: 1,
        height: 1,
        backgroundColor: constants_1.colorsPopup.lightBlue,
    },
});
