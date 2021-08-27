declare module 'manytoon.com' {
    export class Parser {
        baseURL: string;
        /**
         * **Get popular doujins**
         * @returns {Promise<Doujin[]>}
         */
        getPopularUpdates(): Promise<Doujin[]>;
        /**
         * **Get doujins from given page**
         * @return {Promise<Page<Doujin>>}
         */
        getHomepage(): Promise<Page<Doujin>>;
        /**
         * **Get page from "target"**
         * @param {string} target
         * @return {Promise<Page<Doujin>>}
         */
        search(target: string): Promise<Page<Doujin>>;
        /**
         * **Get doujin from URL**
         * @param {string} url
         * @returns {Promise<Doujin>}
         */
        getDoujin(url: string): Promise<Doujin>;
    }
    export class Doujin {
        /**
         * Doujin
         * @param {string} html HTML
         * @param {string} url
         * @param {number} statusCode
         */
        constructor(html: string, url: string, statusCode: number);
        readonly statusCode: number;
        readonly name: string;
        readonly rating: string;
        readonly totalVotes: string;
        readonly rank: string;
        readonly montlyViews: string;
        readonly status: string;
        readonly releaseYear: string;
        readonly genres: string[];
        readonly url: string;
        readonly img: string;
        /**
         * **Returns a first chapter**
         * @returns {Promise<string>}
         */
        getFirstChapter(): Promise<string>;
        /**
         * **Returns a last chapter**
         * @returns {Promise<string>}
         */
        getLastChapter(): Promise<string>;
        /**
         * **Returns an all chapters**
         * @returns {Promise<string[]>}
         */
        getAllChapters(): Promise<string[]>;
        #private;
    }
    export class Page<T> extends Array<Doujin> {
        /**
         * Setting data
         */
        constructor(options: {
            isHome: boolean;
            lastPage: number;
            target?: string;
            doujins: Array<Doujin>;
        });
        /**
         * **Getting page**
         */
        to(page: number): Promise<Page<Doujin>>;
        /**
         * **Go to the next page**
         */
        next(): Promise<Page<Doujin>>;
        /**
         * **Go to the previous page**
         */
        prev(): Promise<Page<Doujin>>;
        /**
         * **Returns number of last page**
         */
        getLastPageNumber(): number;
        /**
         * **Returns number of current page**
         */
        getCurrentPageNumber(): number;
        #private;
    }
}
