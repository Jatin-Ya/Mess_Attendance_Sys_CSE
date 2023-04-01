import { View,Text } from "react-native";

const MenuModal = () => {
    return (
        <View style = {{
            position: "absolute",
            left: "0%",
            right: "0%",
            top: "0%",
            bottom: "0%",
            background: "#FFFFFF",
            boxShadow: "0px 8px 24px rgba(0, 22, 78, 0.15)",
            bordeRadius: "8px"
            }}>
                <Text
                    style = {{
                        width: "106px",
                        height: "24px",
                        fontFamily: 'Maven Pro',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "24px",

                        /* identical to box height, or 150% */
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: "0.25px",

                        /* Neutral/Neutral */
                        color: "#00164E",


                        /* Inside auto layout */
                        flex: "none",
                        order: 0,
                        flexGrow: 0
                    }}
                >Today's Menu</Text>
        </View>
    )
}

export default MenuModal;