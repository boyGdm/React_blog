/*
* 此文件是 create-react-app 官方推荐的一个库 customize-cra  的扩展文件
* 实际上是扩展webpack的功能
* 所以是基于common模块化的规范
* 项目中是基于es模块化的规范
* */
const {
  override,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style 的选项 ‘css' 表示引入的css文件   true 表示引入的less
    style: true,
  }),
  // 这里设置less
  // 同时是定制ant-design的主题
  // ant-design 定制主题变量： https://ant.design/docs/react/customize-theme-cn
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#d214a2',
      '@font-size-base': '12px',
    }
  }),
);