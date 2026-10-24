import { useLayoutEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import MealsList from "../components/MealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/DummyData";

type RootStackParamList = {
  Categories: undefined;
  MealsOverview: { categoryId: string };
  MealDetail: { mealId: string };
  Favorites: undefined;
};

type MealsOverviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MealsOverview"
>;

function MealsOverviewScreen({ route, navigation }: MealsOverviewScreenProps) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(catId),
  );

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId,
    )?.title;

    navigation.setOptions({
      title: categoryTitle ?? "Meals",
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
