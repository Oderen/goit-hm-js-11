// Imports
import reqestProcess from './main_functions';
import axios from "axios";
import Notiflix from 'notiflix';


// Vars
const reqestProcessing = new reqestProcess();
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

refs.form.addEventListener('submit', async (e) => {
    try {
    e.preventDefault();
    
    reqestProcessing.query = e.currentTarget.elements.searchQuery.value.trim();
    
    if (reqestProcessing.query === '') {
        return Notiflix.Notify.info('Plese enter something');
    }
    
    refs.btnLoadMore.style.display = 'none';
    reqestProcessing.clearMarkUp();
    reqestProcessing.resetPage();
        
    const res = await reqestProcessing.fetchData();

    if (res) {
        refs.btnLoadMore.style.display = 'none';
    } else {
        refs.btnLoadMore.style.display = 'block';
    };
     } catch (e) {
      Notiflix.Notify.failure('Ups, something went wrong');
      console.log('Error: ', e.message);
}
});

refs.btnLoadMore.addEventListener('click', async (e) => {
    try { 
    const res = await reqestProcessing.fetchData();

    refs.btnLoadMore.style.display = 'none';
    
    if (res) {
        refs.btnLoadMore.style.display = 'none';
    } else {
        refs.btnLoadMore.style.display = 'block';
    }
    } catch {
      Notiflix.Notify.failure('Ups, something went wrong');
      console.log('Error: ', e.message);}
    });

