import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
const viewer = document.getElementById("viewer");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xebf8ff);

var width = (window.innerWidth * 3) / 8;
var height = (width * 3) / 4;
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
camera.position.set(63,38,99);
// camera.lookAt(100,100,10);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
viewer.appendChild(renderer.domElement);
viewer.style.borderRadius = "30px";

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableRotate = true;
controls.enablePan = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.75);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-5, 5, 10);
directionalLight.lookAt(10,1,1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight2.position.set(10,3,-15);
directionalLight2.lookAt(-5, 5, 10);
scene.add(directionalLight, directionalLight2);

const loader = new FBXLoader();

loader.load( 'EnhetFinal2.fbx', function (object) {
    object.position.set(300,-35,0);
    object.scale.set(1, 1,1);
    scene.add(object);
})

function onResize() {

    if (window.innerWidth< 1024){
        width = window.innerWidth*.80;
    }
    else{
        width=(window.innerWidth * 3) / 8;
    }
     height = width * .75;

    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

}

window.addEventListener( 'resize', onResize );
onResize();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

