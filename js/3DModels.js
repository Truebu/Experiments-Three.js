import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/OrbitControls.js";
import Stats  from "../jsm/stats.module.js";
import { GLTFLoader } from '../jsm/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background= new THREE.Color( 0xFEFDFC );
scene.fog = new THREE.Fog(0xffffff, 10, 100);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const light = new THREE.DirectionalLight( 0xffffff);
light.position.set(1, 1, 1);
scene.add( light );

window.addEventListener("resize", resize);

function resize (){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 50;

const stats = new Stats();
const createStats = function(){
    stats.setMode(2);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "100px";
    stats.domElement.style.top = "10px";
    document.getElementById("stats").appendChild(stats.domElement);
    return stats;
}

//Create a script using 3D model
const loader = new GLTFLoader();

loader.load( '../assets/teapot.glb', function ( gltf ) {
    gltf.scene.position.y = 5;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 50;

const animate= function() {
	requestAnimationFrame( animate );
    
    stats.update();
	renderer.render( scene, camera );
}
animate();
createStats();