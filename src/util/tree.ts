/**
 * 从树结构中查找所有满足条件的节点数据
 * @param tree 树结构数据
 * @param find 查找表达式
 * @returns 节点数据数组
 */
export const treeFind = <T extends { children?: T[]; [x: string]: any }>(
  tree: T[],
  find: (data: T) => boolean
): T[] => {
  const result: T[] = []
  tree.reduce((acc, item) => {
    if (find(item)) {
      acc.push(item)
    }
    if (item.children && item.children.length > 0) {
      acc.push(...treeFind(item.children, find))
    }
    return acc
  }, result)
  return result
}
