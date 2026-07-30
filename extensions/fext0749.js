// Name: Frost音效辅助 #0749
// ID: fext0749
// Description: 音效辅助 扩展提供 3 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0749: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0749',
        name: 'Frost音效辅助 #0749',
        color1: '#da9c4e',
        color2: '#ca842b',
        color3: '#a06822',
        blocks: [
          {
            opcode: 'note2freq',
            blockType: Scratch.BlockType.REPORTER,
            text: '音名 [n](MIDI) 转频率',
            arguments: {
            n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 69 }
            },
            docs: 'MIDI 音高转频率(Hz)。'
          },
          {
            opcode: 'freq2note',
            blockType: Scratch.BlockType.REPORTER,
            text: '频率 [f]Hz 转最近音名',
            arguments: {
            f: { type: Scratch.ArgumentType.NUMBER, defaultValue: 440 }
            },
            docs: '频率转 MIDI 音高。'
          },
          {
            opcode: 'beat',
            blockType: Scratch.BlockType.REPORTER,
            text: 'BPM [bpm] 对应的每拍秒数',
            arguments: {
            bpm: { type: Scratch.ArgumentType.NUMBER, defaultValue: 120 }
            },
            docs: '拍时长。'
          }
        ]
      };
    }

        async note2freq(args) {
          return 440 * Math.pow(2, ((Number(args.n) || 0) - 69) / 12);
        }

        async freq2note(args) {
          return Math.round(69 + 12 * Math.log2((Number(args.f) || 1) / 440));
        }

        async beat(args) {
          var b = Number(args.bpm) || 1; return 60 / b;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
