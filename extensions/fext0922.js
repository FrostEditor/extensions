// Name: Frost文字处理 #0922
// ID: fext0922
// Description: 文字处理 扩展提供 6 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0922: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0922',
        name: 'Frost文字处理 #0922',
        color1: '#d4da4e',
        color2: '#c4ca2b',
        color3: '#9ba022',
        blocks: [
          {
            opcode: 'join',
            blockType: Scratch.BlockType.REPORTER,
            text: '连接 [a] 与 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.STRING, defaultValue: "你好" },
            b: { type: Scratch.ArgumentType.STRING, defaultValue: "世界" }
            },
            docs: '拼接两个文本。'
          },
          {
            opcode: 'len',
            blockType: Scratch.BlockType.REPORTER,
            text: '文本 [t] 的长度',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "Scratch" }
            },
            docs: '返回字符数。'
          },
          {
            opcode: 'upper',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 转为大写',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "abc" }
            },
            docs: '转大写。'
          },
          {
            opcode: 'lower',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 转为小写',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "ABC" }
            },
            docs: '转小写。'
          },
          {
            opcode: 'reverse',
            blockType: Scratch.BlockType.REPORTER,
            text: '反转文本 [t]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "abc" }
            },
            docs: '反转字符串。'
          },
          {
            opcode: 'repeat',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 重复 [n] 次',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "ab" },
            n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
            },
            docs: '重复文本。'
          }
        ]
      };
    }

        async join(args) {
          return String(args.a) + String(args.b);
        }

        async len(args) {
          return String(args.t).length;
        }

        async upper(args) {
          return String(args.t).toUpperCase();
        }

        async lower(args) {
          return String(args.t).toLowerCase();
        }

        async reverse(args) {
          return String(args.t).split("").reverse().join("");
        }

        async repeat(args) {
          var n = Math.max(0, Math.min(9999, Math.floor(Number(args.n) || 0))); return String(args.t).repeat(n);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
