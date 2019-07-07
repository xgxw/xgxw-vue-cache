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
      fetchContent: "article/fetchContentLocal",
      changeContent: "article/changeContent",
      uploadContent: "article/uploadContentLocal"
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
  mounted() {
    this.fetchContent("tools_editor");
  }
  change(data: string) {
    this.changeContent(data);
  }
  save(data: string) {
    this.uploadContent(data);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";
</style>
