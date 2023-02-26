import axios from 'axios';

const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

export const fetchWeather = async (query) => {
    try {
        const { data } = await axios.get(REACT_APP_API_URL, {
            params: {
                q: query,
                units: 'metric',
                APPID: REACT_APP_API_KEY
            }
        });

        return data;

    } catch (error) {
        return null;
    }
};