const Doujin = require('./Doujin')


const cheerio = require('cheerio')
const utils = new (require('./utils'))()

/**
 * @extends {Array<Doujin>}
 */
class Page extends Array {
    //Private Properties
    #isHome
    #target
    #baseUrl = 'https://manytoon.com/'
    #page = 1
    #lastPage
    /**
     * Setting data
     * @param {object} options
     * @param {boolean} options.isHome
     * @param {number} options.lastPage
     * @param {string} [options.target]
     * @param {Array<Doujin>} options.doujins
     */
    constructor(options) {
        super()
        if (!options || options.isHome === undefined) throw new SyntaxError('options.isHome is a required parameter')
        
        if (!options.lastPage) throw new SyntaxError('options.lastPage is required parameter')
        if (typeof options.lastPage !== 'number') throw new TypeError('options.lastPage must be number')
        
        if (!options.target && !options.isHome) throw new Error('target is required parameter with isHome set to true.')
        
        if (!options.doujins) throw new SyntaxError('options.doujins is required parameter.')
        
        this.#isHome = options.isHome
        this.#target = options.target
        this.#lastPage = +options.lastPage


        options.doujins.forEach((doujin, index) => this[index] = doujin)
    }

    /**
     * **Getting page**
     * @param {number} page
     * @returns {Promise<this>}
     */
    async to(page) {
        if(page === undefined) throw new SyntaxError('page is required argument.')
        if(typeof page !== 'number') throw new TypeError('page must be a number.')
        if(page > this.#lastPage || page < 1) throw new RangeError(`page must be between 1 and ${this.#lastPage}.`)

        const url = this.#isHome ? this.#baseUrl + 'page/' + page : this.#baseUrl + 'page/' + page + `/?s=${encodeURIComponent(this.#target.split(' ').join('+'))}&post_type=wp-manga`
        this.#page = page
        
        const { html } = await utils.getPage(url)
        const $ = cheerio.load(html)
        
        const content = this.#isHome ? $('#loop-content > .page-listing-item .item-summary > .post-title a')
        : $('div[role="tabpanel"].c-tabs-item > .c-tabs-item__content .tab-summary > .post-title a')
        
        const doujins = await utils.parseAllURLsFromElements(content)
        doujins.forEach((doujin, index) => this[index] = doujin)

        return this
    }
    /**
     * **Go to the next page**
     * @returns {Promise<this>}
     */
    async next() {
        if(this.#page >= this.#lastPage) throw new RangeError(`page can not be above than ${this.#lastPage}.`)
        this.#page++
        this.to(this.#page)

        return this
    }
    /**
     * **Go to the previous page**
     * @returns {Promise<this>}
     */
    async prev() {
        if(this.#page <= 1) throw new RangeError('page can not be less than 1.')
        this.#page--
        this.to(this.#page)

        return this
    }
    /**
     * **Returns number of last page**
     * @returns {number}
     */
    getLastPageNumber() {
        return this.#lastPage
    }
    /**
     * **Returns number of current page**
     * @returns {number} Number of current page
     */
    getCurrentPageNumber() {
        return this.#page
    }
}

module.exports = Page