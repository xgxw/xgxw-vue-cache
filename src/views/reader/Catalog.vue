<template>
  <div class="container">
    <loading :spinning="fetching" />
    <tree :data="data" @on-select="handleFileSelect" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import Tree from "@/components/Tree.tsx";
import { getFidFromPath } from "@/constants/guard";
import { mapGetters, mapActions } from "vuex";
import { InvalidTokenError } from "@/constants/error";
import Loading from "@/components/Loading.vue";
import { FetchCatalogRequset } from "@/api";

@Component({
  components: {
    tree: Tree,
    loading: Loading
  },
  computed: {
    ...mapGetters({
      fetching: "command/isFetching",
      catalog: "command/getCatalog",
      getCatalogByPath: "command/getCatalogByPath"
    })
  },
  methods: {
    ...mapActions({
      fetchCatalog: "command/fetchCatalog"
    })
  }
})
export default class Catalog extends Vue {
  private data: string = "{}";
  private path = "";

  handleFileSelect(keys: any) {
    let path = this.$route.path + keys[0];
    if (keys && keys[0]) this.$router.push(path);
    // if (keys && keys[0]) console.log(path);
  }

  deduceData() {
    if (!this.path) return;
    let data = this.getCatalogByPath(this.path);
    if (!data) return;
    this.$nextTick(() => {
      this.data = data;
    });
  }

  @Watch("catalog")
  handleCatalogChange() {
    this.deduceData();
  }

  @Watch("$route", { immediate: true, deep: true })
  handleRouteChange() {
    this.path = getFidFromPath(this.$route);
    this.deduceData();
  }

  requestCatalog() {
    // TODO: 目前先由command获取, 后续更改. 详见 todo.md
    return;
    let r: FetchCatalogRequset = {
      path: "/"
    };
    this.fetchCatalog(r)
      .catch(e => {
        switch (e) {
          case InvalidTokenError:
            this.$message.warning("认证过期", 2);
            return;
          default:
            this.$message.warning("获取文件列表失败", 2);
        }
      })
      .finally(() => {
        // this.handleRouteChange();
      });
  }
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
