const jsdom = require('jsdom');
const { JSDOM } = jsdom;


function normalizeURL(url) {
    const urlObject = new URL(url);
    let path = urlObject.hostname + urlObject.pathname;
    return path.endsWith('/') ? path.slice(0, -1) : path;
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document; // Corrected line
    const url_elements = document.querySelectorAll('a');
    const urls = [];
    for (let i = 0; i < url_elements.length; i++) {
        const url = url_elements[i].getAttribute('href');
        if (url) {
            urls.push(new URL(url, baseURL).toString());
        }
    }

    return urls;
}


// Pages should be a new map
async function crawlPage(currentURL, baseURL, pages) {
    if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
        return pages;
    }
    let ncURL = normalizeURL(currentURL);
    if (pages.has(ncURL)) {
        pages.set(ncURL, pages.get(ncURL) + 1);
        return pages
    } else {
        pages.set(ncURL, 1);
    }
    console.log(`Crawling ${currentURL}`);
    try {
        let response = await fetch(currentURL);
        if (response.status >= 400) {
            console.error('Error: Page not found');
            return pages;
        }
        if (!response.headers.get('content-type').includes('text/html')) {
            console.error(`Error: Page ${currentURL} is not an HTML page`);
            return pages;
        }

        let body = await response.text();
        let newURLs = getURLsFromHTML(body, currentURL);
    
        await Promise.all(newURLs.map(async (url) => {
            await crawlPage(url, baseURL, pages);
        }));

    } catch (error) {
        console.error('There was an error fetching the page:', error);
    }
    return pages;
}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};