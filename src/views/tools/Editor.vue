<template>
  <div class="container" v-bind:class="{ 'menu-expand': menuExpand }">
    <loading :spinning="fetching" />
    <catalog-menu v-if="!isMobile" />
    <editor-component :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import { mapGetters, mapActions } from "vuex";
import { isMobile } from "@/util/util";
import AutoSaveClient from "@/util/autosave";
import CatalogMenu from "../components/CatalogMenu.vue";

@Component({
  components: {
    "catalog-menu": CatalogMenu,
    "editor-component": EditorComponent,
    loading: Loading
  },
  computed: {
    ...mapGetters({
      menuExpand: "menu/isExpand",
      content: "article/getContent",
      fetching: "article/isFetching"
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
  private isMobile = isMobile();
  mounted() {
    this.fetchContent("tools_editor");
  }
  change(data: string) {
    this.changeContent(data);
  }
  save(data: string) {
    const hide: TimerHandler = this.$message.loading(
      "save to localStorage..",
      0
    );
    this.uploadContent(data)
      .then(res => {
        this.$message.info("save finished", 2);
      })
      .catch(e => {
        this.$message.warning("更新文章失败.", 2);
      })
      .finally(() => {
        setTimeout(hide, 0);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/editor.scss";
</style>
