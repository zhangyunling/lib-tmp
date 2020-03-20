/**
 * @desc 项目打包的入口文件
 * @desc 当前支持api列表，自动生成的，请不要修改；
 */

// version的信息，不可变
import { version, versionCode } from './.cache/version';
import add from './api/add';
import double from './api/double';

export { version, versionCode, add, double };

export default {
  version,
  versionCode,
  add,
  double
};
