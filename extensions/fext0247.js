// Name: Frost金融计算 #0247
// ID: fext0247
// Description: 金融计算 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0247: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0247',
        name: 'Frost金融计算 #0247',
        color1: '#4eda59',
        color2: '#2bca37',
        color3: '#22a02b',
        blocks: [
          {
            opcode: 'compound',
            blockType: Scratch.BlockType.REPORTER,
            text: '复利(本金[p], 年利率[r]%, 年数[y])',
            arguments: {
            p: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
            r: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
            docs: '复利终值。'
          },
          {
            opcode: 'discount',
            blockType: Scratch.BlockType.REPORTER,
            text: '打折(原价[p], 折扣[d]%)',
            arguments: {
            p: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            },
            docs: '折扣后价格。'
          },
          {
            opcode: 'vat',
            blockType: Scratch.BlockType.REPORTER,
            text: '含税价(税前[p], 税率[t]%)',
            arguments: {
            p: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            t: { type: Scratch.ArgumentType.NUMBER, defaultValue: 13 }
            },
            docs: '含税后价格。'
          }
        ]
      };
    }

        async compound(args) {
          return (Number(args.p) || 0) * Math.pow(1 + (Number(args.r) || 0) / 100, Number(args.y) || 0);
        }

        async discount(args) {
          return (Number(args.p) || 0) * (1 - (Number(args.d) || 0) / 100);
        }

        async vat(args) {
          return (Number(args.p) || 0) * (1 + (Number(args.t) || 0) / 100);
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
