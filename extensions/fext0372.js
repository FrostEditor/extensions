// Name: Frost时间与日期 #0372
// ID: fext0372
// Description: 时间与日期 扩展提供 4 个实用积木.
// By: FrostEditor
// License: MIT

(function (Scratch) {
  'use strict';
  if (!Scratch || !Scratch.extensions) {
    console.warn('fext0372: Scratch 环境未找到');
    return;
  }

  class FrostExtension {
    constructor() {
      this.vm = Scratch.vm;
    }

    getInfo() {
      return {
        id: 'fext0372',
        name: 'Frost时间与日期 #0372',
        color1: '#da9b4e',
        color2: '#ca822b',
        color3: '#a06722',
        blocks: [
          {
            opcode: 'now',
            blockType: Scratch.BlockType.REPORTER,
            text: '当前时间戳(毫秒)',
            arguments: {

            },
            docs: '当前 Unix 毫秒时间戳。'
          },
          {
            opcode: 'dateStr',
            blockType: Scratch.BlockType.REPORTER,
            text: '今天的日期(YYYY-MM-DD)',
            arguments: {

            },
            docs: '本地日期。'
          },
          {
            opcode: 'timeStr',
            blockType: Scratch.BlockType.REPORTER,
            text: '当前时间(HH:MM:SS)',
            arguments: {

            },
            docs: '本地时间。'
          },
          {
            opcode: 'weekday',
            blockType: Scratch.BlockType.REPORTER,
            text: '今天是星期几(1-7)',
            arguments: {

            },
            docs: '周一为1。'
          }
        ]
      };
    }

        async now(args) {
          return Date.now();
        }

        async dateStr(args) {
          var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
        }

        async timeStr(args) {
          var d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + ":" + String(d.getSeconds()).padStart(2, "0");
        }

        async weekday(args) {
          return ((new Date().getDay() + 6) % 7) + 1;
        }
  }

  Scratch.extensions.register(new FrostExtension());
})(Scratch);
