<template>
  <div class="container">
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import { MobileWidth } from "@/constants/constants";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    EditorComponent
  },
  computed: {
    ...mapGetters({
      content: "article/getContent"
    })
  },
  methods: {
    ...mapActions({
      changeContent: "article/changeContent"
    })
  }
})
export default class Editor extends Vue {
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
  mounted() {}
  change(data: string) {
    this.changeContent(data).catch(e => {
      console.log("此处需要弹层通知错误, 添加 msg 组件后替换", e);
    });
  }
  save(data: string) {
    this.change(data);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";

</style>
