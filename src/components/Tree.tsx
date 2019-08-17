import Vue, { CreateElement } from 'vue'
import { Component } from "vue-property-decorator";

import { Tree as AntdTree} from "ant-design-vue";
const DirectoryTree = AntdTree.DirectoryTree;
const TreeNode = AntdTree.TreeNode;

@Component({
  components: {
    "a-directory-tree": DirectoryTree,
    "a-tree-node": TreeNode
  }
})
export default class Tree extends Vue {
  private data: {} = { public: { "task.csv": "task.csv", test: {} } };
  onSelect(keys: any) {
    console.log("Trigger Select", keys);
  }
  onExpand() {
    console.log("Trigger Expand");
  }
  getTreeNode(data: {}):JSX.Element[] {
    let e:JSX.Element[] = [];
    for (let key in data) {
      if (data[key] instanceof Object) {
        let temp:JSX.Element = (
          <a-tree-node key={key} title={key}>
            {this.getTreeNode(data[key])}
          </a-tree-node>
        )
        e.push(temp);
      } else {
        e.push(<a-tree-node title="leaf 1-1" key="0-1-1" isLeaf />)
      }
    }
    return e
  }
  render(h:CreateElement) {
    return (
      <a-directory-tree multiple defaultExpandAll>
        {this.getTreeNode(this.data)}
      </a-directory-tree>
    )
  }
}
