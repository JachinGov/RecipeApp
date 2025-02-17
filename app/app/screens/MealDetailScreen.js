import { memo, useContext, useLayoutEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, } from "react-native";
import { MEALS } from "../data/DummyData";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/fav-context";


function MealDetailScreen({ route, navigation }) {
    const favoriteMealsCtx = useContext(FavoritesContext);
  
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  
    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  
    function changeFavoriteStatusHandler() {
      if (mealIsFavorite) {
        favoriteMealsCtx.removeFavorite(mealId);
      } else {
        favoriteMealsCtx.addFavorite(mealId);
      }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton
                    icon= {mealIsFavorite? 'star' : 'star-outline'}
                    color="white"
                    onPress={changeFavoriteStatusHandler}
                />
            }
        });
    }, [navigation, changeFavoriteStatusHandler]);
    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainter}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24',
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white',
    },
    listContainter: {
        width: '80%',
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    rootContainer: {
        marginBottom: 32,
    },
});
