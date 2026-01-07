"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import type { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

interface GestureState {
  name: string;
  color: string;
}

export default function KineticParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Loading Libraries");
  const [gesture, setGesture] = useState<GestureState>({
    name: "Initializing...",
    color: "red",
  });

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let mounted = true;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let composer: EffectComposer | null = null;
    let particles: THREE.Points | null = null;
    let animationId: number;
    let cameraUtils: { start: () => void; stop: () => void } | null = null;
    let hands: {
      setOptions: (options: unknown) => void;
      onResults: (callback: (results: unknown) => void) => void;
      send: (data: { image: HTMLVideoElement | null }) => Promise<void>;
    } | null = null;

    const PARTICLE_COUNT = 20000;
    const CAM_Z = 35;

    interface ShapeData {
      pos: Float32Array;
      col: Float32Array;
    }

    interface Shapes {
      sphere: ShapeData;
      saturn: ShapeData;
      heart: ShapeData;
      text: ShapeData;
      sherena: ShapeData;
      birthday: ShapeData;
      cake: ShapeData;
      flower: ShapeData;
      [key: string]: ShapeData;
    }

    const shapes: Shapes = {
      sphere: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      saturn: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      heart: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      text: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      sherena: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      birthday: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      cake: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
      flower: {
        pos: new Float32Array(PARTICLE_COUNT * 3),
        col: new Float32Array(PARTICLE_COUNT * 3),
      },
    };

    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const targetColors = new Float32Array(PARTICLE_COUNT * 3);
    let currentGesture = "None";
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;

    async function loadScripts() {
      const scripts = [
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      ];

      for (const src of scripts) {
        await new Promise<void>((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = src;
          script.crossOrigin = "anonymous";
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
    }

    async function init() {
      if (!canvasRef.current || !videoRef.current) return;

      try {
        setLoadingStatus("Loading Libraries");
        await loadScripts();

        setLoadingStatus("Initializing Three.js");
        const THREE = await import("three");
        const { EffectComposer } = await import(
          "three/examples/jsm/postprocessing/EffectComposer.js"
        );
        const { RenderPass } = await import(
          "three/examples/jsm/postprocessing/RenderPass.js"
        );
        const { UnrealBloomPass } = await import(
          "three/examples/jsm/postprocessing/UnrealBloomPass.js"
        );
        const { FontLoader } = await import(
          "three/examples/jsm/loaders/FontLoader.js"
        );
        const { TextGeometry } = await import(
          "three/examples/jsm/geometries/TextGeometry.js"
        );
        const { MeshSurfaceSampler } = await import(
          "three/examples/jsm/math/MeshSurfaceSampler.js"
        );

        if (!mounted) return;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x1a0a14, 0.001);

        camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = CAM_Z;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.5,
          0.4,
          0.85
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 1.8;
        bloomPass.radius = 0.8;

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 100;
          colors[i] = Math.random();
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        material = new THREE.PointsMaterial({
          size: 0.15,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0.8,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        setLoadingStatus("Generating Math Geometries...");
        await precomputeShapes(
          THREE,
          FontLoader,
          TextGeometry,
          MeshSurfaceSampler
        );

        if (!mounted) return;

        setLoadingStatus("Starting Camera...");
        await initMediaPipe();

        if (!mounted) return;

        setIsLoading(false);
        animate(THREE);
      } catch (error) {
        console.error("Initialization error:", error);
        setLoadingStatus("Error loading. Click to retry.");
        setIsLoading(false);
      }

      function handleResize() {
        if (!camera || !renderer || !composer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    async function precomputeShapes(
      THREE: typeof import("three"),
      FontLoader: typeof import("three/examples/jsm/loaders/FontLoader.js").FontLoader,
      TextGeometry: typeof import("three/examples/jsm/geometries/TextGeometry.js").TextGeometry,
      MeshSurfaceSampler: typeof import("three/examples/jsm/math/MeshSurfaceSampler.js").MeshSurfaceSampler
    ) {
      // Rainbow Sphere
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = 10 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        const idx = i * 3;
        shapes.sphere.pos[idx] = x;
        shapes.sphere.pos[idx + 1] = y;
        shapes.sphere.pos[idx + 2] = z;

        const color = new THREE.Color().setHSL((y + 10) / 20, 1.0, 0.5);
        shapes.sphere.col[idx] = color.r;
        shapes.sphere.col[idx + 1] = color.g;
        shapes.sphere.col[idx + 2] = color.b;
      }

      // Saturn
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const isRing = i > PARTICLE_COUNT * 0.3;

        if (!isRing) {
          const r = 6;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          shapes.saturn.pos[idx] = r * Math.sin(phi) * Math.cos(theta);
          shapes.saturn.pos[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
          shapes.saturn.pos[idx + 2] = r * Math.cos(phi);

          shapes.saturn.col[idx] = 0.1;
          shapes.saturn.col[idx + 1] = 0.3;
          shapes.saturn.col[idx + 2] = 0.8 + Math.random() * 0.2;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const dist = 9 + Math.random() * 6;

          const x = dist * Math.cos(angle);
          const z = dist * Math.sin(angle);
          const y = 0;

          const tilt = 0.5;
          const ry = y * Math.cos(tilt) - z * Math.sin(tilt);
          const rz = y * Math.sin(tilt) + z * Math.cos(tilt);

          shapes.saturn.pos[idx] = x;
          shapes.saturn.pos[idx + 1] = ry;
          shapes.saturn.pos[idx + 2] = rz;

          shapes.saturn.col[idx] = 0.8;
          shapes.saturn.col[idx + 1] = 0.7;
          shapes.saturn.col[idx + 2] = 0.4;
        }
      }

      // Heart
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const t = Math.random() * Math.PI * 2;
        const scale = 0.5;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        const z = (Math.random() - 0.5) * 5;

        shapes.heart.pos[idx] = x * scale;
        shapes.heart.pos[idx + 1] = y * scale + 2;
        shapes.heart.pos[idx + 2] = z;

        shapes.heart.col[idx] = 1.0;
        shapes.heart.col[idx + 1] = 0.05;
        shapes.heart.col[idx + 2] = 0.5;
      }

      // Text
      await new Promise<void>((resolve) => {
        const loader = new FontLoader();
        loader.load(
          "https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json",
          function (
            font: import("three/examples/jsm/loaders/FontLoader.js").Font
          ) {
            const textGeo = new TextGeometry("I LOVE YOU", {
              font: font,
              size: 4,
              height: 1,
              curveSegments: 12,
            });

            textGeo.computeBoundingBox();
            if (textGeo.boundingBox) {
              const centerOffset =
                -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
              textGeo.translate(centerOffset, 0, 0);
            }

            const material = new THREE.MeshBasicMaterial();
            const mesh = new THREE.Mesh(textGeo, material);
            const sampler = new MeshSurfaceSampler(mesh).build();

            const tempPos = new THREE.Vector3();
            for (let i = 0; i < PARTICLE_COUNT; i++) {
              sampler.sample(tempPos);
              const idx = i * 3;
              shapes.text.pos[idx] = tempPos.x;
              shapes.text.pos[idx + 1] = tempPos.y;
              shapes.text.pos[idx + 2] = tempPos.z;

              shapes.text.col[idx] = 1.0;
              shapes.text.col[idx + 1] = 0.84;
              shapes.text.col[idx + 2] = 0.0;
            }

            // SHERENA text
            const sherenaGeo = new TextGeometry("SHERENA", {
              font: font,
              size: 3.5,
              height: 1,
              curveSegments: 12,
            });

            sherenaGeo.computeBoundingBox();
            if (sherenaGeo.boundingBox) {
              const centerOffset =
                -0.5 *
                (sherenaGeo.boundingBox.max.x - sherenaGeo.boundingBox.min.x);
              sherenaGeo.translate(centerOffset, 0, 0);
            }

            const sherenaMesh = new THREE.Mesh(sherenaGeo, material);
            const sherenaSampler = new MeshSurfaceSampler(sherenaMesh).build();

            for (let i = 0; i < PARTICLE_COUNT; i++) {
              sherenaSampler.sample(tempPos);
              const idx = i * 3;
              shapes.sherena.pos[idx] = tempPos.x;
              shapes.sherena.pos[idx + 1] = tempPos.y;
              shapes.sherena.pos[idx + 2] = tempPos.z;

              shapes.sherena.col[idx] = 1.0;
              shapes.sherena.col[idx + 1] = 0.4;
              shapes.sherena.col[idx + 2] = 0.8;
            }

            // HAPPY BIRTHDAY text
            const birthdayGeo = new TextGeometry("HAPPY\nBIRTHDAY", {
              font: font,
              size: 3,
              height: 1,
              curveSegments: 12,
            });

            birthdayGeo.computeBoundingBox();
            if (birthdayGeo.boundingBox) {
              const centerOffset =
                -0.5 *
                (birthdayGeo.boundingBox.max.x - birthdayGeo.boundingBox.min.x);
              birthdayGeo.translate(centerOffset, 0, 0);
            }

            const birthdayMesh = new THREE.Mesh(birthdayGeo, material);
            const birthdaySampler = new MeshSurfaceSampler(
              birthdayMesh
            ).build();

            for (let i = 0; i < PARTICLE_COUNT; i++) {
              birthdaySampler.sample(tempPos);
              const idx = i * 3;
              shapes.birthday.pos[idx] = tempPos.x;
              shapes.birthday.pos[idx + 1] = tempPos.y;
              shapes.birthday.pos[idx + 2] = tempPos.z;

              shapes.birthday.col[idx] = 0.0;
              shapes.birthday.col[idx + 1] = 1.0;
              shapes.birthday.col[idx + 2] = 1.0;
            }

            resolve();
          }
        );
      });

      // Birthday Cake
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const layerChoice = Math.random();

        if (layerChoice < 0.4) {
          // Bottom layer (largest)
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 8;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          const y = -8 + Math.random() * 3;

          shapes.cake.pos[idx] = x;
          shapes.cake.pos[idx + 1] = y;
          shapes.cake.pos[idx + 2] = z;

          shapes.cake.col[idx] = 0.9;
          shapes.cake.col[idx + 1] = 0.7;
          shapes.cake.col[idx + 2] = 0.4;
        } else if (layerChoice < 0.7) {
          // Middle layer
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 6;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          const y = -5 + Math.random() * 3;

          shapes.cake.pos[idx] = x;
          shapes.cake.pos[idx + 1] = y;
          shapes.cake.pos[idx + 2] = z;

          shapes.cake.col[idx] = 0.95;
          shapes.cake.col[idx + 1] = 0.8;
          shapes.cake.col[idx + 2] = 0.6;
        } else if (layerChoice < 0.9) {
          // Top layer
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 4;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          const y = -2 + Math.random() * 3;

          shapes.cake.pos[idx] = x;
          shapes.cake.pos[idx + 1] = y;
          shapes.cake.pos[idx + 2] = z;

          shapes.cake.col[idx] = 1.0;
          shapes.cake.col[idx + 1] = 0.9;
          shapes.cake.col[idx + 2] = 0.8;
        } else {
          // Candles (on top)
          const candleNum = Math.floor(Math.random() * 5);
          const angle = (candleNum * Math.PI * 2) / 5;
          const radius = 2;
          const x = radius * Math.cos(angle) + (Math.random() - 0.5) * 0.3;
          const z = radius * Math.sin(angle) + (Math.random() - 0.5) * 0.3;
          const y = 1 + Math.random() * 4;

          shapes.cake.pos[idx] = x;
          shapes.cake.pos[idx + 1] = y;
          shapes.cake.pos[idx + 2] = z;

          // Flame colors (red-orange-yellow)
          if (y > 3) {
            shapes.cake.col[idx] = 1.0;
            shapes.cake.col[idx + 1] = 0.8;
            shapes.cake.col[idx + 2] = 0.0;
          } else {
            shapes.cake.col[idx] = 1.0;
            shapes.cake.col[idx + 1] = 0.3;
            shapes.cake.col[idx + 2] = 0.1;
          }
        }
      }

      // Flower (bigger and more visible)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const partChoice = Math.random();

        if (partChoice < 0.2) {
          // Center (yellow/orange) - larger
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 3;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          const y = Math.random() * 2;

          shapes.flower.pos[idx] = x;
          shapes.flower.pos[idx + 1] = y;
          shapes.flower.pos[idx + 2] = z;

          shapes.flower.col[idx] = 1.0;
          shapes.flower.col[idx + 1] = 0.7;
          shapes.flower.col[idx + 2] = 0.0;
        } else if (partChoice < 0.8) {
          // Petals (pink/magenta) - 8 petals, bigger
          const petalNum = Math.floor(Math.random() * 8);
          const angle = (petalNum * Math.PI * 2) / 8;
          const radiusBase = 6 + Math.random() * 4;

          // Create rounded petal shape
          const petalAngleOffset = (Math.random() - 0.5) * 0.8;
          const finalAngle = angle + petalAngleOffset;
          const radius = radiusBase + Math.sin(petalAngleOffset * 4) * 2;

          const x = radius * Math.cos(finalAngle);
          const z = radius * Math.sin(finalAngle);
          const y = Math.random() * 3 - 0.5;

          shapes.flower.pos[idx] = x;
          shapes.flower.pos[idx + 1] = y;
          shapes.flower.pos[idx + 2] = z;

          shapes.flower.col[idx] = 1.0;
          shapes.flower.col[idx + 1] = 0.2;
          shapes.flower.col[idx + 2] = 0.7;
        } else {
          // Stem and leaves (green)
          const stemChoice = Math.random();

          if (stemChoice < 0.6) {
            // Stem
            const x = (Math.random() - 0.5) * 2;
            const y = -10 + Math.random() * 10;
            const z = (Math.random() - 0.5) * 2;

            shapes.flower.pos[idx] = x;
            shapes.flower.pos[idx + 1] = y;
            shapes.flower.pos[idx + 2] = z;
          } else {
            // Leaves (bigger)
            const leafSide = Math.random() > 0.5 ? 1 : -1;
            const leafY = -5 + Math.random() * 3;
            const leafX = leafSide * (3 + Math.random() * 3);
            const leafZ = (Math.random() - 0.5) * 3;

            shapes.flower.pos[idx] = leafX;
            shapes.flower.pos[idx + 1] = leafY;
            shapes.flower.pos[idx + 2] = leafZ;
          }

          shapes.flower.col[idx] = 0.1;
          shapes.flower.col[idx + 1] = 0.8;
          shapes.flower.col[idx + 2] = 0.2;
        }
      }

      transitionToShape("sphere");
    }

    function transitionToShape(shapeName: string) {
      targetPositions.set(shapes[shapeName].pos);
      targetColors.set(shapes[shapeName].col);
    }

    function animate(THREE: typeof import("three")) {
      animationId = requestAnimationFrame(() => animate(THREE));

      if (!geometry || !particles) return;

      const time = Date.now() * 0.001;
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const lerpSpeed = 0.05;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;

        posAttr.array[idx] +=
          (targetPositions[idx] - posAttr.array[idx]) * lerpSpeed;
        posAttr.array[idx + 1] +=
          (targetPositions[idx + 1] - posAttr.array[idx + 1]) * lerpSpeed;
        posAttr.array[idx + 2] +=
          (targetPositions[idx + 2] - posAttr.array[idx + 2]) * lerpSpeed;

        colAttr.array[idx] +=
          (targetColors[idx] - colAttr.array[idx]) * lerpSpeed;
        colAttr.array[idx + 1] +=
          (targetColors[idx + 1] - colAttr.array[idx + 1]) * lerpSpeed;
        colAttr.array[idx + 2] +=
          (targetColors[idx + 2] - colAttr.array[idx + 2]) * lerpSpeed;

        if (currentGesture === "Open Hand") {
          posAttr.array[idx] += Math.sin(time + idx) * 0.01;
          posAttr.array[idx + 1] += Math.cos(time + idx) * 0.01;
        }
      }

      if (currentGesture === "Fist") {
        particles.rotation.y = time * 0.2;
        particles.rotation.z = Math.sin(time * 0.5) * 0.1;
      } else {
        particles.rotation.y = THREE.MathUtils.lerp(
          particles.rotation.y,
          0,
          0.05
        );
        particles.rotation.z = THREE.MathUtils.lerp(
          particles.rotation.z,
          0,
          0.05
        );
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      if (composer) composer.render();
    }

    async function initMediaPipe() {
      if (!videoRef.current || !previewRef.current) return;

      try {
        const stream = await navigator.mediaDevices
          .getUserMedia({
            video: { width: 640, height: 480 },
          })
          .catch(() => {
            console.warn(
              "Camera access denied, continuing without gesture detection"
            );
            return null;
          });

        if (!stream) return;
        videoRef.current.srcObject = stream;
        previewRef.current.srcObject = stream;

        const Hands = (
          window as unknown as {
            Hands: new (config: { locateFile: (file: string) => string }) => {
              setOptions: (options: unknown) => void;
              onResults: (callback: (results: unknown) => void) => void;
              send: (data: { image: HTMLVideoElement | null }) => Promise<void>;
            };
          }
        ).Hands;
        const Camera = (
          window as unknown as {
            Camera: new (
              video: HTMLVideoElement,
              config: {
                onFrame: () => Promise<void>;
                width: number;
                height: number;
              }
            ) => { start: () => void; stop: () => void };
          }
        ).Camera;

        hands = new Hands({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        if (!hands) return;

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7,
        });

        hands.onResults((results: unknown) =>
          onHandsResults(
            results as {
              multiHandLandmarks?: Array<
                Array<{ x: number; y: number; z: number }>
              >;
            }
          )
        );

        cameraUtils = new Camera(videoRef.current, {
          onFrame: async () => {
            if (hands) {
              await hands.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        if (cameraUtils) {
          cameraUtils.start();
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }

    function onHandsResults(results: {
      multiHandLandmarks?: Array<Array<{ x: number; y: number; z: number }>>;
    }) {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        detectGesture(landmarks);
      } else {
        if (currentGesture !== "None") {
          currentGesture = "None";
          updateUI("No Hand Detected", "gray");
          transitionToShape("sphere");
        }
      }
    }

    function detectGesture(lm: Array<{ x: number; y: number; z: number }>) {
      const isExtended = (tipIdx: number, pipIdx: number) =>
        lm[tipIdx].y < lm[pipIdx].y;

      const thumbOpen = lm[4].x < lm[3].x;
      const indexOpen = isExtended(8, 6);
      const middleOpen = isExtended(12, 10);
      const ringOpen = isExtended(16, 14);
      const pinkyOpen = isExtended(20, 18);

      const dist = (i1: number, i2: number) =>
        Math.hypot(lm[i1].x - lm[i2].x, lm[i1].y - lm[i2].y);

      let newGesture = "";

      // Pinch - Heart
      if (dist(4, 8) < 0.05) {
        newGesture = "Pinch (Heart)";
        if (currentGesture !== newGesture) {
          transitionToShape("heart");
          updateUI(newGesture, "pink");
        }
      }
      // Fist - Saturn
      else if (!indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
        newGesture = "Fist";
        if (currentGesture !== newGesture) {
          transitionToShape("saturn");
          updateUI(newGesture, "blue");
        }
      }
      // Call Me (Shaka) - I Love You
      else if (
        thumbOpen &&
        pinkyOpen &&
        !indexOpen &&
        !middleOpen &&
        !ringOpen
      ) {
        newGesture = "Call Me";
        if (currentGesture !== newGesture) {
          transitionToShape("text");
          updateUI(newGesture, "yellow");
        }
      }
      // Peace Sign (2 fingers) - Sherena
      else if (
        indexOpen &&
        middleOpen &&
        !ringOpen &&
        !pinkyOpen &&
        !thumbOpen
      ) {
        newGesture = "Peace Sign";
        if (currentGesture !== newGesture) {
          transitionToShape("sherena");
          updateUI(newGesture, "purple");
        }
      }
      // Rock Sign (index + pinky) - Happy Birthday
      else if (
        indexOpen &&
        !middleOpen &&
        !ringOpen &&
        pinkyOpen &&
        thumbOpen
      ) {
        newGesture = "Rock Sign";
        if (currentGesture !== newGesture) {
          transitionToShape("birthday");
          updateUI(newGesture, "cyan");
        }
      }
      // Gun/Pistol (thumb + index) - Cake
      else if (
        indexOpen &&
        !middleOpen &&
        !ringOpen &&
        !pinkyOpen &&
        thumbOpen
      ) {
        newGesture = "Gun Sign";
        if (currentGesture !== newGesture) {
          transitionToShape("cake");
          updateUI(newGesture, "orange");
        }
      }
      // Pointing (only index finger) - Flower
      else if (
        indexOpen &&
        !middleOpen &&
        !ringOpen &&
        !pinkyOpen &&
        !thumbOpen
      ) {
        newGesture = "Pointing";
        if (currentGesture !== newGesture) {
          transitionToShape("flower");
          updateUI(newGesture, "lightgreen");
        }
      }
      // Open Hand - Sphere
      else if (indexOpen && middleOpen && ringOpen && pinkyOpen && thumbOpen) {
        newGesture = "Open Hand";
        if (currentGesture !== newGesture) {
          transitionToShape("sphere");
          updateUI(newGesture, "green");
        }
      }

      if (newGesture) currentGesture = newGesture;
    }

    function updateUI(text: string, colorClass: string) {
      setGesture({ name: text, color: colorClass });
    }

    init();

    return () => {
      mounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (cameraUtils) cameraUtils.stop();
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [isMounted]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const colorMap: Record<string, string> = {
    pink: "#ec4899",
    blue: "#3b82f6",
    yellow: "#eab308",
    green: "#22c55e",
    purple: "#a855f7",
    gray: "#6b7280",
    red: "#ef4444",
    cyan: "#06b6d4",
    orange: "#f97316",
    lightgreen: "#84cc16",
  };

  // Prevent hydration mismatch by only rendering on client
  if (!isMounted) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-pink-950 via-rose-950 to-fuchsia-950 flex items-center justify-center">
        <div className="border-4 border-pink-300/20 border-l-pink-400 rounded-full w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-pink-950 via-rose-950 to-fuchsia-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ display: "block" }}
      />

      <video ref={videoRef} className="hidden" playsInline autoPlay />

      {/* UI Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pointer-events-auto">
          {/* Gesture Indicator */}
          <div className="bg-pink-950/60 backdrop-blur-xl border border-pink-400/30 px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl shadow-pink-500/20">
            <div
              className="w-4 h-4 rounded-full animate-pulse"
              style={{
                backgroundColor: colorMap[gesture.color] || "white",
                boxShadow: `0 0 20px ${
                  colorMap[gesture.color] || "white"
                }, 0 0 40px ${colorMap[gesture.color] || "white"}`,
              }}
            />
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                Current Gesture
              </div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-wide">
                {gesture.name}
              </div>
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullScreen}
            className="bg-pink-950/60 backdrop-blur-xl border border-pink-400/30 hover:bg-pink-900/60 hover:border-pink-300/50 transition-all duration-300 p-3 rounded-xl shadow-2xl shadow-pink-500/20 hover:scale-110"
            aria-label="Toggle Fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pointer-events-auto">
          {/* Gesture Guide */}
          <div className="bg-pink-950/60 backdrop-blur-xl border border-pink-400/30 p-4 rounded-xl max-w-md shadow-2xl shadow-pink-500/20">
            <h3 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
              <span className="text-xl">👋</span>
              Gesture Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-lg">🖐</span>
                <div>
                  <span className="text-white font-semibold">Open Hand</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">
                    Rainbow Sphere
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">✊</span>
                <div>
                  <span className="text-white font-semibold">Fist</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">Saturn Ring</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">👌</span>
                <div>
                  <span className="text-white font-semibold">Pinch</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">Heart Shape</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🤙</span>
                <div>
                  <span className="text-white font-semibold">Call Me</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">I Love You</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">✌️</span>
                <div>
                  <span className="text-white font-semibold">Peace Sign</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">Sherena</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🤘</span>
                <div>
                  <span className="text-white font-semibold">Rock Sign</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">
                    Happy Birthday
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">�</span>
                <div>
                  <span className="text-white font-semibold">Gun Sign</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">
                    Birthday Cake
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">☝️</span>
                <div>
                  <span className="text-white font-semibold">Pointing</span>
                  <br />
                  <span className="text-gray-400 text-[10px]">Flower</span>
                </div>
              </div>
            </div>
          </div>

          {/* Webcam Preview */}
          <div className="bg-pink-950/60 backdrop-blur-xl border border-pink-400/30 p-2 rounded-xl overflow-hidden w-full sm:w-56 h-40 sm:h-42 relative shadow-2xl shadow-pink-500/20">
            <video
              ref={previewRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full bg-black object-cover rounded-lg"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="absolute top-3 left-3 bg-pink-500/90 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 font-semibold shadow-lg shadow-pink-500/50">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-white/70 font-semibold bg-black/50 px-2 py-1 rounded">
              Camera Feed
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 bg-gradient-to-br from-pink-900 via-rose-950 to-fuchsia-950 flex flex-col items-center justify-center transition-opacity duration-500"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <div className="relative mb-8">
            <div className="border-4 border-white/10 border-t-pink-400 border-r-rose-400 rounded-full w-16 h-16 animate-spin" />
            <div
              className="absolute inset-0 border-4 border-white/5 border-b-fuchsia-400 rounded-full w-16 h-16 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white animate-pulse mb-2 text-center px-4">
            ✨ Booting Neural Particle Engine ✨
          </div>
          <div className="text-sm sm:text-base text-pink-200 mt-2 font-mono text-center px-4">
            {loadingStatus}
          </div>
          <div className="mt-8 flex gap-2">
            <div
              className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-fuchsia-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
