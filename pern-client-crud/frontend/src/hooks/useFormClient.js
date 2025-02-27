import { useState } from 'react';

export const useFormClient = () => {
    const intialClientValues = {
        name: '',
        email: '',
        Job: '',
        Rate: '',
        Status: true
    }
    const [client, setClient] = useState(intialClientValues);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setClient({
            ...client,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleChange = (client) => {
        setClient(client);
    }

    return { client, handleInputChange, handleChange}
}