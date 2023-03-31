// Imports
import api from './api';
import axios from "axios";
import Notiflix from 'notiflix';


// Vars
const newApi = new api();
const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    btn: document.querySelector('button'),
    btnLoadMore: document.querySelector('.load-more')
};
const btnLoadMoreStyles = 'margin-top: 15px; background-color: #2196F3; border-color: transparent; border-radius: 4px; padding: 10px; width: 100px;';  

// Main

refs.btnLoadMore.style.cssText = `${btnLoadMoreStyles}`;
refs.btnLoadMore.style.display = 'none';

refs.form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    newApi.query = e.currentTarget.elements.searchQuery.value.trim();
    
    if (newApi.query === '') {
        return Notiflix.Notify.info('Plese enter something');
    }
    
    refs.btnLoadMore.style.display = 'none';
    newApi.clearMarkUp();
    newApi.resetPage();

    newApi.fetchData().then(r => {
        refs.btnLoadMore.style.display = 'block';
    });
});

refs.btnLoadMore.addEventListener('click', (e) => {
    
    refs.btnLoadMore.style.display = 'none';
    newApi.fetchData().then(shouldBtnActive => {
        if (shouldBtnActive) {
            refs.btnLoadMore.style.display = 'none';
        } else {
            refs.btnLoadMore.style.display = 'block';
        }
    });
});


