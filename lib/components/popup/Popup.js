"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const PopupFooter_1 = __importDefault(require("./PopupFooter"));
const PopupHeader_1 = __importDefault(require("./PopupHeader"));
const PopupBody_1 = __importDefault(require("./PopupBody"));
const __1 = require("../..");
const SCREEN_HEIGHT = react_native_1.Dimensions.get('screen').height;
const Popup = ({ isVisible, showHeader = true, customHeader, customFooter, onAppPressed, onCancelPressed, style = {}, modalProps, options, setIsVisible, }) => {
    const [apps, setApps] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [titles, setTitles] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const loadApps = async () => {
            let appsData = await (0, utils_1.getAvailableApps)((0, constants_1.generatePrefixes)({
                alwaysIncludeGoogle: options.alwaysIncludeGoogle,
                naverCallerName: options.naverCallerName,
            }));
            if (options.appsWhiteList && options.appsWhiteList.length) {
                (0, utils_1.checkNotSupportedApps)(options.appsWhiteList);
                appsData = appsData.filter((appName) => options.appsWhiteList?.includes(appName));
            }
            if (options.appsBlackList && options.appsBlackList.length) {
                appsData = appsData.filter((appName) => !options.appsBlackList?.includes(appName));
            }
            setApps(appsData);
            setIsLoading(false);
        };
        loadApps();
        setTitles((0, constants_1.generateTitles)(options.appTitles));
    }, [
        options.alwaysIncludeGoogle,
        options.appTitles,
        options.appsWhiteList,
        options.appsBlackList,
        options.naverCallerName,
    ]);
    const _onAppPressed = (app) => {
        (0, __1.showLocation)({
            ...options,
            app,
        });
        onAppPressed(app);
    };
    return (<react_native_1.Modal animationType="slide" onRequestClose={() => {
            setIsVisible(false);
        }} transparent={true} visible={isVisible} {...modalProps}>
      <react_native_1.View style={[styles.container, style.container]}>
        <react_native_1.View style={[styles.modalView, style.modalView]}>
          <PopupHeader_1.default showHeader={showHeader} customHeader={customHeader} style={style} options={options}/>
          <PopupBody_1.default apps={apps} isLoading={isLoading} style={style} titles={titles} onAppPressed={_onAppPressed}/>
          <PopupFooter_1.default customFooter={customFooter} onCancelPressed={onCancelPressed} style={style} options={options}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
exports.Popup = Popup;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        maxHeight: SCREEN_HEIGHT * 0.6,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
