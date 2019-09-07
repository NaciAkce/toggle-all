module.exports = {
    content: ['src/index.html'],
    css: ['src/styles.css', 'src/fonts.css'],
    whitelistPatterns: [/^is--/],
    extractors: [
        {
            extractor: class {
                static extract(content) {
                    return content.match(/[A-z0-9-:\/]+/g) || [];
                }
            },
            extensions: ['html', 'js']
        }
    ]
};
