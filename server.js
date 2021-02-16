const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    // Verifica o tipo do arquivo
    const extname = path.extname(filePath)

    // Os arquivos liberados
    const allowedFileTypes = ['.html', '.css', '.js']
    // Retorna true se estiver na lista dos liberados ou false caso não.
    const allowed = allowedFileTypes.find((item) => {return item == extname})
    // Isso evita que arquivos como favicon.ico pare a aplicação
    if(!allowed) return

    fs.readFile(
        filePath,
        (err, content) => {
            if(err){
                console.log(err)
            }
    
            res.end(content)
        }
    )

}).listen(3000, () => console.log('Server is Running')) 