// npm run api
const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"),  
        JSON.stringify(data, null, 4),
        (err) => {
            if (err){
                throw err
            }
            cb(JSON.stringify({message: 'Ok'}))
        }
    )
}

function ignoreFavicon(req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(204, {'Content-Type': 'image/x-icon'} );
    }
}

http.createServer((req, res) => {
    ignoreFavicon(req, res)

    res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
   
    const {name, url, del} = URL.parse(req.url, true).query

    // Todos os Recursos
    if(!name || !url){
        return res.end(JSON.stringify(data))
    } 

    if(del) {
        console.log(url)
        data.urls = data.urls.filter((item) => String(item.url) !== String(url))  
        return writeFile((message) => res.end(message))
    }

    data.urls.push({name, url})

    return writeFile((message) => res.end(message))
}).listen(5000, () => console.log('API is Running')) 