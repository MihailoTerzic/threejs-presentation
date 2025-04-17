import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//const loader = new GLTFLoader();



// Scena, Kamera i Renderer kao 3 osnovne alatke 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// Perspective kamera kao jedna od vrsti kamera, priblizna ljudskom oku
 // ugao vidljivosti,aspect ratio koji stavljamo prema ekranu, near i far rendering koji sluzi da pomogne kameri da "vidi" na blizinu i daljinu
 // ove vrednosti su uglavnom fiksne, sem u posebnim prilikama
const renderer = new THREE.WebGLRenderer();
const canvas = document.querySelector("#app")
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// dodavanje geometrije


//const geometry = new THREE.DodecahedronGeometry(12,0);
const geometry = new THREE.TorusKnotGeometry(14,3,100,16);
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
scene.add( line );
const material = new THREE.MeshBasicMaterial( { color: 0x5D0D17 } ); 
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

camera.position.z = 25;
//const pointLight = new THREE.PointLight(0xffffff)

const controls = new OrbitControls( camera, renderer.domElement );// za pomeranje scene pomocu misa ili strelica

//const gridHelper = new THREE.GridHelper(200,50); // mreza helper
//scene.add(gridHelper)

function addStar() {
	const geom = new THREE.SphereGeometry(0.25,24,24)
	const matt = new THREE.MeshBasicMaterial({color: 0xffffff})
	const star = new THREE.Mesh(geom,matt)

	const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
	star.position.set(x,y,z)
	scene.add(star)
	
}
Array(200).fill().forEach(addStar)
const spaceTexture = new THREE.TextureLoader().load('space3.jpg')
scene.background = spaceTexture;

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;
	torus.rotation.z += 0.01;

	line.rotation.x += 0.01;
	line.rotation.y += 0.01;
	line.rotation.z += 0.01;

	//camera.position.z = t* -0.01
	camera.position.x = t* -0.0002
	camera.position.y = t* -0.0004
	//console.log(camera.position)
}
document.body.onscroll = moveCamera

function animate() { // infinite loop za prikaz scene
	requestAnimationFrame( animate );
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;
	torus.rotation.z += 0.01;

	line.rotation.x += 0.01;
	line.rotation.y += 0.01;
	line.rotation.z += 0.01;
	
controls.update();
	renderer.render( scene, camera ); // render scene
}
animate();
