// Name: Frost统计 #0054
// ID: fext0054
// Description: 统计 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0054: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0054',
        name: 'Frost统计 #0054',
        color1: '#4e70da',
        color2: '#2b51ca',
        color3: '#2241a0',
        blocks: [
          {
            opcode: 'median',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的中位数(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3,4" }
            },
            docs: '中位数。'
          },
          {
            opcode: 'variance',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的方差(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3" }
            },
            docs: '方差。'
          },
          {
            opcode: 'stddev',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的标准差(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,2,3" }
            },
            docs: '标准差。'
          },
          {
            opcode: 'range',
            blockType: Scratch.BlockType.REPORTER,
            text: '列表 [list] 的极差(逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "1,5,3" }
            },
            docs: '最大值减最小值。'
          }
        ]
      };
    }

        async median(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }).sort(function (m, n) { return m - n; }); if (!a.length) return 0; var mid = Math.floor(a.length / 2); return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
        }

        async variance(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }); if (a.length < 2) return 0; var m = a.reduce(function (s, x) { return s + x; }, 0) / a.length; return a.reduce(function (s, x) { return s + Math.pow(x - m, 2); }, 0) / a.length;
        }

        async stddev(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }); if (a.length < 2) return 0; var m = a.reduce(function (s, x) { return s + x; }, 0) / a.length; return Math.sqrt(a.reduce(function (s, x) { return s + Math.pow(x - m, 2); }, 0) / a.length);
        }

        async range(args) {
          var a = String(args.list).split(",").map(Number).filter(function (x) { return !isNaN(x); }); return a.length ? (Math.max.apply(null, a) - Math.min.apply(null, a)) : 0;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
