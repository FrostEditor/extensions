// Name: Frost数学运算 #0254
// ID: fext0254
// Description: 数学运算 扩展提供 6 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0254: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0254',
        name: 'Frost数学运算 #0254',
        color1: '#da5f4e',
        color2: '#ca3d2b',
        color3: '#a03122',
        blocks: [
          {
            opcode: 'add',
            blockType: Scratch.BlockType.REPORTER,
            text: '计算 [a] 加 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            docs: '两数相加。'
          },
          {
            opcode: 'sub',
            blockType: Scratch.BlockType.REPORTER,
            text: '计算 [a] 减 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            docs: '两数相减。'
          },
          {
            opcode: 'mul',
            blockType: Scratch.BlockType.REPORTER,
            text: '计算 [a] 乘 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
            docs: '两数相乘。'
          },
          {
            opcode: 'div',
            blockType: Scratch.BlockType.REPORTER,
            text: '计算 [a] 除以 [b]',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
            docs: '两数相除，除数为0时报错。'
          },
          {
            opcode: 'pow',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] 的 [b] 次方',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
            },
            docs: '幂运算。'
          },
          {
            opcode: 'sqrt',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] 的平方根',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 9 }
            },
            docs: '平方根。'
          }
        ]
      };
    }

        async add(args) {
          return (Number(args.a) || 0) + (Number(args.b) || 0);
        }

        async sub(args) {
          return (Number(args.a) || 0) - (Number(args.b) || 0);
        }

        async mul(args) {
          return (Number(args.a) || 0) * (Number(args.b) || 0);
        }

        async div(args) {
          var b = Number(args.b) || 0; if (b === 0) return "错误: 除数不能为0"; return (Number(args.a) || 0) / b;
        }

        async pow(args) {
          return Math.pow(Number(args.a) || 0, Number(args.b) || 0);
        }

        async sqrt(args) {
          var a = Number(args.a) || 0; if (a < 0) return "错误: 负数无实数平方根"; return Math.sqrt(a);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
