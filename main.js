const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

const { argv } = require('node:process');

async function main() {
    if (argv.length < 3) {
        console.log('Error: URL not provided. Usage: node main.js <URL>');
        process.exit(1);
    }
    if (argv.length > 3) {
        console.log('Error: Too many arguments. Usage: node main.js <URL>');
        process.exit(1);
    }

    console.log(`Starting crawl at ${argv[2]}`);

    let pages = await crawlPage(argv[2], argv[2], new Map());


    console.log('\n\nCrawl complete. Printing report...\n\n');
    printReport(pages);
}


main()