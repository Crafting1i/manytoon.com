// @ts-nocheck
const Page = require('./Page')
const Doujin = require('./Doujin')


const cheerio = require('cheerio')
const utils = new (require('./utils'))()



class Parser {
	constructor() {
		this.baseURL = 'https://manytoon.com/'
    }
    /**
     * **Get popular doujins**
     * @returns {Promise<Doujin[]>}
     */
    async getPopularUpdates() {
        const { html } = await utils.getPage(`${this.baseURL}`)
        const $ = cheerio.load(html)

        const doujins = await utils.parseAllURLsFromElements($('div.popular-slider div.slider__container > div.slider__item .slider__content h4 > a'))
        return doujins
    }
    /**
     * **Get doujins from given page**
     * @return {Promise<Page>}
     */
    async getHomepage() {
        const { html } = await utils.getPage(this.baseURL + 'page/1')
        const $ = cheerio.load(html)

        const _content = $('div.page-listing-item div.item-thumb a')
        let lastPage = $('div.wp-pagenavi[role="navigation"] > a.last').attr('href')
        lastPage = +lastPage.split('/')[lastPage.split('/').length - 1] || +lastPage.split('/')[lastPage.split('/').length - 2]

        const doujins = await utils.parseAllURLsFromElements(_content)
        const page = new Page({ isHome: true, lastPage, doujins })

        return page
    }
    /**
     * **Get page from "target"**
     * @param {string} target
     * @return {Promise<Page<Doujin>>}
     */
    async search(target) {
        if(!target) throw new SyntaxError('target is a required parameter')
        if (typeof target !== 'string') throw new TypeError("url must be a string.")

        const name = encodeURI(target.split(/ +/g).join('+'))
        const { html } = await utils.getPage(this.baseURL + `?s=${name}&post_type=wp-manga`)
        const $ = cheerio.load(html)
        const _content = $('div[role="tabpanel"].c-tabs-item > .c-tabs-item__content .tab-summary > .post-title a')
        let lastPage = $('div.wp-pagenavi[role="navigation"] > a.last').attr('href')
        lastPage = +lastPage.split('/')[lastPage.split('/').length - 1] || +lastPage.split('/')[lastPage.split('/').length - 2]

        const doujins = await utils.parseAllURLsFromElements(_content)
        const page = new Page({ isHome: false, doujins, lastPage, target: name })

        return page
    }
    /**
     * **Get doujin from URL**
     * @param {string} url
     * @returns {Promise<Doujin>}
     */
    async getDoujin(url) {
        if (!url) throw new SyntaxError("url is required parameter.")
        if (typeof url !== 'string') throw new TypeError("url must be a string.")
        
        const doujin = await utils.parseDoujinByURL(url)
        return doujin
    }
}

module.exports = Parser