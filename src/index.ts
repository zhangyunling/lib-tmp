
/**
 * @desc 项目打包的入口文件，自动生成
 * @desc 当前支持api列表，自动生成的，请不要修改；
 * @desc 若要修改，请到root/scripts/create-apiList文件去修改；
 */

// version的信息，不可变
import { version, versionCode } from './.cache/version';
import add from './api/api.add';
import double from './api/api.double';

export {
  version,
  versionCode,
  add,
  double
};

export default {
  version,
  versionCode,
  add,
  double
};
