import { Center, Cover, Stack } from "../../primitives";
import Button from "../Common/Button";
import styles from "./sign-in-form.module.scss";

const SignInForm = ({ handleSubmit }) => (
    <Center className={styles.formWrapper}>
        <Cover centered="div">
            <div>
                <h1 className={styles.branding}>MealMosaic</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Stack space="var(--size-3)">
                        <h2 className={styles.heading}>Sign in</h2>
                        <Stack space="var(--size-1)">
                            <label className={styles.label} htmlFor="email">
                                Email address
                            </label>
                            <input className={styles.input} id="email" type="email" required />
                        </Stack>
                        <Stack space="var(--size-1)">
                            <label className={styles.label} htmlFor="password">
                                Password
                            </label>
                            <input className={styles.input} id="password" type="password" required />
                        </Stack>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Stack>
                </form>
            </div>
        </Cover>
    </Center>
);

export default SignInForm;
