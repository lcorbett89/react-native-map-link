"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const PopupFlatList = ({ separator, data, renderItem, keyExtractor, }) => {
    return (<react_native_1.FlatList ItemSeparatorComponent={() => separator} data={data} renderItem={renderItem} keyExtractor={keyExtractor}/>);
};
exports.default = PopupFlatList;
