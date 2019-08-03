<template>
  <div class="container" v-show="visible">
    <canvas />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as THREE from "three";

// 3d库
/*
    three: 最流行, MIT, 且公开model多
    vue-3d-model
    playcanvas: 非开源
*/

@Component({})
export default class StickMan extends Vue {
  @Prop() private visible!: boolean;
  private camera;
  private scene;
  private renderer;
  private geometry;
  private material;
  private mesh;

  init() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }
  animate() {
    requestAnimationFrame(this.animate);

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }

  mounted() {
    // this.init();
    // this.animate();
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/zindex.scss";
</style>
