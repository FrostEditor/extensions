// Name: Frost几何计算 #0743
// ID: fext0743
// Description: 几何计算 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0743: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0743',
        name: 'Frost几何计算 #0743',
        color1: '#bf4eda',
        color2: '#ab2bca',
        color3: '#8822a0',
        blocks: [
          {
            opcode: 'dist',
            blockType: Scratch.BlockType.REPORTER,
            text: '点([x1],[y1])到点([x2],[y2])的距离',
            arguments: {
            x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
            y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
            },
            docs: '两点距离。'
          },
          {
            opcode: 'circleArea',
            blockType: Scratch.BlockType.REPORTER,
            text: '半径为 [r] 的圆面积',
            arguments: {
            r: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
            docs: '圆面积。'
          },
          {
            opcode: 'deg2rad',
            blockType: Scratch.BlockType.REPORTER,
            text: '角度 [d] 转弧度',
            arguments: {
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 180 }
            },
            docs: '度转弧度。'
          },
          {
            opcode: 'rad2deg',
            blockType: Scratch.BlockType.REPORTER,
            text: '弧度 [r] 转角度',
            arguments: {
            r: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14159 }
            },
            docs: '弧度转度。'
          }
        ]
      };
    }

        async dist(args) {
          return Math.hypot((Number(args.x2) || 0) - (Number(args.x1) || 0), (Number(args.y2) || 0) - (Number(args.y1) || 0));
        }

        async circleArea(args) {
          return Math.PI * Math.pow(Number(args.r) || 0, 2);
        }

        async deg2rad(args) {
          return (Number(args.d) || 0) * Math.PI / 180;
        }

        async rad2deg(args) {
          return (Number(args.r) || 0) * 180 / Math.PI;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
