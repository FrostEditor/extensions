// Name: Frost文本编码 #0216
// ID: fext0216
// Description: 文本编码 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0216: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0216',
        name: 'Frost文本编码 #0216',
        color1: '#4ed6da',
        color2: '#2bc5ca',
        color3: '#229ca0',
        blocks: [
          {
            opcode: 'b64e',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 编码为 Base64',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" }
            },
            docs: 'Base64 编码。'
          },
          {
            opcode: 'b64d',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 解码 Base64',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "SGVsbG8=" }
            },
            docs: 'Base64 解码。'
          },
          {
            opcode: 'urlenc',
            blockType: Scratch.BlockType.REPORTER,
            text: 'URL 编码 [t]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "a b&c" }
            },
            docs: 'URL 编码。'
          },
          {
            opcode: 'reverse2',
            blockType: Scratch.BlockType.REPORTER,
            text: '反转文本 [t]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "abc" }
            },
            docs: '反转字符串。'
          }
        ]
      };
    }

        async b64e(args) {
          try { return btoa(unescape(encodeURIComponent(String(args.t)))); } catch (e) { return "错误: 编码失败"; }
        }

        async b64d(args) {
          try { return decodeURIComponent(escape(atob(String(args.t)))); } catch (e) { return "错误: 解码失败"; }
        }

        async urlenc(args) {
          try { return encodeURIComponent(String(args.t)); } catch (e) { return String(args.t); }
        }

        async reverse2(args) {
          return String(args.t).split("").reverse().join("");
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
