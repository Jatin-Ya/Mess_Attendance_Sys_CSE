import { View,Text, Image, Modal, TouchableWithoutFeedback, StyleSheet, Pressable, TextInput, Button } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import axios from "./../utils/axios";

import MenuCard from "./../components/MenuCard";

const WeeklyMenu = () => {

    const [menu, setMenu] = useState([]);
    const fetchMenu = async () => {
        try {
            const response = await axios.get("/api/menu/getMenu");
            const [resMenu, common] = response.data.menu;
            const date = new Date();
            let today = date.getDay();
            resMenu[today].day = "Today";
            let menuOrder = [];
            let i = 0;
            while(i < 7) {
                menuOrder.push(resMenu[today]);
                today = (today+1)%7;
                i++;
            }
            setMenu(menuOrder);
            console.log(resMenu);
        } catch(err) {
            Alert.alert("Error", "Failed to get Menu Details");
        }
    }


    useEffect(() => {
        fetchMenu();
    }, [])

    const MenuCards = menu.map((oneDayMenu, id) => {
        return (<MenuCard menu = {oneDayMenu} />)
    })
    return (
        <MenuCards />
    )
}

export default WeeklyMenu;