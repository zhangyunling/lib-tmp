'use strict'
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

let readmeTxt = `
## lib-flow（最新版本：${pkg.version}）
> 一个支持typescript的类库脚手架；

### 开发文档

#### 安装

\`\`\`
npm i 
\`\`\`

#### 开发模式

\`\`\`
npm run dev
\`\`\`

开发调试：

[http://localhost:8089/](http://localhost:8089/)

[http://127.0.0.1:8089/](http://127.0.0.1:8089/)

[http://{你的ip}:8089/](http://{你的ip}:8089/)

#### 编译项目
> 编译后的代码，会在 根目录的 \`dist\` 目录
\`\`\`
npm run build
\`\`\`

#### 其他依赖

##### eslint

> [eslint 官方文档](https://cn.eslint.org/)

代码风格，使用\`eslint\`来限制；
eslint规则在跟目录的：\`.eslintrc.js\`文件；

为了开发方便，在开发和编译的过程中，有些配置是不同的，具体可以去配置文件查看；

> 例如：开发中可以使用console.log，但是编译时，console.log会报错，无法编译成功；

##### typescript
> [官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)，[其他文档](https://ts.xcatliu.com/basics)

代码的静态检查使用 \`typescript\` ，所以需要你去简单了解一下语法；

##### pre-commit 
> 增加\`git commit\`前的钩子，来做一些限制；

目前只有两个限制：
1. \`commit\` 前会再次验证\`eslint\`；
2. \`commit\` 前会限制提交信息规范；

commit 的提交类型主要包含以下几种：
1. feat ： 新增功能；
2. fix： BUG修复；
3. docs：修改文档；
4. style：样式修改；
5. refactor：代码重构，比如重构某个组件；
6. perf：提升性能的改动
7. test：单元测试修改；
8. workflow： 工作流相关修改
9. chore：构建过程，依赖库，辅助工具等相关；
10. revert：回滚
11. delete：删除代码；
11. merge：合并分支，解决冲突时；

所以，按照这个类型，当你commit的时候，你需要需要提交的内容如下：

> 以\`feat\`为例：

\`\`\`
git commit -m "feat: 描述信息"
git commit -m "feat(信息): 描述信息"
\`\`\`

> 小括号部分，可有可无，描述信息必须要有；

### npm包发布
\`\`\`
npm run publish
\`\`\`

`;

function _create(){
	let _root = path.resolve(__dirname, '../src/');
	let _docRoot = path.resolve(__dirname, '../docs/');
	let _apiArr = [];
	let _now = Date.now();

	function _walk(_path){
		let _dirArr = fs.readdirSync(_path);

		_dirArr.forEach(function( file ) {
	  	// '_'开头的文件夹和文件，为私有变量，都不做任何处理
	  	if(file.indexOf('_') === 0){
	  		return;
	  	}

	    let _dir = path.resolve(_path, file);
	    let stat = fs.statSync( _dir );

	    if (stat && stat.isDirectory()) {
	      _walk( _dir );
	    } else {
	     	_createApiArr(_dir, file); 
	    }
	  });
	}

	function _createApiArr(_dir, file){
		let content = fs.readFileSync(_dir, 'utf-8');
		let info = {};
		let docName = file.replace('js', 'md');
		let stat = null;

		// 获取method名称
		content.replace(/\@method\s+([^\n\t]+)/, function(p1, p2){
			info.method = p2;
		});
		// 获取version名称
		content.replace(/\@since\s+version\s+([^\n\t]+)/, function(p1, p2){
			info.version = p2;
		});
		// 获取desc名称
		content.replace(/\@desc\s+([^\n\t]+)/, function(p1, p2){
			info.desc = p2;
		});

		// 进行错误过滤
		if(!info.method){
			return;
		}

		try{
			stat = fs.statSync( path.resolve(_docRoot, docName) );
		} catch (e){}

		// 根据是否有文档，生成不同的跳转链接
		if (stat){
			_apiArr.push('- ['+info.method+'](./docs/'+docName+'): (v:\`'+info.version+'\`) '+ info.desc);
		} else {
			_apiArr.push(`- \`${info.method}\`: (v:\`${info.version}\`) ${info.desc}`);
		}
	}

  // _walk(_root);
  console.log('开始生成readme文件');

	fs.writeFile(
		path.resolve(__dirname, '../README.md'), 
		`${readmeTxt}`,
		{flag:"w"}, 
		function(err, data){
	    if(err){
	        console.log("writeFile file error");
	        return false;
	    }

		  console.log('生成readme文件成功：'+(Date.now() - _now)+'ms');
	});
}

// 开始执行
_create();


