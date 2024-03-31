const {test, expect} = require('@jest/globals');

const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


test('normalizeURLsimple', () => {
    expect(normalizeURL('http://www.example.com')).toBe('www.example.com');
},)
test('normalizeURLsimpleWithSlash', () => {
    expect(normalizeURL('http://www.example.com/')).toBe('www.example.com');
},)
test('normalizeURLsimpleHTTPs', () => {
    expect(normalizeURL('https://www.example.com')).toBe('www.example.com');
},)
test('normalizeURLsimpleHTTPsWithSlash', () => {
    expect(normalizeURL('https://www.example.com/')).toBe('www.example.com');
},)
test('normalizeURLWithPath', () => {
    expect(normalizeURL('http://www.example.com/foo')).toBe('www.example.com/foo');
},)
test('normalizeURLWithPathandSlash', () => {
    expect(normalizeURL('http://www.example.com/foo/')).toBe('www.example.com/foo');
},)
test('normaliazeURLHTTPsWithPath', () => {
    expect(normalizeURL('https://www.example.com/foo')).toBe('www.example.com/foo');
},)
test('normaliazeURLHTTPsWithPathandSlash', () => {
    expect(normalizeURL('https://www.example.com/foo/')).toBe('www.example.com/foo');
},)
test('normaliazeURLWithLongPath', () => {
    expect(normalizeURL('http://www.example.com/foo/bar')).toBe('www.example.com/foo/bar');
},)
test('normaliazeURLWithLongPathandSlash', () => {
    expect(normalizeURL('http://www.example.com/foo/bar/')).toBe('www.example.com/foo/bar');
},)
test('normaliazeURLHTTPsWithLongPath', () => {
    expect(normalizeURL('https://www.example.com/foo/bar')).toBe('www.example.com/foo/bar');
},)
test('normaliazeURLHTTPsWithLongPathandSlash', () => {
    expect(normalizeURL('https://www.example.com/foo/bar/')).toBe('www.example.com/foo/bar');
},)


test('getURLsFromHTML', () => {
    body1 = '<html><body><a href="/foo">Example</a></body></html>';
    console.log(getURLsFromHTML(body1, 'http://www.example.com'));
    expect(getURLsFromHTML(body1, 'http://www.example.com')).toEqual(['http://www.example.com/foo']);
},)

test('getManyURLsFromHTML', () => {
    body1 = '<html><body><a href="/foo">Example</a><a href="/bar">Example</a><div>some things</div><a href="http://www.example.com/thingy/with/things/"></a></body></html>';
    expect(getURLsFromHTML(body1, 'http://www.example.com')).toEqual(['http://www.example.com/foo', 'http://www.example.com/bar', 'http://www.example.com/thingy/with/things/']);
},)