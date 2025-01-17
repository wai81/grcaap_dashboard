import React from "react";
import { useLogin } from "@refinedev/core";
import { AuthPage } from "@refinedev/antd";

export const Login = () => {
    // const { mutate, isLoading } = useLogin();

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     // Using FormData to get the form values and convert it to an object.
    //     const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
    //     // Calling mutate to submit with the data we've collected from the form.
    //     mutate(data);
    // };

    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                    email: "demo@demo.com",
                    password: "demodemo",
                },
            }}
        />
        // <div>
        //     <h1>Авторизация</h1>
        //     <form onSubmit={onSubmit}>
        //         <label htmlFor="email">Email</label>
        //         <input
        //             type="email"
        //             id="email"
        //             name="email"
        //             // We're providing default values for demo purposes.
        //             defaultValue="demo@demo.com"
        //         />

        //         <label htmlFor="password">Пароль</label>
        //         <input
        //             type="password"
        //             id="password"
        //             name="password"
        //             // We're providing default values for demo purposes.
        //             defaultValue="demodemo"
        //         />

        //         {isLoading && <span>loading...</span>}
        //         <button type="submit" disabled={isLoading}>
        //             Submit
        //         </button>
        //     </form>
        // </div>
    );
};