const manytoon = require('../src')

const parser = new manytoon.Parser()

async function getPopular() {
    const popular = await parser.getPopularUpdates()
    console.log(popular)
}
getPopular()