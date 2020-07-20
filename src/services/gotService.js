export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
        
    }

    getAllCharacters = async () => 
        await this._transfromGenericAsync(
            () => this.getResource(`/characters?page=5&pageSize=10`),
            this._transformCharacter,
            true
        );

    getCharacter = async (id) => 
        await this._transfromGenericAsync(
            () => this.getResource(`/characters/${id}`),
            this._transformCharacter,
            false
        );

    getAllHouses = async () => 
        await this._transfromGenericAsync(
            () => this.getResource(`/houses/`),
            this._transformHouse,
            true
        );

    getHouse = async (id) =>  
        await this._transfromGenericAsync(
            () => this.getResource(`/houses/${id}`),
            this._transformHouse,
            false
        );

    getAllBooks = async () =>  
        await this._transfromGenericAsync(
            () => this.getResource(`/books/`),
            this._transformBook,
            true
        );
    

    getBook = async (id) => 
        await this._transfromGenericAsync(
            () => this.getResource(`/books/${id}`),
            this._transformBook,
            false
        );

    _transformCharacter = (char) => {
        return {
            name: this._getData(char.name),
            gender: this._getData(char.gender),
            born: this._getData(char.born),
            died: this._getData(char.died),
            culture: this._getData(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            name: this._getData(house.name),
            region: this._getData(house.region),
            words: this._getData(house.words),
            titles: this._getData(house.titles),
            overlord: this._getData(house.overlord),
            ancestraWeapons: this._getData(house.ancestraWeapons)
        }
    }

    _transformBook = (book) => {
        return {
            name: this._getData(book.name),
            numberOfPages: this._getData(book.numberOfPages),
            publisher: this._getData(book.publisher),
            released: this._getData(book.released)
        }
    }

    _transfromGenericAsync = async (asyncCallFunction, transfromFunction, isArrayResult) => {
        const result = await asyncCallFunction();

        if (isArrayResult) {
            return result.map((item) => transfromFunction(item));
        }

        return transfromFunction(result);
    }

    _getData = (data) => {
        if (!data) {
            return 'No data :(';
        }

        return data;
    }
}