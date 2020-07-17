export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
        
    }

    async getAllCharacters() {
        const result = await this.getResource(`/characters?page=5&pageSize=10`);

        return result.map((item) => this._transformCharacter(item));
    }

    async getCharacter(id) {
        const result = await this.getResource(`/characters/${id}`);

        return this._transformCharacter(result);
    }

    getAllHouses() {
        return this.getResource(`/houses/`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

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
}