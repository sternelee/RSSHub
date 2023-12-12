const parser = require('@/utils/rss-parser');

// 程序猿周报合集

const URLs = {
    javascript: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml',
    nodejs: 'https://cprss.s3.amazonaws.com/nodeweekly.com.xml',
    frontend: 'https://cprss.s3.amazonaws.com/frontendfoc.us.xml',
    'react-status': 'https://cprss.s3.amazonaws.com/react.statuscode.com.xml',
    golang: 'https://cprss.s3.amazonaws.com/golangweekly.com.xml',
    serverless: 'https://serverless.email/rss/',
    deno: 'https://buttondown.email/denonews/rss',
    tailwind: 'https://tailwindweekly.com/rss/',
    css: 'http://feeds.feedburner.com/CSS-Weekly',
    rust: 'https://this-week-in-rust.org/rss.xml',
    react: 'https://thisweekinreact.com/newsletter/rss.xml',
    android: 'https://androidweekly.net/rss.xml',
    ios: 'https://iosdevweekly.com/issues.rss',
    'js-tools': 'https://jstools.substack.com/feed',
    'web-tools': 'https://us5.campaign-archive.com/feed?u=ea228d7061e8bbfa8639666ad&id=104d6bcc2d',
    typescript: 'https://us14.campaign-archive.com/feed?u=809daf9442ece0a92a3d65f99&id=5693c0ed42',
    postgres: 'https://cprss.s3.amazonaws.com/postgresweekly.com.xml',
    jamstack: 'https://cprss.s3.amazonaws.com/jamstack.email.xml',
    // mobile: 'https://cprss.s3.amazonaws.com/mobiledevweekly.com.xml',
    ruby: 'https://cprss.s3.amazonaws.com/rubyweekly.com.xml',
    // db: 'https://cprss.s3.amazonaws.com/dbweekly.com.xml',
    wasm: 'https://wasmweekly.news/feed.xml',
    'rust-wasm': 'https://rustwasm.github.io/feed.xml',
    vscode: 'https://us5.campaign-archive.com/feed?u=ea228d7061e8bbfa8639666ad&id=97e12d9faf',
    python: 'https://us2.campaign-archive.com/feed?u=e2e180baf855ac797ef407fc7&id=9e26887fc5',
    php: 'https://www.phpweekly.com/rss.xml',
    neovim: 'https://dotfyle.com/this-week-in-neovim/rss.xml',
    emacs: 'https://sachachua.com/blog/category/weekly/feed/',
    'the-new-stack': 'https://thenewstack.io/blog/feed/',
    esnext: 'http://feeds.feedburner.com/EsnextNews',
};

module.exports = async (ctx) => {
    const type = ctx.params.type || 'javascript';
    const url = URLs[type];
    const { items, ...rest } = await parser.parseURL(url);
    ctx.state.data = {
        ...rest,
        item: items.map((item) => ({
            title: item.title,
            description: ['react', 'tailwind', 'js-tools', 'the-new-stack'].includes(type) ? item['content:encoded'] : item.content,
            pubDate: item.pubDate,
            link: item.link,
        })),
    };
};
