import { View,Text, Image, Modal, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React, { useState } from 'react';
import styles from "./MenuModal.module.css";


const MenuModal = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    }
    const handleBackdropPress = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles1.container}>
            <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles1.button}>
                <Text>Open Modal</Text>
            </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible}>
                <TouchableWithoutFeedback onPress={handleBackdropPress}>
                    <View style={styles1.backdrop} />
                </TouchableWithoutFeedback>
            
                <View style = {styles.outer_box}>
                    <View style = {styles.header}>
                        <Text style={styles.heading}>Today's Menu</Text>
                        <Text style = {styles.cancel_button}>X</Text>
                    </View>
            
                    <View style = {styles.menu}>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Breakfast.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>Aloo Paratha, curd</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Lunch.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>Chicken Biryani, Raita, Veg pulav, Papad, Curry</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Snacks.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>Tea/Coffee, Pasta</Text>
                        </View>
                        <View style = {styles.menuItem}>
                            <Image source={require("./../assets/Dinner.png")} style = {styles.menuIcon}/>
                            <Text style = {styles.menuDescription}>Shahi panneer, Chicken biryani, raita, veg pulav, papad, curry</Text>
                        </View>
                    </View>
                </View>
            </Modal>
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
export default MenuModal;