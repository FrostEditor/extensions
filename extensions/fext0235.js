// Name: Frost随机数 #0235
// ID: fext0235
// Description: 随机数 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0235: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0235',
        name: 'Frost随机数 #0235',
        color1: '#9e4eda',
        color2: '#862bca',
        color3: '#6a22a0',
        blocks: [
          {
            opcode: 'randInt',
            blockType: Scratch.BlockType.REPORTER,
            text: '在 [min] 到 [max] 间取随机整数',
            arguments: {
            min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '含两端的随机整数。'
          },
          {
            opcode: 'randFloat',
            blockType: Scratch.BlockType.REPORTER,
            text: '在 [min] 到 [max] 间取随机小数',
            arguments: {
            min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
            docs: '随机浮点数。'
          },
          {
            opcode: 'randBool',
            blockType: Scratch.BlockType.REPORTER,
            text: '随机布尔值',
            arguments: {

            },
            docs: '50% 真/假。'
          },
          {
            opcode: 'pick',
            blockType: Scratch.BlockType.REPORTER,
            text: '从 [list] 中随机取一项(用逗号分隔)',
            arguments: {
            list: { type: Scratch.ArgumentType.STRING, defaultValue: "苹果,香蕉,橙子" }
            },
            docs: '从逗号分隔列表随机选。'
          }
        ]
      };
    }

        async randInt(args) {
          var a = Math.ceil(Number(args.min) || 0), b = Math.floor(Number(args.max) || 0); return Math.floor(Math.random() * (b - a + 1)) + a;
        }

        async randFloat(args) {
          var a = Number(args.min) || 0, b = Number(args.max) || 0; return Math.random() * (b - a) + a;
        }

        async randBool(args) {
          return Math.random() < 0.5;
        }

        async pick(args) {
          var arr = String(args.list).split(","); return arr[Math.floor(Math.random() * arr.length)];
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
