import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/OrbitControls.js";

const scene = new THREE.Scene();
scene.background= new THREE.Color( 0xFEFDFC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const material = new THREE.MeshLambertMaterial({color: 0x46DCBE, wireframe : true});

const cube = new THREE.Mesh( new THREE.BoxGeometry(), material );
cube.position.x= -3;
cube.position.y= 3;
scene.add( cube );

const cylinder = new THREE.Mesh( new THREE.CylinderGeometry(), material );
cylinder.position.x= 3;
cylinder.position.y= 3;
scene.add( cylinder );

const cone = new THREE.Mesh( new THREE.ConeGeometry(), material );
cone.position.x= -3;
cone.position.y= -3;
scene.add( cone );

const torus = new THREE.Mesh( new THREE.TorusGeometry(), material );
torus.position.x= 3;
torus.position.y= -3;
scene.add( torus );

window.addEventListener("resize", resize);

function resize (){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 20;

camera.position.z = 8;

const animate= function() {
	requestAnimationFrame( animate );
    
    scene.traverse(function (object){
        if(object.isMesh){
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;
        }
    });

	renderer.render( scene, camera );
}
animate();