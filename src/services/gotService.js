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

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        };
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestraWeapons: house.ancestraWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    _transfromGenericAsync = async (asyncCallFunction, transfromFunction, isArrayResult) => {
        const result = await asyncCallFunction();

        if (isArrayResult) {
            return result.map((item) => transfromFunction(item));
        }

        return transfromFunction(result);
    }
}