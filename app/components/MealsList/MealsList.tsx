import { View, FlatList, StyleSheet } from "react-native";
import type { ListRenderItem } from "react-native";
import MealItem from "./MealItem";
import type Meal from "../../models/meal";

type MealsListProps = {
  items: Meal[];
};

function MealsList({ items }: MealsListProps) {
  function renderMealItem({ item }: { item: Meal }) {
    return (
      <MealItem
        id={item.id}
        title={item.title}
        imageUrl={item.imageUrl}
        affordability={item.affordability}
        complexity={item.complexity}
        duration={item.duration}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
