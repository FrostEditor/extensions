// Name: Frost通用工具 #0688
// ID: fext0688
// Description: 通用工具 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0688: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0688',
        name: 'Frost通用工具 #0688',
        color1: '#b84eda',
        color2: '#a42bca',
        color3: '#8122a0',
        blocks: [
          {
            opcode: 'clamp',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [v] 限制在 [lo] 到 [hi]',
            arguments: {
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            lo: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            hi: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '数值钳制。'
          },
          {
            opcode: 'sign',
            blockType: Scratch.BlockType.REPORTER,
            text: '[v] 的符号',
            arguments: {
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: -3 }
            },
            docs: '符号函数。'
          },
          {
            opcode: 'round',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [v] 四舍五入到 [d] 位小数',
            arguments: {
            v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14159 },
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
            docs: '保留小数位。'
          }
        ]
      };
    }

        async clamp(args) {
          var v = Number(args.v) || 0, lo = Number(args.lo) || 0, hi = Number(args.hi) || 0; return Math.max(lo, Math.min(hi, v));
        }

        async sign(args) {
          var v = Number(args.v) || 0; return v > 0 ? 1 : (v < 0 ? -1 : 0);
        }

        async round(args) {
          var f = Math.pow(10, Number(args.d) || 0); return Math.round((Number(args.v) || 0) * f) / f;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
