// Name: QXBurry
// ID: burry
// Description: 为你的角色作品模糊，搭配“图片”扩展使用更佳。
// By: 作者 <https://www.qxweb.top>
// License: MIT

(function (Scratch) {
    'use strict';

    if (!Scratch || !Scratch.extensions) {
        console.warn('图片模糊扩展: Scratch环境未找到');
        return;
    }

    class BlurExtension {
        constructor() {
            this.cache = new Map();
            this.maxCacheSize = 20;
            this.vm = Scratch.vm;
        }

        // ----- 工具：加载图片 -----
        loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                const timeout = setTimeout(() => {
                    reject(new Error('图片加载超时 (15s)'));
                }, 15000);
                img.onload = () => {
                    clearTimeout(timeout);
                    resolve(img);
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error('图片加载失败，请检查URL或跨域设置'));
                };
                img.src = url;
            });
        }

        // ----- 核心模糊处理 -----
        async processBlur(url, strength, maxDimension = 2048) {
            if (!url || typeof url !== 'string' || url.trim() === '') {
                return '错误: 图片URL不能为空';
            }
            const urlTrimmed = url.trim();
            const cacheKey = `${urlTrimmed}_${strength}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            const clampedStrength = Math.min(100, Math.max(0, Number(strength) || 0));
            const radius = (clampedStrength / 100) * 25;

            try {
                const img = await this.loadImage(urlTrimmed);
                let width = img.width;
                let height = img.height;
                if (width > maxDimension || height > maxDimension) {
                    const ratio = Math.min(maxDimension / width, maxDimension / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d', { willReadFrequently: false });

                if (radius === 0) {
                    ctx.drawImage(img, 0, 0, width, height);
                } else {
                    ctx.filter = `blur(${radius}px)`;
                    ctx.drawImage(img, 0, 0, width, height);
                }

                const dataUrl = canvas.toDataURL('image/png');
                // 缓存
                if (this.cache.size >= this.maxCacheSize) {
                    const firstKey = this.cache.keys().next().value;
                    this.cache.delete(firstKey);
                }
                this.cache.set(cacheKey, dataUrl);
                return dataUrl;
            } catch (error) {
                return `错误: ${error.message}`;
            }
        }

        // ----- 获取当前角色造型 -----
        async getCurrentCostumeDataURL() {
            if (!this.vm) {
                return '错误: 无法访问Scratch VM';
            }
            const target = this.vm.editingTarget;
            if (!target) {
                return '错误: 未选中任何角色或舞台';
            }
            const costumes = target.getCostumes();
            if (!costumes || costumes.length === 0) {
                return '错误: 该角色没有造型';
            }
            const currentIndex = target.currentCostume || 0;
            const costume = costumes[currentIndex];
            if (!costume) {
                return '错误: 当前造型不存在';
            }
            try {
                if (costume.asset && typeof costume.asset.encodeDataURI === 'function') {
                    return costume.asset.encodeDataURI();
                } else if (costume.data) {
                    const blob = new Blob([costume.data], { type: costume.assetType || 'image/png' });
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                } else {
                    return '错误: 无法读取造型数据';
                }
            } catch (e) {
                return `错误: 获取造型失败 - ${e.message}`;
            }
        }

        // ----- 通过名称获取角色造型 -----
        async getCostumeDataURLByName(name) {
            if (!this.vm) {
                return '错误: 无法访问Scratch VM';
            }
            // 获取所有目标（包括舞台）
            const targets = this.vm.runtime.targets;
            if (!targets) {
                return '错误: 无法获取角色列表';
            }
            // 按名称查找（忽略大小写？这里精确匹配）
            const target = targets.find(t => t.getName && t.getName() === name);
            if (!target) {
                return `错误: 未找到名为 "${name}" 的角色`;
            }
            // 获取当前造型
            const costumes = target.getCostumes();
            if (!costumes || costumes.length === 0) {
                return `错误: 角色 "${name}" 没有造型`;
            }
            const currentIndex = target.currentCostume || 0;
            const costume = costumes[currentIndex];
            if (!costume) {
                return `错误: 角色 "${name}" 的当前造型不存在`;
            }
            try {
                if (costume.asset && typeof costume.asset.encodeDataURI === 'function') {
                    return costume.asset.encodeDataURI();
                } else if (costume.data) {
                    const blob = new Blob([costume.data], { type: costume.assetType || 'image/png' });
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                } else {
                    return `错误: 无法读取角色 "${name}" 的造型数据`;
                }
            } catch (e) {
                return `错误: 获取角色 "${name}" 造型失败 - ${e.message}`;
            }
        }

        // ----- 积木块 -----

        // 1. 模糊当前角色（便捷）
        async blurCurrentSprite(args) {
            const strength = Number(args.strength) || 50;
            const urlOrError = await this.getCurrentCostumeDataURL();
            if (urlOrError.startsWith('错误:')) {
                return urlOrError;
            }
            return await this.processBlur(urlOrError, strength);
        }

        // 2. 模糊指定角色（新增）
        async blurSpriteByName(args) {
            const name = String(args.name || '').trim();
            const strength = Number(args.strength) || 50;
            if (!name) {
                return '错误: 请输入角色名称';
            }
            const urlOrError = await this.getCostumeDataURLByName(name);
            if (urlOrError.startsWith('错误:')) {
                return urlOrError;
            }
            return await this.processBlur(urlOrError, strength);
        }

        // 3. 模糊外部图片（原有）
        async blurImage(args) {
            const url = args.url || '';
            const strength = Number(args.strength) || 50;
            return await this.processBlur(url, strength);
        }

        // 4. 获取图片宽度（原有）
        async getImageWidth(args) {
            const url = args.url || '';
            if (!url || url.trim() === '') return '0';
            try {
                const img = await this.loadImage(url.trim());
                return String(img.width);
            } catch { return '0'; }
        }

        // 5. 获取图片高度（原有）
        async getImageHeight(args) {
            const url = args.url || '';
            if (!url || url.trim() === '') return '0';
            try {
                const img = await this.loadImage(url.trim());
                return String(img.height);
            } catch { return '0'; }
        }

        // 6. 清除缓存（原有）
        clearCache(args) {
            this.cache.clear();
            return '缓存已清除';
        }

        // ----- 扩展信息 -----
        getInfo() {
            return {
                id: 'qxblur',
                name: '千絮模糊 ',
                color1: '#6C5CE7',
                color2: '#5A4BD1',
                color3: '#483BB8',
                blocks: [
                    // 新增：按名称模糊角色
                    {
                        opcode: 'blurSpriteByName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '模糊角色 [name] 强度 [strength]',
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '角色1'
                            },
                            strength: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50,
                                min: 0,
                                max: 100
                            }
                        },
                        docs: '按角色名称模糊指定的角色（当前造型），返回模糊后的图片数据URL。需将该URL用"将造型设为..."积木来更新角色。'
                    },
                    // 原有：模糊当前角色
                    {
                        opcode: 'blurCurrentSprite',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '模糊当前角色 强度 [strength]',
                        arguments: {
                            strength: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50,
                                min: 0,
                                max: 100
                            }
                        },
                        docs: '模糊当前选中的角色（当前造型），返回模糊后的图片数据URL。'
                    },
                    // 原有：模糊外部图片
                    {
                        opcode: 'blurImage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '模糊图片 [url] 强度 [strength]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/400/300'
                            },
                            strength: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50,
                                min: 0,
                                max: 100
                            }
                        },
                        docs: '对指定URL的图片进行高斯模糊处理，返回模糊后的图片数据URL。'
                    },
                    // 原有：获取尺寸
                    {
                        opcode: 'getImageWidth',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '图片 [url] 的宽度',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/400/300'
                            }
                        },
                        docs: '获取指定URL图片的宽度（像素）。'
                    },
                    {
                        opcode: 'getImageHeight',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '图片 [url] 的高度',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/400/300'
                            }
                        },
                        docs: '获取指定URL图片的高度（像素）。'
                    },
                    // 原有：清除缓存
                    {
                        opcode: 'clearCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清除模糊缓存',
                        arguments: {},
                        docs: '清除扩展内部缓存，释放内存。'
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new BlurExtension());
    console.log('🖼 图片模糊扩展（增强版）已加载，支持按名称模糊任意角色！');

})(Scratch);