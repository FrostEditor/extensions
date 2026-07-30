// Name: Frost格式校验 #0135
// ID: fext0135
// Description: 格式校验 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0135: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0135',
        name: 'Frost格式校验 #0135',
        color1: '#4ea3da',
        color2: '#2b8bca',
        color3: '#226ea0',
        blocks: [
          {
            opcode: 'isNum',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[t] 是数字吗',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "123" }
            },
            docs: '数字判断。'
          },
          {
            opcode: 'isPal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '文本 [t] 是回文吗',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "level" }
            },
            docs: '回文判断。'
          },
          {
            opcode: 'isEmpty',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '文本 [t] 为空吗',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
            },
            docs: '空判断。'
          }
        ]
      };
    }

        async isNum(args) {
          return !isNaN(Number(args.t)) && String(args.t).trim() !== "";
        }

        async isPal(args) {
          var s = String(args.t).toLowerCase(); return s === s.split("").reverse().join("");
        }

        async isEmpty(args) {
          return String(args.t).trim() === "";
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
