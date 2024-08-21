
import fs from 'fs'
import path from 'path'
import upath from "@ewizardjs/upath";
import {
  NAME_LABELS,
  DIR_LABELS
} from "./name-sort-lang";

const srcDir = './src'; // 源目录
const rootDir = './src/docs'; // 文档根目录
const sidebarItems = {}; // 侧边栏配置
const siderBarIcon = `📝`

/**
 * 同步递归获取指定目录下所有级别的文件夹路径，并以树形结构返回。
 * @param dir - 目录路径。
 * @returns 文件夹树形结构。
 */
function getDirectoryTree(dir: string) {
  const node = {
    name: path.basename(dir),
    text: DIR_LABELS[path.basename(dir)] || null,
    link: upath.normalize(dir),
    child: []
  };

  // 读取目录中的所有文件和子目录
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 如果是目录，则递归构建子目录树
      node.child!.push(getDirectoryTree(fullPath));
    }
  }
  return node;
}

function getNavItems(ele) {
  const node = {
    text: ele.text,
    link: ele.link.replace(upath.normalize(srcDir), ''),
    activeMatch: ele.link.replace(upath.normalize(srcDir), ''),
    items: []
  };
  if (ele.child && ele.child.length) {
    delete node.link
    for (const item of ele.child) {
      node.items!.push(getNavItems(item));
    }
  } else {
    const nameLabels = NAME_LABELS.filter(i => i.parentDir.includes(ele.name))
    const files = fs.readdirSync(ele.link, { withFileTypes: true }).sort((a, b) => { return (nameLabels.find(i => i.en === upath.trimExt(a.name)) || {}).sortKey - (nameLabels.find(i => i.en === upath.trimExt(b.name)) || {}).sortKey });

    if (files.length > 0) {
      if (files.filter(file => upath.trimExt(file.name) === 'index').length > 0) {
        node.link = upath.trimExt(upath.join(node.link, 'index'));
      } else {
        node.link = upath.trimExt(upath.join(node.link, files[0].name));
      }

    }
    // 创建侧边栏配置，以每个只含有文件的文件夹问一个节点
    sidebarItems[(upath.join(ele.link.replace(upath.normalize(srcDir), '')) + '/')] = [{
      text: ele.text,
      items: [
        ...files.filter(file => upath.trimExt(file.name) !== 'index').map(file => {
          const findItem = nameLabels.find(i => i.en === upath.trimExt(file.name))
          return {
            text: `${siderBarIcon} ${findItem.zh}`,
            link: upath.trimExt(upath.join(ele.link.replace(upath.normalize(srcDir), ''), file.name)),
            meta: {
              ...(findItem.meta || {}),
              fileName: file.name
            }
          }
        })
      ]
    }];
    delete node.items
  }
  return node;
}

const subdirectories = getDirectoryTree(rootDir);
const navItems = subdirectories.child.map(ele => getNavItems(ele));
navItems.unshift({ text: 'HOME', link: '/' })
export {
  sidebarItems,
  navItems
}