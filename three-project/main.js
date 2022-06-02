import * as THREE from "./build/three.module.js"

//シーンとカメラとレンダラーが揃うと画面にレンダリングができる

let scene,camera,renderer;


//シーンを追加
scene = new THREE.Scene();

//カメラを追加(視野角、アスペクト比、開始距離、終了距離)
camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//レンダラーを追加
renderer = new THREE.WebGL1Renderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight)

//ブラウザのどこに表示するのか
document.body.appendChild(renderer.domElement);


renderer.rebder(scene, camera) 





