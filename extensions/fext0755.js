// Name: Frost进制转换 #0755
// ID: fext0755
// Description: 进制转换 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0755: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0755',
        name: 'Frost进制转换 #0755',
        color1: '#4eda79',
        color2: '#2bca5c',
        color3: '#22a049',
        blocks: [
          {
            opcode: 'toBin',
            blockType: Scratch.BlockType.REPORTER,
            text: '十进制 [n] 转二进制',
            arguments: {
            n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '转二进制字符串。'
          },
          {
            opcode: 'toHex',
            blockType: Scratch.BlockType.REPORTER,
            text: '十进制 [n] 转十六进制',
            arguments: {
            n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 }
            },
            docs: '转十六进制。'
          },
          {
            opcode: 'fromBin',
            blockType: Scratch.BlockType.REPORTER,
            text: '二进制 [t] 转十进制',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "1010" }
            },
            docs: '二进制转十进制。'
          },
          {
            opcode: 'fromHex',
            blockType: Scratch.BlockType.REPORTER,
            text: '十六进制 [t] 转十进制',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "FF" }
            },
            docs: '十六进制转十进制。'
          }
        ]
      };
    }

        async toBin(args) {
          var n = Math.floor(Number(args.n) || 0); if (n < 0) return "错误: 负数"; return n.toString(2);
        }

        async toHex(args) {
          var n = Math.floor(Number(args.n) || 0); if (n < 0) return "错误: 负数"; return n.toString(16).toUpperCase();
        }

        async fromBin(args) {
          var v = parseInt(String(args.t), 2); return isNaN(v) ? "错误: 无效二进制" : v;
        }

        async fromHex(args) {
          var v = parseInt(String(args.t), 16); return isNaN(v) ? "错误: 无效十六进制" : v;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
