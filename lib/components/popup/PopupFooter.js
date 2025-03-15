"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const PopupFooter = ({ customFooter, onCancelPressed, style: { cancelButtonContainer: styleCancelButtonContainer, cancelButtonText: styleCancelButtonText, }, options, }) => {
    if (customFooter) {
        return customFooter;
    }
    return (<react_native_1.TouchableOpacity style={styleCancelButtonContainer} onPress={onCancelPressed}>
      <react_native_1.Text style={styleCancelButtonText}>
        {options.cancelText ? options.cancelText : 'Cancel'}
      </react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
exports.default = PopupFooter;
