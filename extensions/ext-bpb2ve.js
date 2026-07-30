// Name: 天气获取
// ID: ext-bpb2ve
// Description: 实时获得各地区天气
// By: 千絮
// Version: 1.0.0
// License: MIT

(function (Scratch) {
    'use strict';

    // 检查 Scratch 环境
    if (!Scratch || !Scratch.extensions) {
        console.warn('Weather extension: Scratch environment not found');
        return;
    }

    class WeatherExtension {
        constructor() {
            this.baseUrl = 'https://uapis.cn/api/v1/misc/weather';
            // 默认语言：中文
            this.defaultLang = 'zh';
        }

        /**
         * 构建请求 URL
         * @param {Object} params - 请求参数
         * @returns {string} 完整的 URL
         */
        buildUrl(params) {
            const url = new URL(this.baseUrl);
            // 城市名称
            if (params.city && params.city.trim() !== '') {
                url.searchParams.append('city', params.city.trim());
            }
            // 行政区划代码
            if (params.adcode && params.adcode.trim() !== '') {
                url.searchParams.append('adcode', params.adcode.trim());
            }
            // 扩展字段
            if (params.extended) {
                url.searchParams.append('extended', 'true');
            }
            // 天气预报
            if (params.forecast) {
                url.searchParams.append('forecast', 'true');
            }
            // 逐小时预报
            if (params.hourly) {
                url.searchParams.append('hourly', 'true');
            }
            // 分钟级降水
            if (params.minutely) {
                url.searchParams.append('minutely', 'true');
            }
            // 生活指数
            if (params.indices) {
                url.searchParams.append('indices', 'true');
            }
            // 语言
            url.searchParams.append('lang', this.defaultLang);
            return url.toString();
        }

        /**
         * 执行网络请求
         * @param {string} url - 请求 URL
         * @returns {Promise<string>} JSON 字符串
         */
        async fetchWeather(url) {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    // 超时设置（通过 AbortController）
                    signal: AbortSignal.timeout(10000)
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    return JSON.stringify({
                        error: true,
                        code: response.status,
                        msg: errorData.msg || `HTTP ${response.status}`,
                        data: null
                    });
                }

                const data = await response.json();
                return JSON.stringify(data);
            } catch (e) {
                // 网络错误或超时
                return JSON.stringify({
                    error: true,
                    code: -1,
                    msg: e.message || '网络请求失败',
                    data: null
                });
            }
        }

        /**
         * 从 JSON 对象中按路径获取值
         * @param {Object} obj - JSON 对象
         * @param {string} path - 点号分隔的路径，如 "data.now.temperature"
         * @returns {any} 提取的值，如果不存在则返回 undefined
         */
        getValueByPath(obj, path) {
            if (!obj || typeof obj !== 'object') return undefined;
            if (!path || typeof path !== 'string') return undefined;

            const parts = path.split('.');
            let current = obj;
            for (const part of parts) {
                if (current === undefined || current === null) {
                    return undefined;
                }
                if (typeof current === 'object' && part in current) {
                    current = current[part];
                } else {
                    return undefined;
                }
            }
            return current;
        }

        /**
         * 安全地将值转为字符串
         */
        safeString(value) {
            if (value === undefined || value === null) return '';
            if (typeof value === 'string') return value;
            if (typeof value === 'number') return String(value);
            if (typeof value === 'boolean') return String(value);
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value);
        }

        // ==================== 积木块实现 ====================

        /**
         * 积木块1: 查询天气 (城市名)
         * 返回 JSON 字符串
         */
        queryByCity(args) {
            const city = String(args.city || '').trim();
            if (city === '') {
                // 如果城市名为空，自动定位
                return this.queryByIP(args);
            }
            const url = this.buildUrl({
                city: city,
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块2: 查询天气 (行政区划)
         * 返回 JSON 字符串
         */
        queryByAdcode(args) {
            const adcode = String(args.adcode || '').trim();
            if (adcode === '') {
                return JSON.stringify({
                    error: true,
                    code: -1,
                    msg: '行政区划代码不能为空',
                    data: null
                });
            }
            const url = this.buildUrl({
                adcode: adcode,
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块3: 查询天气 (自动定位)
         * 返回 JSON 字符串
         */
        queryByIP(args) {
            const url = this.buildUrl({
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块4: 查询天气详细 (城市名 + 选项)
         * 返回 JSON 字符串
         */
        queryByCityDetailed(args) {
            const city = String(args.city || '').trim();
            if (city === '') {
                return JSON.stringify({
                    error: true,
                    code: -1,
                    msg: '城市名不能为空',
                    data: null
                });
            }
            const extended = args.extended === true || args.extended === 'true';
            const forecast = args.forecast === true || args.forecast === 'true';
            const hourly = args.hourly === true || args.hourly === 'true';
            const minutely = args.minutely === true || args.minutely === 'true';
            const indices = args.indices === true || args.indices === 'true';

            const url = this.buildUrl({
                city: city,
                extended: extended,
                forecast: forecast,
                hourly: hourly,
                minutely: minutely,
                indices: indices
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块5: 查询天气详细 (行政区划 + 选项)
         * 返回 JSON 字符串
         */
        queryByAdcodeDetailed(args) {
            const adcode = String(args.adcode || '').trim();
            if (adcode === '') {
                return JSON.stringify({
                    error: true,
                    code: -1,
                    msg: '行政区划代码不能为空',
                    data: null
                });
            }
            const extended = args.extended === true || args.extended === 'true';
            const forecast = args.forecast === true || args.forecast === 'true';
            const hourly = args.hourly === true || args.hourly === 'true';
            const minutely = args.minutely === true || args.minutely === 'true';
            const indices = args.indices === true || args.indices === 'true';

            const url = this.buildUrl({
                adcode: adcode,
                extended: extended,
                forecast: forecast,
                hourly: hourly,
                minutely: minutely,
                indices: indices
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块6: 查询天气详细 (自动定位 + 选项)
         * 返回 JSON 字符串
         */
        queryByIPDetailed(args) {
            const extended = args.extended === true || args.extended === 'true';
            const forecast = args.forecast === true || args.forecast === 'true';
            const hourly = args.hourly === true || args.hourly === 'true';
            const minutely = args.minutely === true || args.minutely === 'true';
            const indices = args.indices === true || args.indices === 'true';

            const url = this.buildUrl({
                extended: extended,
                forecast: forecast,
                hourly: hourly,
                minutely: minutely,
                indices: indices
            });
            return this.fetchWeather(url);
        }

        /**
         * 积木块7: 从天气 JSON 中提取字段
         * 返回提取的值（字符串）
         */
        extractField(args) {
            const jsonStr = String(args.json || '{}');
            const path = String(args.path || '').trim();

            if (path === '') {
                return '';
            }

            try {
                const data = JSON.parse(jsonStr);
                const value = this.getValueByPath(data, path);
                return this.safeString(value);
            } catch (e) {
                // JSON 解析失败
                return '';
            }
        }

        /**
         * 积木块8: 快捷获取 - 当前温度 (城市名)
         * 返回温度值（字符串）
         */
        async getTemperature(args) {
            const city = String(args.city || '').trim();
            if (city === '') {
                return '';
            }
            const url = this.buildUrl({
                city: city,
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            const jsonStr = await this.fetchWeather(url);
            try {
                const data = JSON.parse(jsonStr);
                const temp = this.getValueByPath(data, 'data.now.temperature');
                return this.safeString(temp);
            } catch (e) {
                return '';
            }
        }

        /**
         * 积木块9: 快捷获取 - 当前天气状况 (城市名)
         * 返回天气状况（字符串）
         */
        async getWeatherCondition(args) {
            const city = String(args.city || '').trim();
            if (city === '') {
                return '';
            }
            const url = this.buildUrl({
                city: city,
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            const jsonStr = await this.fetchWeather(url);
            try {
                const data = JSON.parse(jsonStr);
                const condition = this.getValueByPath(data, 'data.now.weather');
                return this.safeString(condition);
            } catch (e) {
                return '';
            }
        }

        /**
         * 积木块10: 快捷获取 - 当前湿度 (城市名)
         * 返回湿度值（字符串）
         */
        async getHumidity(args) {
            const city = String(args.city || '').trim();
            if (city === '') {
                return '';
            }
            const url = this.buildUrl({
                city: city,
                extended: false,
                forecast: false,
                hourly: false,
                minutely: false,
                indices: false
            });
            const jsonStr = await this.fetchWeather(url);
            try {
                const data = JSON.parse(jsonStr);
                const humidity = this.getValueByPath(data, 'data.now.humidity');
                return this.safeString(humidity);
            } catch (e) {
                return '';
            }
        }

        // ==================== 扩展信息 ====================

        getInfo() {
            return {
                id: 'yun',
                name: '天气查询',
                color1: '#4A90D9',
                color2: '#357ABD',
                color3: '#2C6AA0',
                blocks: [
                    // ---- 基础查询 ----
                    {
                        opcode: 'queryByCity',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (城市名) [city]',
                        arguments: {
                            city: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '北京'
                            }
                        },
                        docs: '按城市名查询天气，返回 JSON 数据。城市名支持中文（北京）和英文（Tokyo）。',
                        isTerminal: true
                    },
                    {
                        opcode: 'queryByAdcode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (行政区划) [adcode]',
                        arguments: {
                            adcode: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '110000'
                            }
                        },
                        docs: '按行政区划代码查询天气，返回 JSON 数据。例如 110000 代表北京市。',
                        isTerminal: true
                    },
                    {
                        opcode: 'queryByIP',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (自动定位)',
                        arguments: {},
                        docs: '根据您的 IP 地址自动定位并查询天气，返回 JSON 数据。',
                        isTerminal: true
                    },

                    // ---- 详细查询（带选项） ----
                    {
                        opcode: 'queryByCityDetailed',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (城市名) [city] 包含 [extended] [forecast] [hourly] [minutely] [indices]',
                        arguments: {
                            city: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '上海'
                            },
                            extended: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            forecast: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            hourly: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            minutely: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            indices: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            }
                        },
                        docs: '按城市名查询天气，可开启扩展字段、天气预报、逐小时预报、分钟级降水、生活指数等选项。',
                        isTerminal: true
                    },
                    {
                        opcode: 'queryByAdcodeDetailed',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (行政区划) [adcode] 包含 [extended] [forecast] [hourly] [minutely] [indices]',
                        arguments: {
                            adcode: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '310000'
                            },
                            extended: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            forecast: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            hourly: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            minutely: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            indices: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            }
                        },
                        docs: '按行政区划代码查询天气，可开启扩展字段、天气预报、逐小时预报、分钟级降水、生活指数等选项。',
                        isTerminal: true
                    },
                    {
                        opcode: 'queryByIPDetailed',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '查询天气 (自动定位) 包含 [extended] [forecast] [hourly] [minutely] [indices]',
                        arguments: {
                            extended: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            forecast: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            hourly: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            minutely: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            },
                            indices: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false
                            }
                        },
                        docs: '根据 IP 自动定位查询天气，可开启扩展字段、天气预报、逐小时预报、分钟级降水、生活指数等选项。',
                        isTerminal: true
                    },

                    // ---- 数据提取 ----
                    {
                        opcode: 'extractField',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '从天气 JSON 获取 [json] 中的 [path]',
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"data":{"now":{"temperature":25}}}'
                            },
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'data.now.temperature'
                            }
                        },
                        docs: '从天气 JSON 数据中按路径提取字段值，路径使用点号分隔，如 data.now.temperature',
                        isTerminal: true
                    },

                    // ---- 快捷获取（常用字段） ----
                    {
                        opcode: 'getTemperature',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [city] 的当前温度',
                        arguments: {
                            city: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '北京'
                            }
                        },
                        docs: '快捷获取指定城市的当前温度（摄氏度）',
                        isTerminal: true
                    },
                    {
                        opcode: 'getWeatherCondition',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [city] 的当前天气状况',
                        arguments: {
                            city: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '北京'
                            }
                        },
                        docs: '快捷获取指定城市的当前天气现象（如晴、多云、小雨等）',
                        isTerminal: true
                    },
                    {
                        opcode: 'getHumidity',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [city] 的当前湿度',
                        arguments: {
                            city: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '北京'
                            }
                        },
                        docs: '快捷获取指定城市的当前湿度百分比',
                        isTerminal: true
                    }
                ]
            };
        }
    }

    // 注册扩展
    Scratch.extensions.register(new WeatherExtension());
    console.log('🌤 天气查询扩展已加载，由 UapiPro 提供支持');

})(Scratch);