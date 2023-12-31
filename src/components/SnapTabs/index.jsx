import { Box } from "../../primitives";
import Logbook from "../Logbook";
import MealPlanner from "../MealPlanner";
import RecipeList from "../RecipeList";
import IngredientList from "../IngredientList";
import styles from "./snap-tabs.module.scss";
import useToast from "../../hooks/useToast";

const SnapTabs = ({ ingredients, setIngredients, recipes, setRecipes }) => {
    const showToast = useToast();

    return (
        <>
            <div className={styles.tabs}>
                <section className={`${styles.section} ${styles.scroll}`}>
                    <Box id="log" className={styles.article}>
                        <Logbook ingredients={ingredients} recipes={recipes} showToast={showToast} />
                    </Box>
                    <Box id="mealPlanner" className={styles.article}>
                        <MealPlanner recipes={recipes} showToast={showToast} />
                    </Box>
                    <Box id="recipes" className={styles.article}>
                        <RecipeList ingredients={ingredients} setIngredients={setIngredients} recipes={recipes} setRecipes={setRecipes} showToast={showToast} />
                    </Box>
                    <Box id="ingredients" className={styles.article}>
                        <IngredientList ingredients={ingredients} setIngredients={setIngredients} showToast={showToast} />
                    </Box>
                </section>
            </div>
            <footer className={`${styles.footer} ${styles.scroll}`}>
                <Box>
                    <nav className={styles.nav}>
                        <a className={styles.a} href="#log">
                            Log
                        </a>
                        <a className={styles.a} href="#mealPlanner">
                            Meal Planner
                        </a>
                        <a className={styles.a} href="#recipes">
                            Recipes
                        </a>
                        <a className={styles.a} href="#ingredients">
                            Ingredients
                        </a>
                    </nav>
                </Box>
            </footer>
        </>
    );
};

export default SnapTabs;
