// Name: Frost高级文字 #0344
// ID: fext0344
// Description: 高级文字 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0344: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0344',
        name: 'Frost高级文字 #0344',
        color1: '#4eda83',
        color2: '#2bca67',
        color3: '#22a052',
        blocks: [
          {
            opcode: 'replace',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 中的 [a] 替换为 [b]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "aXa" },
            a: { type: Scratch.ArgumentType.STRING, defaultValue: "X" },
            b: { type: Scratch.ArgumentType.STRING, defaultValue: "Y" }
            },
            docs: '文本替换。'
          },
          {
            opcode: 'contains2',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[hay] 包含 [needle]',
            arguments: {
            hay: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" },
            needle: { type: Scratch.ArgumentType.STRING, defaultValue: "ell" }
            },
            docs: '子串判断。'
          },
          {
            opcode: 'splitCount',
            blockType: Scratch.BlockType.REPORTER,
            text: '以 [sep] 分割 [t] 的段数',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "a,b,c" },
            sep: { type: Scratch.ArgumentType.STRING, defaultValue: "," }
            },
            docs: '分割计数。'
          },
          {
            opcode: 'trim',
            blockType: Scratch.BlockType.REPORTER,
            text: '去除 [t] 两端空格',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "  hi  " }
            },
            docs: '去空格。'
          }
        ]
      };
    }

        async replace(args) {
          return String(args.t).split(String(args.a)).join(String(args.b));
        }

        async contains2(args) {
          return String(args.hay).indexOf(String(args.needle)) !== -1;
        }

        async splitCount(args) {
          return String(args.t).split(String(args.sep)).length;
        }

        async trim(args) {
          return String(args.t).trim();
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
