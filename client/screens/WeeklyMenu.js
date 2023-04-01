import { View, FlatList, Alert, Text, Image, Modal, TouchableWithoutFeedback, StyleSheet, Pressable, TextInput, Button } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import axios from "./../utils/axios";

import MenuCard from "./../components/MenuCard";

const WeeklyMenu = () => {

    const [menu, setMenu] = useState([]);
    const fetchMenu = async () => {
        try {
            const response = await axios.get("/api/menu/getMenu");
            console.log(response);
            // const [resMenu, common] = response.data.menu;
            // const date = new Date();
            // let today = date.getDay();
            // resMenu[today].day = "Today";
            // let menuOrder = [];
            // let i = 0;
            // while(i < 7) {
            //     menuOrder.push(resMenu[today]);
            //     today = (today+1)%7;
            //     i++;
            // }
            // setMenu(menuOrder);
            console.log(resMenu);
        } catch(err) {
            Alert.alert("Error", "Failed to get Menu Details");
        }
    }


    useEffect(() => {
        // fetchMenu().then().catch(err => console.log(err));
        axios.get("/api/menu/getMenu").then(response => {
            // console.log(response.data.menu);
            const resMenu = response.data.menu;
            // console.log(resMenu);
            const date = new Date();
            let today = date.getDay();
            console.log(today);
            resMenu[today].day = "Today";
            let common = resMenu[7];
            // let menuOrder = [common];
            let menuOrder = [common];
            console.log(common);

            let i = 0;
            while(i < 7) {
                menuOrder.push(resMenu[today]);
                today = (today+1)%7;
                i++;
            }
            // console.log(menuOrder);
            setMenu(menuOrder);
            // setMenu([{day : "Sunday", lunch : "abc", breakfast:"abc", dinner:"abc", snacks:"abc"}])
        }).catch(err => console.log(err))
    }, [])

    const MenuCards = menu.map((oneDayMenu, id) => {
        return (<MenuCard menu = {oneDayMenu} />)
    })

    let menuList = (menu) => {
        // console.log(menu.item);
        const date = new Date();
        const day = date.getDay();
        if(menu.item.order == day) {
        console.log(menu.item.order, day);

            return <MenuCard menu = {menu.item} isToday = {true}/>
        }
        return <MenuCard menu = {menu.item} isToday = {false}/>
    }
    return (
        <View>
            {/* <View>
                {menu.length === 0 ? <></> : <MenuCard menu = {menu[5]} key={5}/>}
            </View>
            <View>
                {menu.length === 0 ? <></> : <MenuCard menu = {menu[5]} key={5}/>}
            </View>
            <View>
                {menu.length === 0 ? <></> : <MenuCard menu = {menu[5]} key={5}/>}
            </View> */}
            {/* <MenuCard menu={{breakfast:"", lunch:"", dinner:"", snacks:""}} />
            <MenuCard menu={menu[0]} /> */}
            {/* <MenuCards /> */}
            {/* {menu.length === 0 ? <></> : <MenuCard menu = {menu[0]} key={0}/>}
            {menu.length === 0 ? <></> : <MenuCard menu = {menu[1]} key={1}/>}
            {menu.length === 0 ? <></> : <MenuCard menu = {menu[2]} key={2}/>} */}
            {/* {menu.length === 0 ? <></> : <MenuCard menu = {menu[3]} key={3}/>}
            {menu.length === 0 ? <></> : <MenuCard menu = {menu[4]} key={4}/>} */}
            {/* {menu.length === 0 ? <></> : <MenuCard menu = {menu[5]} key={5}/>} */}
            {/* {menu.length === 0 ? <></> : <MenuCard menu = {menu[6]} key={6}/>} */}

            {<FlatList data={menu} renderItem={menuList} keyExtractor={item => item.day}/>}
        </View>
    )
}

export default WeeklyMenu;