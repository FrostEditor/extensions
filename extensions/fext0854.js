// Name: Frost颜色工具 #0854
// ID: fext0854
// Description: 颜色工具 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0854: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0854',
        name: 'Frost颜色工具 #0854',
        color1: '#beda4e',
        color2: '#abca2b',
        color3: '#87a022',
        blocks: [
          {
            opcode: 'rgb2hex',
            blockType: Scratch.BlockType.REPORTER,
            text: '由红[r]绿[g]蓝[b]生成颜色',
            arguments: {
            r: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
            g: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
            b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            docs: 'RGB 转十六进制颜色。'
          },
          {
            opcode: 'randColor',
            blockType: Scratch.BlockType.REPORTER,
            text: '随机颜色',
            arguments: {

            },
            docs: '生成一个随机颜色。'
          },
          {
            opcode: 'lighten',
            blockType: Scratch.BlockType.REPORTER,
            text: '把颜色[c]变亮[a]%',
            arguments: {
            c: { type: Scratch.ArgumentType.COLOR, defaultValue: "#6C5CE7" },
            a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            },
            docs: '（示例）返回原颜色。'
          },
          {
            opcode: 'mix',
            blockType: Scratch.BlockType.REPORTER,
            text: '混合颜色[x]与[y]',
            arguments: {
            x: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
            y: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" }
            },
            docs: '（示例）返回第一种颜色。'
          }
        ]
      };
    }

        async rgb2hex(args) {
          var c = v => Math.max(0, Math.min(255, Math.round(Number(v) || 0))).toString(16).padStart(2, "0"); return "#" + c(args.r) + c(args.g) + c(args.b);
        }

        async randColor(args) {
          var c = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0"); return "#" + c() + c() + c();
        }

        async lighten(args) {
          return args.c;
        }

        async mix(args) {
          return args.x;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
