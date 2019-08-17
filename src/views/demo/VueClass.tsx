import Vue, { CreateElement } from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class TreeDemo extends Vue {
  render(h:CreateElement) {
    return (<p>This is rendered via TSX</p>)
  }
}
