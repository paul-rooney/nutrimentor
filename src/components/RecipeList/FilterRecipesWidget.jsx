import { useEffect, useMemo } from "react";
import { readRows, supabase } from "../../supabase";
import { debounce } from "../../utilities";
import Input from "../Common/Input";

const FilterRecipesWidget = ({ recipes, setFilteredRecipes }) => {
    useEffect(() => {
        if (!recipes) return;

        setFilteredRecipes(recipes);
    }, [recipes]);

    const searchKcalTotal = useMemo(() => {
        return debounce((event) => {
            const { value } = event.target;

            setFilteredRecipes(recipes.filter(({ total_kcal }) => total_kcal <= value));
        }, 250);
    }, [recipes]);

    const searchProteinTotal = useMemo(() => {
        return debounce((event) => {
            const { value } = event.target;

            setFilteredRecipes(recipes.filter(({ total_protein }) => total_protein <= value));
        }, 250);
    }, [recipes]);

    const searchRecipes = useMemo(() => {
        return debounce((event) => {
            const { value } = event.target;

            setFilteredRecipes(
                recipes.filter(({ display_name }) => display_name.toLowerCase().includes(value.toLowerCase().trim()))
            );
        }, 250);
    }, [recipes]);

    const changeHandler = useMemo(() => {
        const readRows = async (str) => {
            try {
                const { data, error } = await supabase
                    .from("recipes_ingredients")
                    .select(`recipes (id)`)
                    .ilike("ingredient_identifier", `%${str}%`);
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            } catch (error) {
                console.error("An error occurred: ", error);
            }
        };

        return debounce(async (event) => {
            const { value } = event.target;

            if (value.length < 3) {
                setFilteredRecipes(recipes);
                return;
            }

            readRows(value.trim()).then((response) => {
                const recipeIDs = response.map((entry) => entry.recipes.id);
                const filtered = recipes.filter((recipe) => recipeIDs.includes(recipe.id));

                setFilteredRecipes(filtered);
            });
        }, 250);
    }, [recipes]);

    return (
        <>
            <Input
                id="recipes_search_name"
                label="Search recipes&hellip;"
                type="search"
                changeHandler={searchRecipes}
            />
            <Input id="recipes_search" label="Find recipes with&hellip;" type="search" changeHandler={changeHandler} />
            <Input
                id="recipes_search_kcal"
                label="Find recipes with kcal or less"
                type="number"
                step={10}
                changeHandler={searchKcalTotal}
            />
            <Input
                id="recipes_search_protein"
                label="Find recipes with protein or less"
                type="number"
                step={10}
                changeHandler={searchProteinTotal}
            />
        </>
    );
};

export default FilterRecipesWidget;
