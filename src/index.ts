/**
 * @desc 项目打包的入口文件
 * @desc 当前支持api列表，自动生成的，请不要修改；
 */

// version的信息，不可变
import { version, versionCode } from './.cache/version';
import add from './api/add';

export {
  version,
  versionCode,
  add
};

export default add;
