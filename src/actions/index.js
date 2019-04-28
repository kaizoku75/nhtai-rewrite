import axios from "axios";

export const SEARCH_KEYWORD = "SEARCH_KEYWORD";
export const GET_BOOK = "GET_BOOK";

// fetch search result
export function searchBooksByKeyword(input_url = "https://id.nhent.ai/api/search?", page = 1) {
    const url = `${input_url}&page=${page}`;
    const payload = axios.get(url);

    return {
        meta:{page},
        type:SEARCH_KEYWORD,
        payload
    };
}

// fetch book data by id
export function getBookById(id){
    const url = `https://id.nhent.ai/api/id?id=${id}`;
    const payload = axios.get(url);

    return {
        type:GET_BOOK,
        payload
    };
}