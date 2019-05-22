import { Tree } from 'antd';
import AntTree from './styles/tree.style';
import WithDirection from '../../settings/withDirection';

const WDTrees = AntTree(Tree);
const Trees = WithDirection(WDTrees);

const TreeNode = Tree.TreeNode;

export default Trees;
export { TreeNode };
