console.log(`  ____  _               _                  ____          _               \n / ___|| |__   __ _  __| | _____      __  / ___|___   __| | ___ _ __ ___ \n \\___ \\| '_ \\ / _\` |/ _\` |/ _ \\ \\ /\\ / / | |   / _ \\ / _\` |/ _ \\ '__/ __|\n  ___) | | | | (_| | (_| | (_) \\ V  V /  | |__| (_) | (_| |  __/ |  \\__ \\\n |____/|_| |_|\\__,_|\\__,_|\\___/ \\_/\\_/    \\____\\___/ \\__,_|\\___|_|  |___/\n                                                                         `);
const favicons =  (`<link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/faviconapple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="faveicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
<link rel="manifest" href="favicon/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="favicon/ms-icon-144x144.png">`)
let head = document.getElementsByTagName('head')[0]
if(!head) head = document.createElement('head')
head.innerHTML += favicons
try {
    if(!socket) let socket;
    if(io) socket = io();
    if(socket) {
        socket.emit('page', window.location.href)
    }
    
} catch (e) {

}
