import { View,Text, Image, Modal, TouchableWithoutFeedback, StyleSheet, Pressable, TextInput, Button } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import styles from "./FeedbackLastMeal.module.css";
import axios from "./../utils/axios";

const FeedbackLastMeal = () => {
    const [review,setReview] = useState("");

    const [lastMeal, setLastMeal] = useState({date : "", meal : ""});
    const handleSubmit = async () => {
        const comment = review;
        // const comment = review.current.value;
        console.log(comment);
        try {
            const review = await axios.post("/api/review", {mealType:lastMeal.meal, date:lastMeal.date,review:comment})
            if(review) {
                Alert.alert("Success", "Review successfully posted");
            }
        } catch(err) {
            console.log(err);
            Alert.alert("Error", "Unable to post review");
        }
        
    }

    const getLastMeal = () => {
        let date = new Date();
        const hours = date.getHours();

        let lastMeal = "dinner";
        if(hours < 7) {
            lastMeal = "dinner";
            date = new Date(date.getTime() - (24 * 60 * 60 * 1000));
        } else if(hours >= 7 && hours < 12) {
            lastMeal = "breakfast";
        } else if(hours >= 12 && hours < 17) {
            lastMeal = "lunch"
        } else if(hours > 17 && hours <= 20) {
            lastMeal = "snacks";
        } 

        // let lastMealDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        // let lastMealDate = date.toLocaleDateString("en-Us")
        setLastMeal({meal:lastMeal, date:date.toISOString()});
    }

    useEffect(() => {
        getLastMeal();
    }, [])
    
    return (
        <View style = {styles.outside_box}>
            <View style={styles.header}>
                <Text style={styles.heading}>Give Review about your last meal!</Text>
                {/* <Text>X</Text> */}
            </View>
            <View>
                <Text>{lastMeal.meal}</Text>
                <Text>{lastMeal.date.substring(0,10)}</Text>
            </View>
            <TextInput style={styles.inputBox} onChangeText = {setReview}/>
            <View style={styles.buttonBox}>
                <Button title="Submit" onPress={handleSubmit}/>
            </View>
        </View>
    )
}

export default FeedbackLastMeal;
