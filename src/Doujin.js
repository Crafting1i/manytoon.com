// @ts-nocheck
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const qs = require('qs')
const data = qs.stringify({
    'action': 'wp-manga-save-rating',
    'star': '4',
    'postID': '3048' 
});

/**
     * Get DOM tree from URL
     * @param {string} url
     * @param {object} [options]
     * @returns {Promise<string>}
     */
async function getPage(url, options = {}) {
    if (!url) throw new SyntaxError("url is required parameter.")
    if (typeof url !== 'string') throw new TypeError("url must be a string.")
    
    const page = fetch(url, options).then(res => res.text()).catch(console.error)
    return page
}

class Doujin {
    // Private propertyes
    #blacklist
    #html
    /**
     * Doujin
     * @param {string} html HTML
     * @param {string} url
     * @param {number} statusCode
     */
    constructor(html, url, statusCode) {
        if (!html) throw new SyntaxError("html is required argument.")
        if(typeof url !== "string") throw new TypeError("html must be a string.")

        if (!url) throw new SyntaxError("url is required argument.")
        if (typeof url !== "string") throw new TypeError("url must be a string.")

        this.#blacklist = ['miku hatsune', 'hatsune', 'miku', 'hatsune_miku', 'miku_hatsune', 'hatsunemiku', 'mikuhatsune', 'mikunhatsune', 'hatsunemikun', 'mikun', 'hatsune no miku', 'miku no hatsune', 'hatsune miku', 'hatsune-miku', 'miku-hatsune', 'miku-chan']
        this.#html = html
        this.statusCode = statusCode
        
        const $ = cheerio.load(this.#html)
        const content = $('.summary_content')

        // Seacching
        // Name
        const nameTags = $('.post-title > h3')[0]?.children.length ?  $('.post-title > h3')/*Choice element with h3*/[0]/*Getting text*/.children
        : $('.post-title > h1')/*Choice element with h1*/[0]/*Getting text*/.children
        const name = nameTags[nameTags.length - 1].data.trim()
        const regexForSearchForbiddenNames = new RegExp(`\\b(${this.#blacklist.join('|')})\\b`, 'gi')
        if(name.match(regexForSearchForbiddenNames)) {
            this.statusCode = 500
            this.name = ''
            
            this.rating = 'N/A'
            this.totalVotes = 'N/A'

            this.rank = 'N/A'
            this.montlyViews = 'N/A'

            this.status = ''
            this.releaseYear = 'N/A'

            this.genres = []
            
            this.url = ''
            this.img = ''
        } else {
            this.name = name
        
            // Score rating
            this.rating = content.find('.post-content > .post-rating span.score')/*Choice element with score*/[0].children[0]/*Text collecting*/.data.trim()
            // Total votes
            this.totalVotes = (content.find('#countrate').length) ? content.find('#countrate')[0].children[0]/*Choice text with total votes*/.data.trim() /*Take total votes count*/ : '0'

            // Rating rank
            this.rank = content.find('.post-content > .post-content_item > .summary-content')[1].children.length !== 3
            ? this.#find('Rank', /.{0,3}(?=,)/g) //Take rank
            : 'N/A';
            // Montly views
            this.montlyViews = content.find('.post-content > .post-content_item > .summary-content')[1].children.length !== 3
            ? this.#find('Rank', /\d{0,}\.?\w{1,}(?=( view| monthly))/i)
            : 'N/A'
            // Status
            this.status = this.#find('Status')
            // Year of release
            this.releaseYear = this.#find('Release') || 'None'

            // Genres
            this.genres = content.find('.post-content > .post-content_item .genres-content a').toArray().map(el => el.children[0].data.trim()) //Getting all this genres

            // URLs
            this.img = $('.summary_image img').attr('src') //Take src from img tag
            this.url = (url.endsWith('/')) ? url : url + '/'
        }
    }
    /**
     * **Returns the chapter(s) according to the method**
     * @param {string} method
     * @returns {Promise<string | string[]>} 
     */
    async #getChapters(method) {
        const options = {
            method: 'POST',
            headers: { 
                'accept': ' */*', 
                'accept-encoding': ' gzip, deflate, br', 
                'accept-language': ' ru', 
                'content-length': ' 46', 
                'content-type': 'application/x-www-form-urlencoded', 
                'cookie': '_ga=GA1.2.1217083287.1628759472; _gid=GA1.2.309734925.1628759472; __cf_bm=ad0138ba90e83ad024921ce0c52d76b32b1e5b5a-1628767550-1800-AV6QyVw1ZTlXhHt3yQXwFBrKje+t0Xz3evrhs4Dvw+MN777feJ2HrgISfJUojLwMhQq0KxO7ekNt6v71hNQ6jHZX42zcT4gz7r0RuBPRy97xcrOjxY5zPFjJBxID2wqCow==; _gat_gtag_UA_135624187_1=1; PHPSESSID=1pbbqtm1s57l9dk4fi53flut0a', 
                'origin': 'https://manytoon.com', 
                'referer': this.url, 
                'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-origin', 
                'user-agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)', 
                'x-requested-with': 'XMLHttpRequest'
            },
            data
        }
        
        const html = await getPage(this.url + 'ajax/chapters/', options)
        const $ = cheerio.load(html)
        
        
        const chaptersMethods = {
            first: () => $('.listing-chapters_wrap .wp-manga-chapter').eq(-1)[0].children[1]/*Getting 'a' tag*/.attribs.href, //First chapter
            last: () => {
                return $(`.listing-chapters_wrap .wp-manga-chapter`).eq(0)[0].children[1]/*Getting 'a' tag*/.attribs.href //Last chapter
            },
            all: () => {
                return $('.listing-chapters_wrap .wp-manga-chapter').toArray().map(chapter => chapter.children[1]/*Getting 'a' tag*/.attribs.href)
            }
        }

        if(chaptersMethods[method]) return chaptersMethods[method]()
        else throw new Error(`"${method}" is not valid method`)
    }

    /**
     * **Returns a first chapter**
     * @returns {Promise<string>}
     */
    async getFirstChapter() {
        const firstChapter = await this.#getChapters('first')
        return firstChapter
    }
    /**
     * **Returns a last chapter**
     * @returns {Promise<string>}
     */
    async getLastChapter() {
        const lastChapter = await this.#getChapters('last')
        return lastChapter
    }
    /**
     * **Returns an all chapters**
     * @returns {Promise<string[]>}
     */
    async getAllChapters() {
        const chapters = await this.#getChapters('all')
        return chapters
    }

    /**
     * **Finding properties from name and regexp**
     * @param {string} name
     * @param {RegExp} [regex]
     * @returns {string}
     */
    #find(name, regex) {
        const $ = cheerio.load(this.#html)
        const content = $('.post-content_item')

        let resp, result;
        result = content.toArray().find(el => {
            return el.children.filter(elem => elem.type != 'text' && elem.attribs.class == 'summary-heading').some(element => {
                return element.children.filter(elem => elem.type != 'text')[0].children[0].data.trim().toLowerCase() == name.toLowerCase()
            })
        }).children.filter(el => el.type != 'text').find(el => el.attribs.class == 'summary-content').firstChild.data.trim()
        if (regex) resp = result.match(regex)?.[0] || result.match(regex)
        else resp = result

        return resp
    }
}

module.exports = Doujin