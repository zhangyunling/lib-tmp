/**
 * 自动生成qapp的api列表的node小服务；
 */

'use strict'
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

let _root = path.resolve(__dirname, '../src/api/');
let _apiNames = [`version`,`
  versionCode`];
let _importList = [];
let _now = Date.now();

function _walk(_path){
  fs.readdirSync(_path).forEach(function( file ) {
    // 只有以 qapp 开头的，才会被统计下来；
    if(file.indexOf('api') !== 0){
      return;
    }

    let name = file.replace('api.', '').replace('.ts', '');

    _apiNames.push(`
  ${name}`);
    _importList.push(`import ${name} from './api/api.${name}';
`);
  });
}

_walk(_root);

let apiListTxt = `
/**
 * @desc 项目打包的入口文件，自动生成
 * @desc 当前支持api列表，自动生成的，请不要修改；
 * @desc 若要修改，请到root/scripts/create-apiList文件去修改；
 */

// version的信息，不可变
import { version, versionCode } from './.cache/version';
${_importList.join('')}
export {
  ${_apiNames.join(',')}
};

export default {
  ${_apiNames.join(',')}
};
`;

fs.writeFile(
  path.resolve(__dirname, '../src/index.ts'), 
  `${apiListTxt}`,
  {flag:"w"}, 
  function(err, data){
    if(err){
      console.log("writeFile file error");
      return false;
    }
    console.info('生成 src/index.ts，耗时：' + (Date.now() - _now)+'ms;');
});
