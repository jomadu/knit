import { ChangeEvent, useState, FormEvent } from "react";

interface useFormReturnType<T> {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    values: T
}

export const useForm = <T, >(initialState: T, callback: () => void): useFormReturnType<T> => {
    const [values, setValues] = useState(initialState);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("handleChange", event.target.name, event.target.value)
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
        console.log(values);
    };

    return {
        handleChange,
        handleSubmit,
        values,
    };
};
