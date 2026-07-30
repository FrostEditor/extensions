// Name: Frost字符串哈希 #0958
// ID: fext0958
// Description: 字符串哈希 扩展提供 2 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0958: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0958',
        name: 'Frost字符串哈希 #0958',
        color1: '#da4e8e',
        color2: '#ca2b73',
        color3: '#a0225b',
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
