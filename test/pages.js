const manytoon = require('manytoon.com')

const parser = new manytoon.Parser()

async function logPages() {
    const girlPage = await parser.search('Girl')
    console.log(girlPage) //Returns a 60 doujins on page
    console.log(await girlPage.next()) //Returns the next page

    const simplePage = await parser.getHomepage()
    console.log(simplePage) //Returns a homepage
    console.log(await simplePage.to(4)) //Returns 4th page
    console.log(await simplePage.prev()) //Returns 3rd page
    console.log(simplePage.getCurrentPageNumber())
    console.log(simplePage.getLastPageNumber())
}
logPages()