// Name: Frost物理公式 #0867
// ID: fext0867
// Description: 物理公式 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0867: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0867',
        name: 'Frost物理公式 #0867',
        color1: '#dad84e',
        color2: '#cac82b',
        color3: '#a09f22',
        blocks: [
          {
            opcode: 'fall',
            blockType: Scratch.BlockType.REPORTER,
            text: '自由落体 [t]秒下落距离(米)',
            arguments: {
            t: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
            docs: '忽略空气阻力。'
          },
          {
            opcode: 'kin',
            blockType: Scratch.BlockType.REPORTER,
            text: '动能(质量[m]kg, 速度[v]m/s)',
            arguments: {
            m: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '动能公式。'
          },
          {
            opcode: 'gforce',
            blockType: Scratch.BlockType.REPORTER,
            text: '圆周运动向心加速度(速度[v], 半径[r])',
            arguments: {
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            r: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
            docs: '向心加速度。'
          }
        ]
      };
    }

        async fall(args) {
          return 0.5 * 9.8 * Math.pow(Number(args.t) || 0, 2);
        }

        async kin(args) {
          return 0.5 * (Number(args.m) || 0) * Math.pow(Number(args.v) || 0, 2);
        }

        async gforce(args) {
          var r = Number(args.r) || 1; return Math.pow(Number(args.v) || 0, 2) / r;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
