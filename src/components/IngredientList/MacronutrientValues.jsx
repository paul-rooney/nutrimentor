import { Cluster, Stack } from "../../primitives";
import styles from "./ingredient-list.module.scss";

const MacronutrientValues = ({ kcal, c = null, f = null, p = null }) => {
    const primaryMacronutrient = Math.max(c, f, p);

    return (
        <Cluster space="var(--size-2)">
            <Stack>
                <span className={styles.label}>kcal</span>
                {kcal}
            </Stack>
            {!!c && (
                <Stack space="0">
                    <span className={styles.label}>Carbohydrate</span>
                    <span className={c === primaryMacronutrient ? styles.highlight : ""}>{c}g</span>
                </Stack>
            )}
            {!!f && (
                <Stack space="0">
                    <span className={styles.label}>Fat</span>
                    <span className={f === primaryMacronutrient ? styles.highlight : ""}>{f}g</span>
                </Stack>
            )}
            {!!p && (
                <Stack space="0">
                    <span className={styles.label}>Protein</span>
                    <span className={p === primaryMacronutrient ? styles.highlight : ""}>{p}g</span>
                </Stack>
            )}
        </Cluster>
    );
};

export default MacronutrientValues;
