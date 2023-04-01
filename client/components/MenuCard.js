import { View,Text, Image, Modal, TouchableWithoutFeedback, StyleSheet, Pressable } from "react-native";
import React, { useState } from 'react';
import styles from "./MenuModal.module.css";


const MenuCard = (props) => {

    const [modalVisible, setModalVisible] = useState(true);
    
    const handleBackdropPress = () => {
        // setModalVisible(false);
        props.setDisplayModal(false);
    };

    

    return (
        <View style={styles1.container}>
                <View style = {styles.outer_box}>
                        <View style = {styles.header} >
                            <Text style={styles.heading}>Today's Menu</Text>
                        </View>
                    
            
                    <View style = {styles.menu}>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Breakfast.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>{props.menu.breakfast}</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Lunch.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>{props.menu.lunch}</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Snacks.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>{props.menu.snacks}</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Dinner.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>{props.menu.dinner}</Text>
                        </View>
                    </View>
                </View>
        </View>
        
    )
}

const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 16,
      backgroundColor: 'blue',
      borderRadius: 8,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex:-1
    },
    modal: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
    },
  });
export default MenuCard;