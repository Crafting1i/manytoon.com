// @ts-check
const manytoon = require('manytoon.com')

async function init() {
    let params = [...process.argv]
    params.shift()
    params.shift()
    let method = params.length ? params.shift() : 'None'

    let parser = new manytoon.Parser()
    if(typeof parser[method] === 'function') console.log(await parser[method](params.join(' ')));
    else throw new Error(`"${method}" is not a valid method`)
}
// node terminal.js <method> [<params>]
init()