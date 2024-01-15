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

    const camera = new THREE.OrthographicCamera(
      innerWidth/-2, innerWidth/2, innerHeight/2, innerHeight/-2, 0.2, 2000
    );
    camera.position.z = 30;
    camera.zoom = 30;

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
      './assets/3DLogo/new/KaiganLogo3DFlat.glb',
      // called when the resource is loaded
      function ( gltf ) {
        // var Model3D: THREE.Object3D<THREE.Event>;
        if(mobile.matches){
          gltf.scene.scale.set(3, 6.5, 3);
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

        const clock = new THREE.Clock();
        const animateGeometry = () => {
          const elapsedTime = clock.getElapsedTime();
          base.rotation.y = -elapsedTime;
  
          // Render
          renderer.render(scene, camera);
  
          // Call animateGeometry again on the next frame
          window.requestAnimationFrame(animateGeometry);
        };
        animateGeometry();
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

    //ambientLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //pointLight
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

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
