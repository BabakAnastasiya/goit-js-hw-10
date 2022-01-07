import './css/styles.css';
import API from './fetchCountries'
import { debounce } from "lodash";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryCardTp1 from './country-card.hbs'
import countryCardTp2 from './country-card2.hbs'

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    cardContainer: document.querySelector('.country-info'),
}

refs.searchInput.addEventListener ('input', debounce(onSearh, DEBOUNCE_DELAY))

function onSearh (e) {
    e.preventDefault;
    let wordInput = refs.searchInput.value;
    let searchQuery = wordInput.trim();
    if (searchQuery.length >= 1) {
        API.fetchCountries(searchQuery)
           .then(rendercardContainer)
           .catch(error => {
              console.log(error)
           });
     } else (
        rendercardContainer([])
     );
  };


function rendercardContainer(country) {
    let resp = country;
    if (resp.length === 1) {
        let markup = countryCardTp2(country);
        refs.cardContainer.innerHTML = markup;
    } else if (resp.length > 1 && resp.length <= 10) {
        let markup2 = countryCardTp1(country);
        refs.cardContainer.innerHTML = markup2;}
      else if (resp.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
     }
}




