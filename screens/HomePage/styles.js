import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";

const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contain: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    container: {
        backgroundColor: "#fff",
        width,
        height,
        flex: 1
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    mapView: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width,
        height,
        flex: 18
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    tabbar: {
        backgroundColor: "white",
        height: 40,

    },
    tab: {
        width: 100
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    methodItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginTop: 10,
        marginBottom: 5
    },

})