"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const constants_1 = require("../../constants");
const PopupItem = ({ item, style: { itemContainer: styleItemContainer, image: styleImage, itemText: styleItemText, }, onAppPressed, titles, }) => {
    return (<react_native_1.TouchableOpacity key={item} style={[styles.itemContainer, styleItemContainer]} onPress={() => onAppPressed(item)}>
      <react_native_1.View>
        <react_native_1.Image style={[styles.image, styleImage]} source={constants_1.icons[item]}/>
      </react_native_1.View>
      <react_native_1.Text style={[styles.itemText, styleItemText]}>{titles[item]}</react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
exports.default = PopupItem;
const styles = react_native_1.StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: constants_1.colorsPopup.black,
        marginLeft: 15,
    },
});
