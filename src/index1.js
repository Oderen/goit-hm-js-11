// Imports
import api from './api1';
import axios from "axios";
import Notiflix from 'notiflix';

// Imports.SimpleLightBox
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Vars
const newApi = new api();
const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    btn: document.querySelector('button'),
    btnLoadMore: document.querySelector('.load-more')
};

// Vars.MarkUp
const btnLoadMoreStyles = 'margin-top: 15px; background-color: #2196F3; border-color: transparent; border-radius: 4px; padding: 10px; width: 100px;';
const infoMarkUp = 'box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.2); border-radius: 0px 0px 4px 4px; background: #FFFFFF';

// Vars.SimpleLightBox
const lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
        });

// Main

// Adding permanent styles 
refs.btnLoadMore.style.cssText = `${btnLoadMoreStyles}`;
refs.btnLoadMore.style.display = 'none';


// Event Listeners
refs.form.addEventListener('submit', (e) => {
    e.preventDefault();

    async function f() {
        try {
          const response = await newApi.fetchData();
         }
        catch { 
            Notiflix.Notify.failure('Ups, something went wrong');
        }        
    }

    f();
    
    
    
    // newApi.query = e.currentTarget.elements.searchQuery.value.trim();
    
    // if (newApi.query === '') {
    //     return Notiflix.Notify.info('Plese enter something');
    // }
    
    // refs.btnLoadMore.style.display = 'none';
    // newApi.clearMarkUp();
    // newApi.resetPage();

    
    //     .then(shouldBtnActive => {
    //     if (shouldBtnActive) {
    //         refs.btnLoadMore.style.display = 'none';
    //     } else {
    //         refs.btnLoadMore.style.display = 'block';
    //     }
    // });
});

// async function fetchData() {
//     const response = await axios.get(`${BASE_LINK}?key=${KEY}&q=${this.searchQuery}&${IMAGE_TYPE}&${ORIENTATION}&per_page=40&${SAFESEARCH}&page=${this.page}`);
//     return response.data;
// }