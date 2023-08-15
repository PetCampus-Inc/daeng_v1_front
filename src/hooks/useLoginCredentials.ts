import { useState } from "react";


const useLoginCredentials = () => {
    const [credentials, setCredentials] = useState({ userName: "", userPassword: "" });

    const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials, [name]: value
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        window.alert(
            `Login has requested.\n
            ID: ${credentials.userName}\n
            Password: ${credentials.userPassword}`
        );
    }

    return { credentials, setCredentials, handleCredentialChange, handleSubmit }
}

export default useLoginCredentials;