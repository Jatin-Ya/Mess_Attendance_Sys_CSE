import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import axios from "axios";

function Menu() {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get("/api/menu/getMenu").then((response) => {
            console.log(response.data);
        }).catch(err => console.log(err))
    }, [])

    return (
        <View></View>
    )
}

export default Menu;
