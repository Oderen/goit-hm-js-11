// Imports
import Notiflix from 'notiflix';
import axios from "axios";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Vars

const infoMarkUp = 'box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.2); border-radius: 0px 0px 4px 4px; background: #FFFFFF';

const BASE_LINK = 'https://pixabay.com/api/';
const KEY = '34775876-734348df823e673a174296bed';
const IMAGE_TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const SAFESEARCH = 'safesearch=true';

// Main

const lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
        });

export default class reqestProcess {
  constructor() {
      this.btnLoadMore = document.querySelector('.load-more');
      this.div = document.querySelector('.gallery');     

      this.searchQuery = '';
      this.oldValue = '';
      this.page = 1;
      this.pictureAmount = 0;
      this.shouldBtnActive = false;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return this.searchQuery = newQuery;
  }

  async fetchData() {
    try {
    const response = await axios.get(`${BASE_LINK}?key=${KEY}&q=${this.searchQuery}&${IMAGE_TYPE}&${ORIENTATION}&per_page=40&${SAFESEARCH}&page=${this.page}`);
    this.shouldBtnActive = false;
    this.sumOfPictures(response.data.hits.length);
    
    if (response.data.hits.length === 0) {
          this.shouldBtnActive = true;
          Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
          return this.shouldBtnActive;
    };
    
    if (this.pictureAmount >= response.data.totalHits) {
          if (this.pictureAmount === response.data.totalHits) {
            
            this.shouldBtnActive = true;
            this.nextPage();

            this.div.insertAdjacentHTML('beforeend', this.markUp(response.data));
            lightbox.refresh();
            this.addingStyles();

            Notiflix.Notify.success(`Hooray! We found ${response.data.hits.length} images.`);
            this.OldValue = this.searchQuery;
            this.pictureAmount = 0;
            return this.shouldBtnActive;
      };

          this.shouldBtnActive = true;
          this.pictureAmount = 0;
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          
          return this.shouldBtnActive;
    };
    
    this.nextPage();

        this.div.insertAdjacentHTML('beforeend', this.markUp(response.data));
        lightbox.refresh();
        this.addingStyles();

        Notiflix.Notify.success(`Hooray! We found ${response.data.hits.length} images.`);
        this.OldValue = this.searchQuery;
        return this.shouldBtnActive;
    } catch (e) {
      Notiflix.Notify.failure('Ups, something went wrong');
      console.log('Error: ', e.message);
    }
    
  };

  nextPage() {
    return this.page += 1;
  }

  resetPage() {
    return this.page = 1;
  }
  
  sumOfPictures(pictures) {
    if (this.OldValue !== this.searchQuery) {
      this.pictureAmount = 0;
    }
    return this.pictureAmount += pictures;
  }

  markUp(data) {
        return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
                        <a href='${largeImageURL}'><img width='440' height='250' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                        <div class="info">
                          <p class="info-item">
                            <b>Likes: </b>${likes}
                          </p>
                          <p class="info-item">
                            <b>Views: </b>${views}
                          </p>
                          <p class="info-item">
                            <b>Comments: </b>${comments}
                          </p>
                          <p class="info-item">
                            <b>Downloads: </b>${downloads}
                          </p>
                          </div> 
                        </div>`).join('');
  }

  clearMarkUp() {
    return this.div.innerHTML = '';
  }
  
  addingStyles() {
    this.div.style.cssText = "display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin-top: 15px";
  
        for (let i = 0; i < document.querySelectorAll('.info').length; i += 1) {
          document.querySelectorAll('.info')[i].style.cssText =
            `display: flex; width: 100%; ${infoMarkUp};`
        }
        
        for (let i = 0; i < document.querySelectorAll('.info-item').length; i += 1) {
          document.querySelectorAll('.info-item')[i].style.cssText = 'display: flex; flex-direction: column; margin-left: 30px; align-items: center;'; 
    }
    return;
  }
}
