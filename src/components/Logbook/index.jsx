import { useEffect, useState } from "react";
import { Cluster, Icon, Stack } from "../../primitives";
import { supabase, upsertRows } from "../../supabase";
import { formatDate, formatDateISO, getPastDate, getFutureDate } from "../../utilities";
import styles from "./logbook.module.scss";
import MacronutrientDisplay from "../MacronutrientDisplay";
import WeightDisplay from "../WeightDisplay";

const getLog = async (table, columns = "*", matchedColumn, date) => {
    try {
        const { data, error } = await supabase.from(table).select(columns).eq(matchedColumn, date);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
    }
};

const Logbook = ({ recipes }) => {
    const [date, setDate] = useState(formatDateISO(new Date()));
    const [weight, setWeight] = useState(null);
    const [breakfast, setBreakfast] = useState({});
    const [lunch, setLunch] = useState({});
    const [dinner, setDinner] = useState({});

    useEffect(() => {
        getLog("users_weight", "weight", "date_entered", date).then(([entry]) => setWeight(entry?.weight));

        getLog("users_logs", "*, recipes (display_name)", "meal_date", date).then((data) => {
            setBreakfast({});
            setLunch({});
            setDinner({});

            if (!data.length) return;

            data.map(({ id, user_id, meal_name, meal_date, recipe_id, recipes }) => {
                const entry = {
                    id: id,
                    user_id: user_id,
                    meal_name: meal_name,
                    meal_date: meal_date,
                    recipe_id: recipe_id,
                    display_name: recipes.display_name,
                };

                if (meal_name === "breakfast") {
                    setBreakfast(entry);
                } else if (meal_name === "lunch") {
                    setLunch(entry);
                } else {
                    setDinner(entry);
                }
            });
        });
    }, [date]);

    const clickHandler = async (event) => {
        const { data } = await supabase.auth.getSession();
        const { meal } = event.target.closest("button").dataset;
        const input = document.getElementById(meal);
        const entry = {
            user_id: data.session.user.id,
            meal_name: null,
            meal_date: date,
            recipe_id: input.value,
        };

        switch (meal) {
            case "breakfast":
                entry.meal_name = "breakfast";
                setBreakfast(entry);
                break;

            case "lunch":
                entry.meal_name = "lunch";
                setLunch(entry);
                break;

            case "dinner":
                entry.meal_name = "dinner";
                setDinner(entry);
                break;

            default:
                break;
        }

        input.value = "";
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const meals = [breakfast, lunch, dinner];

        for (const meal of meals) {
            if (Object.keys(meal).length) {
                const payload = {
                    id: meal?.id,
                    user_id: meal.user_id,
                    meal_name: meal.meal_name,
                    meal_date: date,
                    recipe_id: meal.recipe_id,
                };

                await upsertRows("users_logs", payload, { ignoreDuplicates: false, onConflict: "meal_name_date" });
            }
        }
    };

    const logWeight = async (event) => {
        event.preventDefault();

        const { data } = await supabase.auth.getSession();
        const { weight } = event.target;

        const payload = {
            user_id: data.session.user.id,
            weight: weight.value,
        };

        upsertRows("users_weight", payload, { ignoreDuplicates: false, onConflict: "date_entered" });
    };

    const adjustDate = (event) => {
        const { direction } = event.target.dataset;

        switch (direction) {
            case "previous":
                setDate((currentValue) => formatDateISO(getPastDate(currentValue, 1)));
                break;

            case "next":
                setDate((currentValue) => formatDateISO(getFutureDate(currentValue, 1)));
                break;

            default:
                break;
        }
    };

    return (
        <Stack>
            <h2 className={styles.heading}>Log</h2>
            {/* <WeightDisplay /> */}
            <MacronutrientDisplay date={date} />
            <Cluster justify="center" align="baseline">
                <button data-direction="previous" onClick={adjustDate}>
                    Previous
                </button>
                <time>{formatDate(new Date(date))}</time>
                <button data-direction="next" onClick={adjustDate}>
                    Next
                </button>
            </Cluster>

            <form onSubmit={logWeight}>
                <Stack space="var(--size-1)">
                    <label className={styles.label} htmlFor="weight">
                        Weight
                    </label>
                    <input id="weight" type="number" defaultValue={weight} step={0.25} />
                    <Cluster justify="end">
                        <button className={styles.button}>Log weight</button>
                    </Cluster>
                </Stack>
            </form>

            <form onSubmit={submitHandler}>
                <datalist id="recipes_list">
                    {recipes.map((recipe) => (
                        <option key={recipe.id} value={recipe.id}>
                            {recipe.display_name}
                        </option>
                    ))}
                </datalist>
                <Stack space="var(--size-4)">
                    <Stack space="var(--size-1)">
                        <Cluster justify="space-between" align="baseline">
                            <label htmlFor="breakfast">Breakfast</label>
                            <button className={styles.button} type="button" data-meal="breakfast" onClick={clickHandler}>
                                <Icon space="0.5ch" direction="ltr" icon="plus">
                                    Add
                                </Icon>
                            </button>
                        </Cluster>
                        <input id="breakfast" list="recipes_list" placeholder={breakfast?.display_name} />
                    </Stack>
                    <Stack space="var(--size-1)">
                        <Cluster justify="space-between" align="baseline">
                            <label htmlFor="lunch">Lunch</label>
                            <button className={styles.button} type="button" data-meal="lunch" onClick={clickHandler}>
                                <Icon space="0.5ch" direction="ltr" icon="plus">
                                    Add
                                </Icon>
                            </button>
                        </Cluster>
                        <input id="lunch" list="recipes_list" placeholder={lunch?.display_name} />
                    </Stack>
                    <Stack space="var(--size-1)">
                        <Cluster justify="space-between" align="center">
                            <label htmlFor="dinner">Dinner</label>
                            <button className={styles.button} type="button" data-meal="dinner" onClick={clickHandler}>
                                <Icon space="0.5ch" direction="ltr" icon="plus">
                                    Add
                                </Icon>
                            </button>
                        </Cluster>
                        <input id="dinner" list="recipes_list" placeholder={dinner?.display_name} />
                    </Stack>
                    <Cluster justify="end">
                        <button className={styles.button} type="submit">
                            <Icon space="1ch" direction="ltr" icon="check">
                                Complete log
                            </Icon>
                        </button>
                    </Cluster>
                </Stack>
            </form>
        </Stack>
    );
};

export default Logbook;
