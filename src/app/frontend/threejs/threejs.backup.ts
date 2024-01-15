import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

@Component({
  selector: 'app-threejslogo',
  templateUrl: './threejslogo.component.html',
  styleUrls: ['./threejslogo.component.sass']
})
export class ThreejslogoComponent {
  loader = new GLTFLoader();
  canvasSizes: any;

  ngOnInit(): void {
    this.createThreeJsBox();
  }
  
  createThreeJsBox(): void {
    const tablet = window.matchMedia("(max-width: 991.98px)");
    const mobile = window.matchMedia("(max-width: 575.98px)");
    const canvas = document.getElementById('canvas');

    //scene
    const scene = new THREE.Scene();

    //canvas
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //camera
    // const camera = new THREE.PerspectiveCamera(
    //   60,
    //   1,
    //   1,
    //   1000
    // );
    const camera = new THREE.OrthographicCamera(
      innerWidth/-2, innerWidth/2, innerHeight/2, innerHeight/-2, 0.2, 2000
    );
    camera.position.z = 30;
    camera.zoom = 30;

    //check canvas
    if (!canvas) {
      return;
    }

    //renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias:true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //ambientLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //pointLight
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    //dracoLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    // Specify path to a folder containing WASM/JS decoding libraries.
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    // Optional: Pre-fetch Draco WASM/JS module.
    dracoLoader.preload();
    this.loader.setDRACOLoader( dracoLoader );
    let base = new THREE.Object3D();
    scene.add(base);
    // Load a glTF resource
    this.loader.load(
      // resource URL
      // './assets/3DLogo/KaiganLogo3D_temp.glb',
      './assets/3DLogo/new/KaiganLogo3D.glb',
      // called when the resource is loaded
      function ( gltf ) {
        // var Model3D: THREE.Object3D<THREE.Event>;
        if(mobile.matches){
          gltf.scene.scale.set(2, 4.5, 2);
          base = gltf.scene;
          scene.add(base)
        }
        else if(tablet.matches){
          gltf.scene.scale.set(2.5, 3, 2);
          base = gltf.scene;
          scene.add(base); 
        } 
        else {
          gltf.scene.scale.set(6, 9, 6);
          base = gltf.scene;
          scene.add(base); 
          console.log('desktop');
          
        }

        // Render
        renderer.setSize(canvasSizes.width, canvasSizes.height);
        renderer.render(scene, camera);
        // animateGeometry();
      },
      // called while loading is progressing
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened', error );
      }
    );

    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -16);
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var pointOfIntersection = new THREE.Vector3();
    canvas.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(event: MouseEvent){
      console.log('on Mouse Move');
      
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 1.5 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, pointOfIntersection);
      base.lookAt(pointOfIntersection);
    }

    renderer.setAnimationLoop(() => {
      if (resize(renderer)) {
        // camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
    });

    function resize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  }
}
