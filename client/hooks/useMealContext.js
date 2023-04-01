import { useContext } from "react";
import { MealContext } from "../contexts/MealContext";

const useMealContext = () => {
  const mealContext = useContext(MealContext);
  return mealContext;
};

export default useMealContext;
