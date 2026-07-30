// Name: Frost字符串哈希 #0176
// ID: fext0176
// Description: 字符串哈希 扩展提供 2 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0176: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0176',
        name: 'Frost字符串哈希 #0176',
        color1: '#a8da4e',
        color2: '#91ca2b',
        color3: '#73a022',
        blocks: [
          {
            opcode: 'djb2',
            blockType: Scratch.BlockType.REPORTER,
            text: '文本 [t] 的 DJB2 哈希',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" }
            },
            docs: 'DJB2 哈希值。'
          },
          {
            opcode: 'fnv',
            blockType: Scratch.BlockType.REPORTER,
            text: '文本 [t] 的 FNV-1a 哈希',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" }
            },
            docs: 'FNV-1a 哈希值。'
          }
        ]
      };
    }

        async djb2(args) {
          var h = 5381; for (var i = 0; i < String(args.t).length; i++) { h = ((h << 5) + h + String(args.t).charCodeAt(i)) >>> 0; } return h;
        }

        async fnv(args) {
          var h = 0x811c9dc5; for (var i = 0; i < String(args.t).length; i++) { h ^= String(args.t).charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
