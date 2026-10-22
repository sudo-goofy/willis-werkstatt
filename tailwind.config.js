// Build: npx tailwindcss@3.4.19 -i css/tailwind.src.css -o css/site.css --minify
// Nach jeder Änderung an Klassen in index.html neu bauen.
module.exports = {
    content: ['./index.html'],
    theme: { extend: { colors: {
        // WOGENAU-Farbwelt (aus wogenau.haus abgeleitet)
        paper:'#f5ead2', card:'#fffaf0', sand:'#e7d4ab', sandw:'#f4e6c9',
        ink:'#221f1c', 'ink-soft':'#4c453c',
        wred:'#c1343f', 'wred-dk':'#ad2f38',
        mint:'#a5c8c0', 'mint-dk':'#85b5aa', mintw:'#eaf3f0',
        lachs:'#e59c90', lachsw:'#fbeee9',
        catgreen:'#9ac79a', catblue:'#7fabd6',
        honey:'#f1d27a', honeyw:'#f8ead0'
    }}}
};
