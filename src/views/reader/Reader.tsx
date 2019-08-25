import Vue, { CreateElement } from 'vue'
import { Component } from "vue-property-decorator";
import { default as PaperLayout } from "@/layout/Paper.vue";
import Article from "./Article.vue";
import Catalog from "./Catalog.vue";

@Component({
    components: {
        "paper-layout": PaperLayout,
        'x-article': Article,
        catalog: Catalog
    }
})
export default class Reader extends Vue {
    render(h: CreateElement) {
        let path = "www.xiagaoxiawan.com" + this.$route.fullPath;
        return (
            <div style="height:100%;width:100%;" >
                <paper-layout path={path}>
                    {path.endsWith("/") ? h("catalog") : h("x-article")}
                </paper-layout>
            </div>
        )
    }
}
