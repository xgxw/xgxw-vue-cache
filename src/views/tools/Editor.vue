<template>
  <div class="container">
    <Loading :spinning="isLoading" />
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import { MobileWidth } from "@/constants/constants";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    EditorComponent,
    Loading
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
  private isLoading: boolean = true;
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
  mounted() {
    this.fetchContent("tools_editor").finally(() => {
      this.isLoading = false;
    });
  }
  change(data: string) {
    this.changeContent(data);
  }
  save(data: string) {
    const hide = this.$message.loading("save to localStorage..", 0);
    this.uploadContent(data).finally(() => {
      setTimeout(hide, 0);
      this.$message.info("save finished", 2);
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";
</style>
