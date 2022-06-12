export = Parser;
declare class Parser {
    baseURL: string;
    /**
     * **Get doujins from given page**
     * @return {Promise<Page>}
     */
    getHomepage(): Promise<Page>;
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
import Doujin = require("./Doujin");
import Page = require("./Page");
