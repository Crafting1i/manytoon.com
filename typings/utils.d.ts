export = Utils;
declare class Utils {
    /**
     * Get DOM tree from URL
     * @param {string} url
     * @param {object} [options]
     * @returns {Promise<{
     *  html: string,
     *  status: number
     * }>}
     */
    getPage(url: string, options?: object): Promise<{
        html: string;
        status: number;
    }>;
    /**
     * Parse doujin from URL
     * @param {string} url
     * @returns {Promise<Doujin>}
     */
    parseDoujinByURL(url: string): Promise<Doujin>;
    /**
     * Parcse all doujins from \<a href="path/to/page"\>\</a\> elements
     * @param {cheerio.Cheerio<cheerio.Element>} elements
     * @return {Promise<Array<Doujin>>}
     */
    parseAllURLsFromElements(elements: cheerio.Cheerio<cheerio.Element>): Promise<Array<Doujin>>;
}
import Doujin = require("./Doujin");
import cheerio = require("cheerio");
