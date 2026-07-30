// Name: Frost列表工具 #0788
// ID: fext0788
// Description: 列表工具 扩展提供 5 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0788: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0788',
        name: 'Frost列表工具 #0788',
        color1: '#da4e57',
        color2: '#ca2b35',
        color3: '#a0222a',
        blocks: [
          {
            opcode: 'sum',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的数字总和(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3" }
            },
            docs: '求和。'
          },
          {
            opcode: 'avg',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的平均值(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3" }
            },
            docs: '平均值。'
          },
          {
            opcode: 'lmax',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的最大值(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3" }
            },
            docs: '最大值。'
          },
          {
            opcode: 'sort',
            blockType: Scratch.BlockType.REPORTER,
            text: '把列表 [list] 升序排列(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "3,1,2" }
            },
            docs: '排序后返回。'
          },
          {
            opcode: 'contains',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '列表 [list] 包含 [item]',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "a,b,c" },
            item: { type: Scratch.ArgumentType.STRING, defaultValue: "b" }
            },
            docs: '是否包含。'
          }
        ]
      };
    }

        async sum(args) {
          return String(args.list).split(",").reduce(function (s, x) { return s + (Number(x) || 0); }, 0);
        }

        async avg(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }); return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : 0;
        }

        async lmax(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }); return a.length ? Math.max.apply(null, a) : 0;
        }

        async sort(args) {
          return String(args.list).split(",").map(function (x) { return x.trim(); }).sort(function (a, b) { return a - b; }).join(",");
        }

        async contains(args) {
          return String(args.list).split(",").map(function (x) { return x.trim(); }).indexOf(String(args.item).trim()) !== -1;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
