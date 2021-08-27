export = Doujin;
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
