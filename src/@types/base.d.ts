/**
 * @desc jsbridge相关的类型定义，
 * @desc 参考地址：https://www.tslang.cn/docs/handbook/declaration-files/by-example.html
 */

// 版本号定义
interface LibVersionTypes {
  readonly version: string; // 字符串版本号
  readonly versionCode: number; // 数字版本号
}