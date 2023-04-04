// Imports
import axios from "axios";

// Vars.Link Options
const BASE_LINK = 'https://pixabay.com/api/';
const KEY = '34775876-734348df823e673a174296bed';
const IMAGE_TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const SAFESEARCH = 'safesearch=true';

export default class ApiServise {
    constructor() {

    }

    async fetchData() {
        
        const response = await axios.get(`${BASE_LINK}?key=${KEY}&q=${this.searchQuery}&${IMAGE_TYPE}&${ORIENTATION}&per_page=40&${SAFESEARCH}&page=${this.page}`);
    }
}