import Vue, { CreateElement } from 'vue'
import { Component, Prop } from "vue-property-decorator";

import { Tree as AntdTree } from "ant-design-vue";
const DirectoryTree = AntdTree.DirectoryTree;
const TreeNode = AntdTree.TreeNode;

@Component({
  components: {
    "a-directory-tree": DirectoryTree,
    "a-tree-node": TreeNode
  }
})
export default class Tree extends Vue {
  @Prop() private data!: string;
  onSelect(keys: any) {
    console.log("Trigger Select", keys);
  }
  onExpand() {
    console.log("Trigger Expand");
  }
  getTreeNode(data: {}): JSX.Element[] {
    let e: JSX.Element[] = [];
    for (let key in data) {
      if (data[key] instanceof Object) {
        let temp: JSX.Element = (
          <a-tree-node key={key} title={key}>
            {this.getTreeNode(data[key])}
          </a-tree-node>
        )
        e.push(temp);
      } else {
        e.push(<a-tree-node title={key} key={data[key]} isLeaf />)
      }
    }
    return e
  }
  render(h: CreateElement) {
    let data = JSON.parse(this.data)
    return (
      <a-directory-tree multiple defaultExpandAll onselect={this.onSelect} onexpand={this.onExpand}>
        {this.getTreeNode(data)}
      </a-directory-tree>
    )
  }
}
