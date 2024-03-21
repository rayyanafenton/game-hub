import axios from "axios";

//create axios with configuration
export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { 
        key: '485c4386638447b98868641afdb26c48',

    }
})