

function printReport(pages) {
    let sortedPages = Array.from(pages.entries()).sort((a, b) => b[1] - a[1]);

    for (let [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`);
    }
};

module.exports = {
    printReport
};