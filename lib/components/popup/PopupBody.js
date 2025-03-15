"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const PopupItem_1 = __importDefault(require("./PopupItem"));
const PopupSeparator_1 = __importDefault(require("./PopupSeparator"));
const PopupFlatList_1 = __importDefault(require("./PopupFlatList"));
const PopupBody = ({ isLoading, style: { activityIndicatorContainer: styleActivityIndicatorContainer, separatorStyle: styleSeparatorStyle, itemContainer: styleItemContainer, image: styleImage, itemText: styleItemText, }, apps, onAppPressed, titles, }) => {
    if (isLoading) {
        return (<react_native_1.ActivityIndicator style={[
                styles.activityIndicatorContainer,
                styleActivityIndicatorContainer,
            ]}/>);
    }
    return (<PopupFlatList_1.default separator={<PopupSeparator_1.default style={{ separatorStyle: styleSeparatorStyle }}/>} data={apps} renderItem={({ item }) => (<PopupItem_1.default style={{
                itemContainer: styleItemContainer,
                image: styleImage,
                itemText: styleItemText,
            }} item={item} onAppPressed={onAppPressed} titles={titles}/>)} keyExtractor={(item) => item}/>);
};
exports.default = PopupBody;
const styles = react_native_1.StyleSheet.create({
    activityIndicatorContainer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
