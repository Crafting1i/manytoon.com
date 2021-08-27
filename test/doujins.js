const manytoon = require('manytoon.com')
const parser = new manytoon.Parser()

async function logDoujins() {
    const doujin = await parser.getDoujin('https://manytoon.com/comic/gu-hos-escape-mnt0015/')
    console.log(doujin);
    console.log(await doujin.getAllChapters())
    console.log(await doujin.getFirstChapter())
    console.log(await doujin.getLastChapter())

    const page = await parser.getHomepage()
    console.log(page[0])
    console.log(page.map(doujin => doujin.name))
}
logDoujins()