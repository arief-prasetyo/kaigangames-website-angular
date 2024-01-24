import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

@Component({
  selector: 'app-three-js-on-mobile',
  templateUrl: './three-js-on-mobile.component.html',
  styleUrls: ['./three-js-on-mobile.component.sass']
})
export class ThreeJsOnMobileComponent {
  loader = new GLTFLoader();
  canvasSizes: any;

  ngOnInit(): void {
    this.createThreeJsBox();
  }
  
  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-mobile');
    //scene
    const scene = new THREE.Scene();
    //camera
    const camera = new THREE.OrthographicCamera(
      innerWidth/-2, innerWidth/2, innerHeight/2, innerHeight/-2, 0.2, 2000
    );
    camera.position.z = 30;
    camera.zoom = 30;
    //canvas
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
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
    //shadow map
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //dracoLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    // Specify path to a folder containing WASM/JS decoding libraries.
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    // Optional: Pre-fetch Draco WASM/JS module.
    dracoLoader.preload();
    this.loader.setDRACOLoader( dracoLoader );
    let base = new THREE.Object3D();
    //cast shadow
    base.castShadow = true;
    base.receiveShadow = false;
    scene.add(base);

    // Load a glTF resource
    this.loader.load(
      // resource URL
      './assets/3DLogo/new/KaiganLogo3DFlat.glb',
      // called when the resource is loaded
      function ( gltf ) {
        // if(window.innerWidth <= )
        // console.log(window.innerWidth);
        
        gltf.scene.scale.set(4,9,4);
        base = gltf.scene;
        scene.add(base); 

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
      
    window.addEventListener("resize", () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(window.devicePixelRatio);
      // console.log('resize');
      
    })

    renderer.setAnimationLoop(() => {
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera);
    });

    //ambientLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //pointLight
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    //light
    const light = new THREE.DirectionalLight(0xfffff, 1);
    light.position.set(0,1,0);
    light.castShadow = true;
    scene.add(light)

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
  }
}
