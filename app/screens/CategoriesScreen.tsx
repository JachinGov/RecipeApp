import { FlatList } from "react-native";
import type { ListRenderItem } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/DummyData";

type RootStackParamList = {
  Categories: undefined;
  MealsOverview: { categoryId: string };
  MealDetail: { mealId: string };
  Favorites: undefined;
};

type CategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Categories"
>;

function CategoriesScreen({ navigation }: CategoriesScreenProps) {
  function renderCategoryItem({
    item,
  }: Parameters<ListRenderItem<(typeof CATEGORIES)[number]>>[0]) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: item.id,
      });
    }

    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
