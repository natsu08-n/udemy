const net = require('net')

const PORT = 3000

//接続されたら何をするかを設定する
net.createServer((socket) => {
    // まずは接続されたことを表示する
    console.log('接続できました');

    //データを受け取ったら何をするかを設定する
    socket.on('data', (data) => {
        //受け取ったデータを表示する
        console.log(`received:  ${data}  を受け取りました`)
        //受け取ったデータの内容をそのまま送り返す
        socket.write(data)
    })

    //接続が閉じたら何をするか設定する
    socket.on('close', () => {
        console.log('connection closed')
    })
    //ポートを指定して、サーバーを起動する
}).listen(PORT, '127.0.0.1')

console.log(`${PORT} のポート番号でサーバー通信はじまり`);