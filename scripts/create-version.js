/**
 * 自动生成版本号；
 */

'use strict'
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

let _root = path.resolve(__dirname, '../src/qapp-bridge/');
let _apiArr = [];
let _now = Date.now();
let _vCode = _getVersionCode(pkg.version);

function _getVersionCode(version){
	let code = 1000000;
  let arr = version.split('.');

  return code + arr[0] * 10000 + arr[1] * 100 + arr[2] * 1;
}

let versionTxt = `/**
 * @desc version的配置，根据package.json自动生成的；
 */

export var version: string = '${pkg.version}';
export var versionCode: number = ${_vCode};

export const vCfg: LibVersionTypes = {
  version,
  versionCode
}
export default vCfg;
`;

fs.writeFile(
	path.resolve(__dirname, '../src/.cache/version.ts'), 
	`${versionTxt}`,
	{flag:"w"}, 
	function(err, data){
  	if(err){
      console.log("writeFile file error");
      return false;
  	}
  	console.info('生成 .catch/version.ts，耗时：' + (Date.now() - _now)+'ms;');
});