// @ts-nocheck
const Doujin = require('./Doujin')


const cheerio = require('cheerio')
const fetch = require('node-fetch')


class Utils {
    /**
     * Get DOM tree from URL
     * @param {string} url
     * @param {object} [options]
     * @returns {Promise<{
     *  html: string,
     *  status: number
     * }>}
     */
    async getPage(url, options = {}) {
        if (!url) throw new SyntaxError("url is required parameter.")
        if (typeof url !== 'string') throw new TypeError("url must be a string.")

        let html, status;
        await fetch(url, options).then(async res => {
            html = await res.text()
            status = res.status
        }).catch(console.error)
        return { html, status }
    }
    /**
     * Parse doujin from URL
     * @param {string} url 
     * @returns {Promise<Doujin>}
     */
    async parseDoujinByURL(url) {
        if (!url) throw new SyntaxError("url is required parameter.")
        if (typeof url !== 'string') throw new TypeError("url must be a string.")

        const res = await this.getPage(url)
        const doujin = new Doujin(res.html, url, res.status)
        
        return doujin
    }
    /**
     * Parcse all doujins from \<a href="path/to/page"\>\</a\> elements
     * @param {cheerio.Cheerio<cheerio.Element>} elements
     * @return {Promise<Array<Doujin>>}
     */
    async parseAllURLsFromElements(elements) {
        if (!elements) throw new SyntaxError("elements is required parameter.")

        if(elements.length === 0) throw new Error('Doujins not found')
        if(elements.length === 1) return [ await this.parseDoujinByURL(elements.attr('href')) ]
        
        const doujins = []
        return new Promise((resolve, reject) => {
            elements.each(async (i, el) => {
                const parsedDoujin = await this.parseDoujinByURL(el.attribs.href)
                if(parsedDoujin) doujins.push(parsedDoujin)

                if(i === elements.length - 1) return resolve(doujins)
            })
        })
    }
}

module.exports = Utils;