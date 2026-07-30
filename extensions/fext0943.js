// Name: Frost三角函数 #0943
// ID: fext0943
// Description: 三角函数 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0943: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0943',
        name: 'Frost三角函数 #0943',
        color1: '#c2da4e',
        color2: '#afca2b',
        color3: '#8ba022',
        blocks: [
          {
            opcode: 'sin',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sin([d]度)',
            arguments: {
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 }
            },
            docs: '正弦(角度制)。'
          },
          {
            opcode: 'cos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cos([d]度)',
            arguments: {
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 }
            },
            docs: '余弦(角度制)。'
          },
          {
            opcode: 'tan',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tan([d]度)',
            arguments: {
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 45 }
            },
            docs: '正切(角度制)。'
          }
        ]
      };
    }

        async sin(args) {
          return Math.sin((Number(args.d) || 0) * Math.PI / 180);
        }

        async cos(args) {
          return Math.cos((Number(args.d) || 0) * Math.PI / 180);
        }

        async tan(args) {
          return Math.tan((Number(args.d) || 0) * Math.PI / 180);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
