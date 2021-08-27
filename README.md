<h1 align="center" font-weight="bold" style="font-size: 60px">Manytoon<span style='font-size: 15px;'>.com</span></h1>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
  <img src="https://img.shields.io/npm/dt/manytoon.com" alt="NPM downloads">
  <img src="https://img.shields.io/npm/v/manytoon.com" alt="NPM version">
</p>

> #### Simple parser for [Manytoon](https://manytoon.com).
> #### Recommended for REST API and Bots

# Installation
```bash
$ npm install manytoon.com
```

# Usage
Require a library and... just use

```js
const Manytoon = require('manytoon.com')
const parser = new Manytoon.Parser() 

async function testParser() {
    const girlPage = await parser.search('Girl')
    console.log(girlPage) //Returns a 60 doujins on page

    const simplePage = await parser.getHomepage()
    console.log(simplePage)

    const popularUpdates = await parser.getPopularUpdates()
    console.log(popularUpdates)

    const firstDoujin = simplePage[0]
    console.log(firstDoujin)

    const doujin = await parser.getDoujin('https://manytoon.com/comic/gu-hos-escape-mnt0015/')
    console.log(doujin);
}
testParser()
```

# Classes

## **Parser**
### constructor()
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | ------- |
> | None      | any    | None        | false   |

### Methods
> #### **\.getDoujin(url)**
> Getting a doujin from manytoon.com URL
> | Parameter | Type                                                                                              | Description              | Required |
> | --------- | ------------------------------------------------------------------------------------------------- | ------------------------ | -------- |
> | url       | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | URL for getting a doujin | true     |
>
> Example: 
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logDoujin() {
>     const doujin = await parser.getDoujin()
>     console.log(doujin)
> }
> logDoujin()
> ```
>
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Doujin](##doujin)\>*

> #### **\.getHomepage()**
> Get the homepage
> 
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logHome() {
>     const page = await parser.getHomepage()
>     console.log(page)
> }
> logHome()
> ```
> 
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Page](##page)\<[Doujin](##doujin)\>>*

> ### **\.getPopularUpdates()**
> Get the latest popular updates
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logPopular() {
>     const popularUpdates = await parser.getPopularUpdates()
>     console.log(popularUpdates)
> }
> logPopular()
> ```
> 
> *Returns:  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[Doujin](##doujin)\>>*

> ### **\.search(target)**
> Do search doujins from name
> 
> | Parameter | Type                                                                                              | Description        | Required |
> | --------- | ------------------------------------------------------------------------------------------------- | ------------------ | -------- |
> | target    | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Name for searching | true     |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logFound() {
>     const page = await parser.search('girl')
>     console.log(page)
> }
> logFound()
> ```
> 
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Page](##page)\<[Doujin](##doujin)\>>*

------

## **Page**
### constructor(options)
> | Parameter        | Type                                                                                                                 | Description               | Required |
> | ---------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- |
> | options          | [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)                    | Options for creating page | true     |
> | options.html     | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                    | HTML text                 | true     |
> | options.isHome   | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                  | Is homepage or not        | true     |
> | options.lastPage | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)                    | Number of last page       | true     |
> | options.target   | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                    | Search target             | false    |
> | options.doujins  | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[Doujin](#doujin)\> | Doujins' Array            | true     |

### Methods
> #### **\.to(page)**
> Returns the page by its number
>
> | Parameter        | Type                                                                                                                 | Description               | Required |
> | ---------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- | 
> | page             | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)                    | Page number               | true     |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logPage() {
>     const page = await parser.getHomepage()
>     console.log(await page.to(4))
> }
> logPage()
> ```
>
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Page](##page)\<[Doujin](##doujin)\>>*

> #### **\.next()**
> Returns the next page
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function loSecondgPage() {
>     const page = await parser.getHomepage()
>     console.log(await page.next())
> }
> logSecondPage()
> ```
>
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Page](##page)\<[Doujin](##doujin)\>>*

> #### **\.prev()**
> Returns the previous page
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function loSecondgPage() {
>     const page = await parser.getHomepage()
>     const threerdPage = await page.to(3)
>     console.log(threerdPage.prev())
> }
> logSecondPage()
> ```
>
> *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Page](##page)\<[Doujin](##doujin)\>>*

> #### **\.getCurrentPageNumber()**
> Returns the current page
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
>
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logSecondgPage() {
>     const page = await parser.getHomepage()
>     const secondPage = await page.next()
>     console.log(secondPage.getCurrentPageNumber())
> }
> logSecondPage()
> ```
>
> *Returns: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)*

> #### **\.getLastPageNumber()**
> Returns the current page
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
> 
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logLastPageNumber() {
>     const page = await parser.getHomepage()
>     console.log(secondPage.getLastPage())
> }
> logLastPageNumber()
> ```
>
> *Returns: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)*

---

## **Doujin**
### constructor(html, url, statusCode)
> | Parameter  | Type                                                                                              | Description | Required |
> | ---------- | ------------------------------------------------------------------------------------------------- | ----------- | ------- |
> | html       | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | None        | true    |
> | url        | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | None        | true    |
> | statusCode | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | None        | true    |

### Properties
```ts
statusCode: number;
name: string;
rating: string;
totalVotes: string;
rank: string;
montlyViews: string;
status: string;
releaseYear: string;
genres: string[];
url: string;
img: string;
```

### Methods 
> #### **\.getAllChapters()**
> Returns all chapters
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
> 
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logAllChapters() {
>     const page = await parser.getHomepage()
>     console.log(await parser[0].getAllChapters())
> }
> logAllChapters()
> ```
>
> *Returns: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\>*

> #### **\.getLastChapter()**
> Getting a last chapter
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
> 
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logLastChapter() {
>     const page = await parser.getHomepage()
>     console.log(await parser[0].getLastChapter())
> }
> logLastChapter()
> ```
>
> *Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)*

> #### **\.getFirstChapter()**
> Getting a last chapter
>
> | Parameter | Type   | Description | Required |
> | --------- | ------ | ----------- | -------- |
> | None      | any    | None        | false    |
> 
> Example:
> ```js
> const Manytoon = require('manytoon.com')
> const parser = new Manytoon.Parser() 
> 
> async function logFirstChapter() {
>     const page = await parser.getHomepage()
>     console.log(await parser[0].getFirstChapter())
> }
> logFirstChapter()
> ```
>
> *Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)*

---

## Support

[Discord Server](https://discord.gg/zhVPBpn3pU)

---

## License
MIT License

Copyright © Crafting1i