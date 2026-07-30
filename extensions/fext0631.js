// Name: Frost单位换算 #0631
// ID: fext0631
// Description: 单位换算 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0631: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0631',
        name: 'Frost单位换算 #0631',
        color1: '#da604e',
        color2: '#ca3f2b',
        color3: '#a03222',
        blocks: [
          {
            opcode: 'c2f',
            blockType: Scratch.BlockType.REPORTER,
            text: '摄氏 [c] 度转华氏',
            arguments: {
            c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 25 }
            },
            docs: '摄氏度转华氏度。'
          },
          {
            opcode: 'f2c',
            blockType: Scratch.BlockType.REPORTER,
            text: '华氏 [f] 度转摄氏',
            arguments: {
            f: { type: Scratch.ArgumentType.NUMBER, defaultValue: 77 }
            },
            docs: '华氏度转摄氏度。'
          },
          {
            opcode: 'm2km',
            blockType: Scratch.BlockType.REPORTER,
            text: '米 [m] 转千米',
            arguments: {
            m: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 }
            },
            docs: '米转千米。'
          },
          {
            opcode: 'km2m',
            blockType: Scratch.BlockType.REPORTER,
            text: '千米 [k] 转米',
            arguments: {
            k: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
            docs: '千米转米。'
          }
        ]
      };
    }

        async c2f(args) {
          return (Number(args.c) || 0) * 9 / 5 + 32;
        }

        async f2c(args) {
          return ((Number(args.f) || 0) - 32) * 5 / 9;
        }

        async m2km(args) {
          return (Number(args.m) || 0) / 1000;
        }

        async km2m(args) {
          return (Number(args.k) || 0) * 1000;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
