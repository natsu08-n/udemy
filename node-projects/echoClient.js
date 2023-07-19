const net = require('net');

const SERVER_IP = '127.0.0.1'
const SERVER_PORT = '3000'

//通信の出入り口を準備
const socket = new net.Socket()

//IPアドレスとポート番号を指定して、接続
//３つ目の引数には、接続したら実行したいコールバックの内容を書く
socket.connect(SERVER_PORT, SERVER_IP, () => {
    console.log(`IPアドレスは ${SERVER_IP} 、ポート番号は ${SERVER_PORT} で接続します`)
})

//標準入力からデータを読み込んだら何をするかを設定する
//（余談）標準入力とは通常はキーボード入力から受け取るやつ。場合によってファイルからデータ受け取りになったりする。
process.stdin.on('data', (data) => {
    //データを読み込んだら、通信の出入り口に書き込む
    //つまり、接続先に向けてメッセージを送る
    socket.write(data)
})

//通信の出入り口からデータを受け取ったら何をするか設定する。
socket.on('data', (data) => {
    console.log(`received: ${data}`);
})