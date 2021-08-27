export = Page;
/**
 * @extends {Array<Doujin>}
 */
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
import Doujin = require("./Doujin");
