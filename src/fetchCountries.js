import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1'
function fetchCountries(name) {
    return fetch (`${BASE_URL}/name/${name}?fields=flags,name,capital,population,languages`)
    .then(response=>{
        if (response.ok === false) {
           Notify.failure('Oops, there is no country with that name');
        } return response.json();})}

    export default {fetchCountries};
