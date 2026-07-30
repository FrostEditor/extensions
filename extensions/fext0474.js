// Name: Frost网址工具 #0474
// ID: fext0474
// Description: 网址工具 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0474: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0474',
        name: 'Frost网址工具 #0474',
        color1: '#da7a4e',
        color2: '#ca5d2b',
        color3: '#a04922',
        blocks: [
          {
            opcode: 'domain',
            blockType: Scratch.BlockType.REPORTER,
            text: '从网址 [u] 取域名',
            arguments: {
            u: { type: Scratch.ArgumentType.STRING, defaultValue: "https://scratch.mit.edu/projects" }
            },
            docs: '提取域名。'
          },
          {
            opcode: 'protocol',
            blockType: Scratch.BlockType.REPORTER,
            text: '从网址 [u] 取协议',
            arguments: {
            u: { type: Scratch.ArgumentType.STRING, defaultValue: "https://scratch.mit.edu" }
            },
            docs: '提取协议。'
          },
          {
            opcode: 'param',
            blockType: Scratch.BlockType.REPORTER,
            text: '从网址 [u] 取参数 [k]',
            arguments: {
            u: { type: Scratch.ArgumentType.STRING, defaultValue: "https://x.com/?id=5" },
            k: { type: Scratch.ArgumentType.STRING, defaultValue: "id" }
            },
            docs: '读取 URL 查询参数。'
          }
        ]
      };
    }

        async domain(args) {
          try { return new URL(String(args.u)).hostname; } catch (e) { return "错误: 无效网址"; }
        }

        async protocol(args) {
          try { return new URL(String(args.u)).protocol; } catch (e) { return "错误: 无效网址"; }
        }

        async param(args) {
          try { return new URL(String(args.u)).searchParams.get(String(args.k)) || ""; } catch (e) { return "错误: 无效网址"; }
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
