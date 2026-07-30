// Name: Frost逻辑运算 #1000
// ID: fext1000
// Description: 逻辑运算 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext1000: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext1000',
        name: 'Frost逻辑运算 #1000',
        color1: '#da4e6a',
        color2: '#ca2b4b',
        color3: '#a0223b',
        blocks: [
          {
            opcode: 'and',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] 且 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: false },
            b: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: false }
            },
            docs: '逻辑与。'
          },
          {
            opcode: 'or',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] 或 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: false },
            b: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: false }
            },
            docs: '逻辑或。'
          },
          {
            opcode: 'not',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '非 [a]',
            arguments: {
            a: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: false }
            },
            docs: '逻辑非。'
          },
          {
            opcode: 'between',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[v] 在 [lo] 与 [hi] 之间',
            arguments: {
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            lo: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            hi: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '区间判断。'
          }
        ]
      };
    }

        async and(args) {
          return !!args.a && !!args.b;
        }

        async or(args) {
          return !!args.a || !!args.b;
        }

        async not(args) {
          return !args.a;
        }

        async between(args) {
          var v = Number(args.v) || 0; return v >= (Number(args.lo) || 0) && v <= (Number(args.hi) || 0);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
