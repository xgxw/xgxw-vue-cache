<template>
  <div class="container">
    <paper-layout>
      <tree :data="catalog" />
    </paper-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { default as PaperLayout } from "@/layout/Paper.vue";
import Tree from "@/components/Tree.tsx";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    "paper-layout": PaperLayout,
    tree: Tree
  },
  computed: {
    ...mapGetters({
      catalog: "command/getCatalog"
    })
  },
  methods: {
    ...mapActions({
      fetchCatalog: "command/fetchCatalog"
    })
  }
})
export default class Home extends Vue {
  private data: {} = { public: { "task.csv": "task.csv", test: {} } };
  mounted() {
  }
}
</script>
<style lang='scss' scoped>
</style>
