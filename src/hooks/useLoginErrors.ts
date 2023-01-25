import { useState } from "react";

const useLoginErrors = () => {
    const [errors, setErrors] = useState({
        usernameError: false,
        passwordError: false,
    });

    const updateErrors = (usernameError: boolean, passwordError: boolean) => {
        setErrors({ usernameError, passwordError });
    }

    return {
        errors,
        updateErrors,
    }
}

export { useLoginErrors };