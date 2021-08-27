const manytoon = require('manytoon.com')

const parser = new manytoon.Parser()

async function getPopular() {
    const popular = await parser.getPopularUpdates()
    console.log(popular)
}
getPopular()