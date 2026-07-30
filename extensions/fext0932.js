// Name: FrostJSON 工具 #0932
// ID: fext0932
// Description: JSON 工具 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0932: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0932',
        name: 'FrostJSON 工具 #0932',
        color1: '#da4e54',
        color2: '#ca2b32',
        color3: '#a02227',
        blocks: [
          {
            opcode: 'parse',
            blockType: Scratch.BlockType.REPORTER,
            text: '解析 JSON [t]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "{\"a\":1}" }
            },
            docs: '解析并规范化 JSON。'
          },
          {
            opcode: 'getString',
            blockType: Scratch.BlockType.REPORTER,
            text: '从 JSON [t] 中取键 [k]',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "{\"a\":1}" },
            k: { type: Scratch.ArgumentType.STRING, defaultValue: "a" }
            },
            docs: '读取 JSON 字段。'
          },
          {
            opcode: 'stringify',
            blockType: Scratch.BlockType.REPORTER,
            text: '把 [t] 转为 JSON 文本',
            arguments: {
            t: { type: Scratch.ArgumentType.STRING, defaultValue: "a" }
            },
            docs: '序列化 JSON。'
          }
        ]
      };
    }

        async parse(args) {
          try { return JSON.stringify(JSON.parse(String(args.t))); } catch (e) { return "错误: 无效JSON"; }
        }

        async getString(args) {
          try { var o = JSON.parse(String(args.t)); return o[String(args.k)]; } catch (e) { return "错误: 无效JSON"; }
        }

        async stringify(args) {
          try { return JSON.stringify(String(args.t)); } catch (e) { return String(args.t); }
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
