// Name: Frost坐标变换 #0915
// ID: fext0915
// Description: 坐标变换 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0915: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0915',
        name: 'Frost坐标变换 #0915',
        color1: '#4edad9',
        color2: '#2bcac9',
        color3: '#22a0a0',
        blocks: [
          {
            opcode: 'rotatePt',
            blockType: Scratch.BlockType.REPORTER,
            text: '绕原点旋转点([x],[y]) [deg]度',
            arguments: {
            x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            deg: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 }
            },
            docs: '返回 "x,y"。'
          },
          {
            opcode: 'scalePt',
            blockType: Scratch.BlockType.REPORTER,
            text: '缩放点([x],[y]) [s]倍',
            arguments: {
            x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
            s: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
            docs: '返回 "x,y"。'
          },
          {
            opcode: 'lerp',
            blockType: Scratch.BlockType.REPORTER,
            text: '在 [a] 与 [b] 间按 [t] 插值',
            arguments: {
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            t: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 }
            },
            docs: '线性插值。'
          }
        ]
      };
    }

        async rotatePt(args) {
          var a = (Number(args.deg) || 0) * Math.PI / 180, x = Number(args.x) || 0, y = Number(args.y) || 0; return Math.round(x * Math.cos(a) - y * Math.sin(a)) + "," + Math.round(x * Math.sin(a) + y * Math.cos(a));
        }

        async scalePt(args) {
          return (Number(args.x) || 0) * (Number(args.s) || 1) + "," + (Number(args.y) || 0) * (Number(args.s) || 1);
        }

        async lerp(args) {
          return (Number(args.a) || 0) + ((Number(args.b) || 0) - (Number(args.a) || 0)) * (Number(args.t) || 0);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
