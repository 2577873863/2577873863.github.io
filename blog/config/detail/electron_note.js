export default `
## 1.Electron介绍
* Electron 是由 Github开发的开源框架
* 它允许开发者使用Web技术构建跨平台的桌面应用
![electron的构成](http://newimg.jspang.com/web111111.jpg)
* Electron = Chromium + Node.js + Native API
  *  Chromium：为Electron提供了强大的UI能力，可以不考虑兼容性的情况下，使用强大的web生态来开发界面
  *  Node.js：让Electron有了底层的操作能力，比如文件的读写，甚至是集成C++等等操作，并可以使用大量的开源=-npm=-包来完成开发
  *  Native API：Native API让Electron有了跨平台和桌面端的原生能力，比如它具有用提的原生界面，窗口，托盘..
  
## 2.Electron开发环境的搭建
0. 创建项目文件夹
1. 使用=-npm=-初始化文件夹
    -=
    npm init -y
    -=
2. 安装Electron 
    -=
    npm install electron --save-dev
    -=
3. 检查是否安装成功|检测版本 (两个命令都可以)
    -=
    npx electron -v 
    ./node_modules/.bin/electron -v (cnpm安装的此命令不行)  
    -=
    * 成功会出现版本号 例：  =-v8.0.0=- 
    * 失败会需要再次下载，可能需要翻墙或者换源 
    * 失败提示:=-Electron failed to install correctly, please delete node_modules/electron and try installing again=-
4. 运行electron示例
    * 在=-package.json=-文件的=-scripts=-选项中添加
    -=
    "dev":"./node_modules/.bin/electron"
    -=
    * 在命令行执行  =-npm run dev=-
    
    * 运行结果
        ![运行结果](http://newimg.jspang.com/ElectronDemo2.png)


## 3.Electron的第一个例子
1. 创建文件夹
2. 使用=-npm=-初始文件夹
    -=
    npm init -y
    npm init --yes
    -=
3. 安装Electron
    -=
    cnpm install electron --save-dev
    -=
4. 创建页面(index.html)，代码如下：
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Electron案例1</title>
    </head>
    <body>
      <h2>Hello World</h2>
      <hr>
      <h2>Hello Electron</h2>
    </body>
    </html>
    -=
5. 创建主进程(main.js)，代码如下：
    -= js
    const electron = require('electron');

    const app = electron.app; //引用app
    const BrowserWindow = electron.BrowserWindow; //引用窗口
    
    let mainWindow = null; //要打开的主窗口
    
    app.on('ready',()=>{
      //https://www.electronjs.org/docs/api/browser-window
      mainWindow = new BrowserWindow({ //创建窗口
        width:300, //页面的宽度，单位px -默认800
        height:300  //页面的高度，单位px -默认800
      });
      mainWindow.loadFile('index.html'); //加载html页面
    
      mainWindow.on('closed',()=>{ //关闭时清除窗口，不然会一直占用内存
        mainWindow = null;
      })
    })
    -=
6. 修改=-package.json=-的=-scripts=-选项，如下：
    -= js
    "scripts": {
        "start":"electron ."
    },
    -=
7. 运行=-npm run start=-

8. 运行结果

    ![案例运行结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGubNt7ix2ndDtAr0ZKs1SaSOCblK6dztFeXwYOGhq3D*2g3cUVxnWSIY*LysMpXp2Zb1HtT03CQEk3*tbwo6TXg!/r)



## 4.Electron运行流程(附读取文件案例)
* Electron分为**主进程**和**渲染进程**
  * 一个Electron项目可以有**多个**渲染进程，但是只能**有且只有一个**主进程
  * 主进程控制渲染进程，一个主进程可以控制多个渲染进程
  ![渲染进程和主进程](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGmV66XGpPlWHOCcFH2*J7yeEQeiTnxV8bFsZH2vjQ.H7Ll*ML0bCYaEvP7YNMaMVcLMXxc*qnQA2uC.*vqlsGWk!/r)
* Electron运行流程
  ![运行流程图](http://newimg.jspang.com/electrondemo1.png)
    1. Electron会读取=-package.json=-的=-main=-来决定谁是**主进程**
        * 例如=-"main":"main.js"=-那么主进程就是=-main.js=-  *Electron会在 __主进程中找渲染进程__*
    2.  =-main.js=-(主进程文件)中创建**渲染进程**(=-mainWindow.loadFile('index.html')=-) 
    3.  读取页面(渲染进程)的布局和样式(UI)
    4.  使用IPC(进程见通信)在主进程执行任务并获取信息
* 读取文件案例
  * 文件目录
    -= json
    project
    ├─node_modules
    ├─data.txt
    ├─index.html
    ├─index.js
    ├─package.json
    ├─render
    |   └render.js
    -=
  * data.txt文件内容
    -=
    我是文件 data.txt 的内容，点击按钮我就会出现（此内容无所谓，可修改）
    -=
  * index.html(渲染进程)文件内容
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>读取文件案例</title>
    </head>
    <body>
      <button class="btn1">点击读取文件</button>
      <div class="container"></div>
      <!--引入js文件-->
      <script src="render/render.js"></script>
    </body>
    </html>
    -=
  * index.js(主进程)文件内容
    -= js
    const electron = require('electron');

    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;
    
    let mainWindow = null;
    
    app.on('ready',()=>{
      mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{  //网页功能的设置
        //创建BrowserWindow的时候指定nodeIntegration为false。 这样在electron内置浏览器里面不会有module和require全局变量。
          nodeIntegration:true //是否集成node(使用node模块) -默认为false
        }
      })
      mainWindow.loadFile('index.html');
      mainWindow.on('closed',()=>{
        mainWindow = null;
      })
    })
    -=
  * render/render.js文件内容
    -= js
    const fs = require('fs'); //引入node的fs模块 需要在渲染进程里面写东西

    window.onload = function(){
      let btn = document.querySelector('.btn1');
      let container = document.querySelector('.container');
      btn.addEventListener('click',()=>{
         fs.readFile('data.txt',(err,data)=>{ //读取文件
          if(err){
            container.innerHTML = '读取文件失败'
          }else{
            container.innerHTML = data;
          }
        });
      })
    }
    -=
  * package.json文件内容
    -= json
    {
      "name": "study_2",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "electron":"electron ."
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "electron": "^8.0.0"
      }
    }
    -=
  * 运行
    -=
    npm run electron
    yarn electron
    -=
  * 运行结果
  ![运行结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGvUYnwEGxx05y5X*otz8ayU8l24FbpGkNcHamP9L41J1xQhO9NQ2ShZM8cp66zjirsoAA1hshUOBJixdI76h.HY!/r)



## 5.Electron的remote模块
> [remote](https://www.electronjs.org/docs/api/remote)在渲染进程中使用主进程模块,
remote 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法。例如：从渲染进程创建浏览器窗口
* 借助=-remote=-Electron的API方法和模块也是分为可以在主进程和渲染进程中使用。

### 从渲染进程创建浏览器窗口案例
* 文件目录
  -=
  ├─index.html      --    渲染进程
  ├─index.js        --    主进程
  ├─index2.html     --    页面2
  ├─package.json    --    package.json文件
  ├─render      
  |   └render.js    --    渲染进程逻辑
  -=
* =-index.html=-渲染进程文件内容
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>remote模块</title>
  </head>
  <body>
    <button class="btn1">点击出现新页面</button>
    <script src="render/render.js"></script>
  </body>
  </html>
  -=
* =-index.js=-主进程文件
  -= js
  const electron = require('electron');
  const {app,BrowserWindow} = electron;
  let mainWindow = null;
  app.on('ready', () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 500,
      webPreferences: {
        //这里一定要写，不然在render.js里面无法使用js模块
        nodeIntegration: true
      }
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
      mainWindow = null;
    })
  });
  -=
* =-index2.html=-页面2文件内容
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>子页面</title>
  </head>
  <body style="background: #23da93;">
    <h1>我是新打开的页面</h1>
  </body>
  </html>
  -=
* =-render/render.js=-文件内容
  -= js
  let btn1 = document.querySelector('.btn1');
  //在渲染进程中使用主进程模块需要使用remote
  let { BrowserWindow } = require('electron').remote;
  btn1.addEventListener('click',()=>{
    const {BrowserWindow} = require('electron').remote;
    let win = new BrowserWindow({
      width:500,
      height:500
    });
    win.loadFile('index2.html');
    win.on('closed',()=>{
      win = null;
    })
  })
  -=
* =-package.json=-文件内容
  -= json
  {
    "name": "study_3",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start":"electron ."
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "electron": "^8.0.0"
    }
  }
  -=
* 在命令行中执行
  -=
  npm run start 
  yarn start
  -=
* 运行结果
  1. ![运行结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGuBD6Ax0k6w847XnRhfbJZOQOv1W8D0VlUaI6Mys0cfXzb5D75RU.uFc5*HIml2zjKDCv8ES9*BdG3nytg2*u8I!/r)
  2. ![点击按钮后的结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGgQ*nJHHPyDcVLhOBc.3wczAlu52iDZ7A4izSuMrxfj7T4MlhcKEI3ofQL7ZshrFtjFTcMNQ7JAmWPlfNVPTXvU!/r)



## 6.Electron创建菜单与基本使用
> [Menu](https://www.electronjs.org/docs/api/menu)创建原生应用菜单和上下文菜单
* 本篇使用到的方法
  1. =-Menu.buildFromTemplate(template)=- - 创建菜单，返回Menu  template是菜单模板
  2. =-Menu.setApplicationMenu(m)=- - 设置菜单  m是第一个方法的返回值
### 设置菜单的案例
* 文件路径：
  -=
  ├─index.html  -- 主页面(渲染进程)
  ├─index.js  -- 主进程
  ├─package.json  -- 配置文件
  ├─setting.html  -- 页面2
  ├─main
  |  └menu.js  -- 主进程菜单逻辑代码
  -=
* =-index.html=-文件代码：
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>菜单</title>
  </head>
  <body>
    <h2>菜单测试页面</h2>
  </body>
  </html>
  -=
* =-index.js=-渲染进程文件
  -= js
  const {app,BrowserWindow} = require('electron');
  let mainWindow = null;
  app.on("ready",()=>{
    mainWindow = new BrowserWindow({
      width:800,
      height:500,
      webPreferences:{
        nodeIntegration:true
      }
    })
    require('./main/menu.js'); //引入设置菜单
    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools(); //打开调试工具
    mainWindow.on('closed',()=>{
      mainWindow = null;
    })
  });
  -=
* =-main/menu.js=-菜单逻辑代码(属于主进程)
  -= js
  const { Menu, BrowserWindow } = require('electron');
  var template = [
    {
      label:'菜单1',
      submenu:[
        { label:"菜单1-1" },
        { 
          label:"菜单1-2",
          accelerator:'ctrl+f' //快捷键
        }
      ]
    },
    {
      label:'菜单2',
      submenu:[
        { label:'菜单2-1' },
        { label:'菜单2-2' }
      ]
    },
    {
      label:'设置',
      accelerator:'ctrl+n',
      click:()=>{
        let win = new BrowserWindow({
          width:500,
          height:500,
          webPreferences:{
            nodeIntegration:true
          }
        });
        win.loadFile('setting.html'); //引入设置界面
        win.on('closed',()=>{
          win = null;
        })
      }
    }
  ];
  //生成菜单
  var m = Menu.buildFromTemplate(template);
  //设置菜单
  Menu.setApplicationMenu(m);
  -=
* =-setting.html=-页面2代码
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>设置</title>
  </head>
  <body style="background: #ccc;">
    <h2>我是设置页面</h2>
  </body>
  </html>
  -=
* =-package.json=-文件代码
  -= json
  {
    "name": "study_4",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start":"electron ."
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "electron": "^8.0.0"
    }
  }
  -=
* 运行
  -=
  npm run start
  yarn start
  -=
* 运行结果
  ![运行结果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGsJ.x4SmcqHCLZGbW17PpzwUPnRV00os4iVJTMAC7lxQdQVcEMF5ISaREg7joqIBVGIYOGI.n.l97Hcb7Pf2Nlc!/r)
* 点击设置菜单或者按下=-ctrl+n=-效果图
  ![点击设置菜单效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGj6GO8e6js1T8KGprarb*2RZ8Qeh90o.GAOjCQA4lfxfbTFE7BPtxaDrOmiqrl3RMssvH30Y3gETt6L7x3xOm9c!/r)
* 二级菜单效果图
  ![二级菜单效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGu9jqiheisda4ER3.7JBgVXP3mBqi2fQCD9knyGj0T8DXwF682M9yjEjeWYIVS3oloSAlPXgC8GasE2XXq9e*wU!/r)



## 7.Electron右键菜单
* 右键菜单的相应事件是写在渲染进程中的，也就是在=-index.html=-中的，所以要是有=-remote=-模块进行操作
> 创建右键菜单依旧使用[Menu](https://www.electronjs.org/docs/api/menu)模块，菜单绑定事件方式也与上一篇相同
* 本片使用到的方法
  1. =-Menu.buildFromTemplate(template)=- -- 返回Menu对象  template - 菜单模板
  2. =-MenuObj.popup({})=- -- 将此菜单作为 browserWindow 中的上下文菜单弹出。 MenuObj是1返回的内容
  3. =-getCurrentWindow()=- -- 返回 BrowserWindow - 此网页所属的窗口

* 案例文件路径
  -=
  ├─index.html -- 渲染进程文件
  ├─index.js   -- 主进程文件
  ├─package.json  -- 配置文件
  ├─render
  |   └render.js -- 渲染进程逻辑文件
  -=
* =-index.html=-文件内容
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>右键菜单</title>
  </head>
  <body>
    <h2>右键菜单设置</h2>
    <script src="./render/render.js"></script>
  </body>
  </html>
  -=
* =-index.js=-文件内容
  -= js
  const {app, BrowserWindow} = require('electron');
  let win = null;
  app.on('ready',()=>{
    win = new BrowserWindow({
      width:800,
      height:500,
      webPreferences:{
        nodeIntegration:true
      }
    });

    win.loadFile('index.html');
    win.on('closed',()=>{
      win = null;
    })
  })
  -=
* =-render/render.js=-文件内容
  -= js
  const {Menu,getCurrentWindow} = require('electron').remote;
  const rightTemplate = [
    {
      label:'复制',
      accelerator:'ctrl+c'
    },
    {
      label:'粘贴',
      accelerator:'ctrl+v'
    }
  ]
  //生成菜单
  let m = Menu.buildFromTemplate(rightTemplate);

  window.addEventListener('contextmenu',e =>{
    e.preventDefault(); //阻止默认事件
    m.popup({ //设置菜单
      window:getCurrentWindow(), //返回BrowserWindow
    })
  })
  -=
* =-package.json=-文件内容
  -= json
  {
    "name": "study_5",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "electron ."
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "electron": "^8.0.1"
    }
  }
  -=
* 执行
  -=
  npm run start
  yarn start
  -=
* 执行结果(右键)

  ![运行效果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGsR*NTXt4HRQxcp9BE6a7Tk2b5TM00ezUq0qiov.Gajz4Uo4xDsyK0g7QJrjPwqS9m*BlYuMzlPbSUFWGNHlDy4!/r)
  
  
  
## 8.通过浏览器打开链接 - shell模块
> [shell](https://www.electronjs.org/docs/api/shell)模块可以既在渲染进程(==在渲染进程中不需要=-remote=-模块==)也可以主进程中使用
* 本片使用到的方法
  1. =-shell.openExternal(url)=- -- 在用户默认浏览器中打开url

### 使用案例
* 文件路径
  -=
  ├─index.html -- 渲染进程
  ├─index.js   -- 主进程
  ├─package.json -- 配置文件
  ├─render
  |   └render.js  -- 渲染进程逻辑
  -=
* =-index.html=-文件内容
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>通过浏览器打开链接</title>
  </head>
  <body>
    <h1>
      <!-- 直接点击会在electron应用内打开 -->
      <a href="http://www.baidu.com">点击应用内打开百度</a>
    </h1>
    <hr>
    <h1>
      <a class="a1" href="http://www.baidu.com">点击在浏览器中打开百度</a>
    </h1>
    <script src="render/render.js"></script>
  </body>
  </html>
  -=
* =-index.js=-文件内容
  -= js
  const {app, BrowserWindow} = require('electron');
  let mainWin = null;

  app.on('ready',()=>{
    mainWin = new BrowserWindow({
      width:800,
      height:500,
      webPreferences:{
        nodeIntegration:true
      }
    });
    mainWin.loadFile('index.html');
    //打开开发者工具
    mainWin.webContents.openDevTools();
    mainWin.on('closed',()=>{
      mainWin = null;
    })

  });
  -=
* =-render.js=-文件内容
  -= js
  const {shell} = require('electron');
  let a1 = document.querySelector('.a1');
  a1.addEventListener('click',(e)=>{
    e.preventDefault();
    let {href} = a1;
    //在浏览器打开链接
    //https://www.electronjs.org/docs/api/shell#shellbeep
    shell.openExternal(href);
    
  })
  -=
* =-package.json=-文件内容
  -= json
  {
    "name": "study_6",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "electron ."
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "electron": "^8.0.1"
    }
  }

  -=
* 执行=-npm run start=-或者=-yarn start=-即可


## 9.Electron嵌入网页和打开子窗口
1. 嵌入网页
    > [BrowserView](https://www.electronjs.org/docs/api/browser-view)可以实现类似于Web中=-<iframe>=-标签的效果(内嵌网页)，==BrowserView是主进程中的类，只能在主进程使用==
    
    * 示例代码 =-index.js=-主进程代码如下
      -= js
      const {app, BrowserWindow, BrowserView} = require('electron');
      app.on('ready',()=>{
        let mainWin = new BrowserWindow({
          width:1000,
          height:800,
          webPreferences:{
            nodeIntegration:true
          }
        });
        mainWin.loadFile('index.html');
        mainWin.on('closed',()=>{
          mainWin = null;
        })
        
        //嵌入页面代码
        //https://www.electronjs.org/docs/api/browser-view
        let view = new BrowserView(); //new出对象
        mainWin.setBrowserView(view); //在主窗口中设置view可用
        view.setBounds({
          x:0, //距离x轴的距离
          y:100,//距离y轴的距离
          width:1000, //宽度
          height:700 //高度
        })
        //view载入页面
        view.webContents.loadURL('https://uniapp.dcloud.io/');
      });
      -=
    * 其他代码无变化
    * 运行效果
      ![BrowserView内嵌网页运行图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGnDc69jBTi9ZS*QYVZF7SB3.inLiVrBF5Oag79USWWYFWy6CkY8SROSmj382MyJj4WiEA3G8GzkXfWINfXsK.XE!/r)

2. 打开子窗口
* 打开子页面使用=-window.open(url)=-方法
* 只有=-window.open()=-打开的页面才算是子页面，之前使用=-BrowserWindow=-打开的页面不算子页面
* 示例代码如下
  * =-index.html=-渲染进程
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>内嵌网页</title>
    </head>
    <body>
      <button class="btn1">点击打开子窗口</button>
      <script src="render/render.js"></script>
    </body>
    </html>
    -=
  *=-render/render.js=-渲染进程逻辑文件
    -= js
    let btn1 = document.querySelector('.btn1');
    btn1.addEventListener('click',()=>{
      //window可以直接使用，不需要引入
      window.open('http://www.baidu.com')
    })
    -=
  * 剩下的代码无变化
  * 运行效果
    ![window.open运行图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGkYdgmx6CQ7qd75k93Ci*lsQvz1WUBCuo0gdwzJLRhcPKu1SzIXc4ATA.vU4JphrED496GdwhR8IDO99oM5ICaI!/r)
    
    
    
## 10.Electron父子窗口的通信
> 子窗口向父窗口发送数据使用[window.opener.postMessage()](https://www.electronjs.org/docs/api/window-open#windowopenerpostmessagemessage-targetorigin)

> 父窗口监听子窗口是数据监听=-message=-事件，例如使用=-window.addEventListener('message',fn)=-

##### 代码案例
* 文件路径
    -=
    ├─child.html -- 子窗口
    ├─index.html -- 主窗口
    ├─index.js  -- 主进程
    ├─package.json -- 配置文件
    ├─render
    |   └render.js  -- 主进逻辑文件
    -=
* =-index.html=-文件代码
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>主页面</title>
    </head>
    <body>
      <h2>主页面</h2>
      <button id="btn1">点击打开子窗口</button>
      <div class="container"></div>
      <script src="./render/render.js"></script>
    </body>
    </html>
    -=
* =-index.js=-文件代码
    -= js
    const {app,BrowserWindow} = require('electron');
    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:800,
        height:500
      });
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null;
      })
    })
    -=
* =-render.js=-文件代码
    -= js
    let btn = document.querySelector('#btn1');
    btn.addEventListener('click',()=>{
      //打开子窗口
      window.open('./child.html')
    })
    //监听子窗口通信
    window.addEventListener('message',msg=>{
      //msg是一个对象  msg.data是传值的内容
      let container = document.querySelector('.container');
      container.innerHTML = msg.data;
    })
    -=
* =-child.html=-文件代码
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>子页面</title>
    </head>
    <body>
      内容：<input class="inp1" type="text" value="" placeholder="请输入通信内容">
      <button class="btn1">点击向父页面传值</button>
      <script>
      let btn1 = document.querySelector('.btn1');
      btn1.addEventListener('click',e=>{
        let {value} = document.querySelector('.inp1');
        //发起通信
        window.opener.postMessage(value);
      })
      </script>
    </body>
    </html>
    -=
* =-package.json=-部分文件代码
    -= json
    "scripts": {
        "start":"electron ."
    },
    -=
* 运行=-npm run start=-或者=-yarn start=-
* 运行结果
    ![父窗口运行结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGpf0sdLBJu1Gm0QUS9UomEsmuByfNFwzGLWnWlL5G72jvhQlfMO7M8oVw3d0ndR*lwubCaBkq0V7hHil6JKNH0M!/r)

    ![子窗口运行结果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGtaTJkYZiEhgLcI8zju8Z*hv9c95Cp404UlxbI1GN044iaPmxBMQxAlLPpfK6GgGQmgPLJFrR9gBjtEEGTuFkwI!/r)
    
    
    
## 11.Electron选择文件对话框
> 打开对话框使用[dialog.showOpenDialog()](https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options)
* =-dialog.showOpenDialog({})=-参数
    * =-title=-：String（可选），对话框的标题
    * =-defaultPath=-：String（可选），默认打开的路径
    * =-buttonLabel=-：String（可选），确定按钮自定义内容 默认为 打开
    * =-filters=-：Array（可选），文件选择过滤器，可以对文件后缀名进行筛选
    * =-properties=-：String（可选），打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件。
##### demo练习
* 文件目录
    -=
    ├─index.html  -- 渲染进程
    ├─index.js -- 主进程
    ├─package.json -- 配置文件
    ├─render
    |   └render.js -- 渲染进程逻辑文件
    -=
* =-index.html=-文件内容
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>文件选择</title>
    </head>
    <body>
      <button class="openBtn">点击选择图片</button>
      <img src="" style="width:100%" class="img1">
      <!-- 引入逻辑代码 -->
      <script src="./render/render.js"></script>
    </body>
    </html>
    -=
* =-index.js=-文件内容
    -= js
    const {app, BrowserWindow} = require('electron');
    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:1000,
        height:800,
        webPreferences:{
          nodeIntegration:true
        }
      });
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null;
      });
    })
    -=
* =-render.js=-文件内容
    -= js
    const { dialog } = require('electron').remote;
    const openBtn = document.querySelector('.openBtn');
    openBtn.addEventListener('click',e=>{
      // https://www.electronjs.org/docs/api/dialog
      dialog.showOpenDialog({
        title:'请选择要打开的图片', //标题
        // defaultPath:'', //打开是默认路径
        buttonLabel:'确定选择', //确定按钮自定义内容 -默认为 打开
        filters:[
          {
            name:'img',extensions:['jpg','png','jpeg','gif']
          }
        ]
      }).then(res=>{
        console.log(res);
        if(res.canceled){
          //点击取消
          return;
        }
        const img1 = document.querySelector('.img1');
        img1.src = res.filePaths[0];
      }).catch(err=>{
        console.log('选择错误->',err);
      })
    })
    -=
* =-package.json=-文件
    -= json
    "scripts": {
        "start": "electron ."
      },
    -=
* 执行=-yarn start=-
* 执行结果
    ![打开效果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGmmbs2x3wrKhH5jjfCCXxMgjYVPfq6i38kO8J9TBhqMLHySV6Omc5eRBtsR3SexTF1oeRrRG08pWXNJ9GM4dYCo!/r)
* 点击按钮效果
    ![对话框效果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGjXe.eD6nVDfvOkxW9DLiteiDfl1byGSMYswSKMPP4H8nnqMwGhwR5GvcF0fuaEbsG3cC0yLr1DI*pGREYM0.Lc!/r)
* 选择文件之后效果
    ![选择文件完成效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGvOsdWjthHr.LF1zHDb6TXIYJfeK.9.0Y*XglN7j7rhgjWNF*6V.2WQkr0aCAd.OREiO.zAAh*wX.kaHjOdphxs!/r)



## 12.Electron保存(创建)文件对话框
> 打开对话框使用[dialog.showSaveDialog()](https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options)
* =-dialog.showSaveDialog({})=-参数
    * =-title=-：String（可选），对话框的标题
    * =-defaultPath=-：String（可选），默认打开的路径
    * =-buttonLabel=-：String（可选），确定按钮自定义内容 默认为 保存
    * =-filters=-：Array（可选），文件选择过滤器，可以对文件后缀名进行筛选
    * =-properties=-：String（可选），打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件。
    * 
##### demo练习
* 文件目录
    -=
    ├─index.html -- 渲染进程
    ├─index.js  -- 主进程
    └package.json
    -=
* =-index.html=-文件内容
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>保存文件对话框</title>
    </head>
    <body>
      <button class="saveBtn">保存文件</button>
      <script>
        const { dialog } = require('electron').remote
        const fs = require('fs');
        let saveBtn = document.querySelector('.saveBtn');
        saveBtn.addEventListener('click',e=>{
          //保存文件
          dialog.showSaveDialog({
            title:'保存文件'
          }).then(res=>{
            if(res.canceled){
              console.log('用户点击取消');
              return;
            }
            //写入内容
            fs.writeFileSync(res.filePath,'文件内容内容内容内容内容内容');
            console.log('保存成功->',res);
          }).catch(err=>{
            console.log('保存失败->',err);
          })
        })
      </script>
    </body>
    </html>
    -=
* =-index.js=-文件内容
    -= js
    const {app,BrowserWindow} = require('electron');
    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:800,
        height:500,
        webPreferences:{
          nodeIntegration:true
        }
      });
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null;
      })
    })
    -=
* =-package.json=-的=-scripts=-部分代码
    -= json
    "scripts": {
      "start": "electron ."
    },
    -=
* 运行=-yarn start=-
* 运行结果
    ![运行效果](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGsSQpEv.xbL04k27I5EU1TdiR0KFifCp7668Ctm6zQQ3drU57D9bNHuic5l4HObb6hts3vdFENGaUVXHPqlbois!/r)
* 点击按钮弹出对话框效果
    ![弹出对话框效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGn1.NdduUBl3EPdb0Dhvdqk.JKKbRi0O81xYfD1vii*ahOVWV4nAOk*5KbqErjbxgWv8iyLn6RtuYh*71IQAFCo!/r)
* 打开文件效果图
    ![打开文件效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGvVqjz9gVFY4o2pRzXn8yRCe**7ICbpv7c8svDSPzmXQGnaISRP8puWLEUeTZIBkZsMIW8c7rzcGCA9l7FIz.20!/r)
    
    

## 13.Electron消息对话框
> 消息对话框使用[dialog.showMessageBox()](https://www.electronjs.org/docs/api/dialog#dialogshowmessageboxbrowserwindow-options)
* =-dialog.showMessageBox()=-参数说明
    * =-type=-：String类型，可选，可以为=-none=-,=-info=-,=-error=-,=-question=-或者=-warning=-.在Windows平台上=-question=-和=-info=-图标相同,在macOS上=-warning=-和=-error=-会显示相同图标
    * =-title=-：String类型，可选。MessageBox的标题，_一些平台不显示_
    * =-message=-：String类型，MessageBox的内容
    * =-detail=-：String类型，可选。MessageBox的额外信息
    * =-buttons=-：Array类型，按钮的文本数组，在windows上，空数组会显示“OK”，返回的是被点击按钮的索引
    * =-defaultId=-：Number(整型)，可选，默认选中的按钮，值为=-buttons=-数组中的索引
    * 更多不常用参数：[点击查看文档](https://www.electronjs.org/docs/api/dialog#dialogshowmessageboxbrowserwindow-options)
##### 演示demo
* 文件路径
    -=
    ├─index.html -- 渲染进程
    ├─index.js  -- 主进程
    └package.json
    -=
* =-index.html=-文件内容
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>消息对话框</title>
    </head>
    <body>
      <div class="radioDiv">
        <h2>图标样式</h2>
        <span><input type="radio" name="icon-type" value="none" checked> 无 </span>
        <span><input type="radio" name="icon-type" value="info"> 信息 </span>
        <span><input type="radio" name="icon-type" value="error"> 错误 </span>
        <span><input type="radio" name="icon-type" value="warning"> 警告 </span>
        <span><input type="radio" name="icon-type" value="question"> 疑问 </span>
      </div>
      <button class="messageBtn">点击弹出消息对话框</button>
      <script>
        const {dialog} = require('electron').remote; 
        const messageBtn = document.querySelector('.messageBtn');
        messageBtn.addEventListener('click',()=>{
          let radio = document.querySelector('input[name=icon-type]:checked');
          let {value} =radio;
          dialog.showMessageBox({
            type:value,
            title:value+'类型',
            defaultId:1,
            message:'提示内容内容内容内容内容',
            detail:'额外信息信息信息信息信息信息',
            buttons:['按钮1','按钮2','按钮3']
          }).then(res=>{
            console.log('res->',res);
            let {response} = res;
            window.alert(=-按钮$-response+1}被点击=-);
          }).catch(err=>{
            console.log('错误->',err);
          })
        })
      </script>
    </body>
    </html>
    -=
* =-index.js=-文件内容
    -= js
    const {app,BrowserWindow} = require('electron');
    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:800,
        height:500,
        webPreferences:{
          nodeIntegration:true
        }
      });
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null;
      })
    })
    -=
* =-package.json=-的=-scripts=-内容
    -= json
    "scripts": {
      "start": "electron ."
    },
    -=
* 效果图
 ![运行效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGgWSXcaWEk2s1iPcVNt.RkPMo3pPdSC9ML9V5KOVtDihKnQ9JyHRuZ0tw5Bbj.nnERpIZKprLh2pwK4wYUSkP0U!/r)
 ![弹窗效果图](http://r.photo.store.qq.com/psc?/V1021XMO1TUVn3/tS3tY63exiZNUWwJevnZGomvpUhqesn6tTnlRl02xSJhMsVmDZ9WiITyr4aPXFGyMrhIiV3E9G5**KEAI9pA2rICawG2MGqWWkhhN8B2Nos!/r)
 
 
 
## 14.Electron监听网络连接
### electon客户端监听网络连接判断网络状态，可以使用=-window.addEventListener()=-来进行事件监听
> #### 相关事件
* online：连接上网络就会触发该事件 (如果连接着网络打开应用不会触发)
* offline：网络断开会触发该事件
* ####  用法 - 直接在渲染进程中写入以下代码：
    -= js
    window.addEventListener('online',function(){
        //监听网络连接
        alert('官人，我来了，我们继续哦！')
    })
    window.addEventListener('offline',function(){
        // 监听网络断开
        alert('小女子先行离开一会，请稍等！')
    })
    -=
### electron的底部消息通知是通过=-H5=-的 [window.Natification](https://developer.mozilla.org/zh-CN/docs/Web/API/notification) 来实现的
> ### window.Notification(title,option)的参数属性
* title：通知的标题
* option：消息的各种配置(可选)
    * dir：文字的方向；auto-自动 ltr-从左到右 rtl-从右到左
    * lang: 指定通知中所使用的语言。这个字符串必须在 BCP 47 language tag 文档中是有效的。
    * body - 通知中额外显示的字符串（内容）
    * tag: 赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除。
    * icon: 一个图片的URL，将被用于显示通知的图标。

#### 用法 (渲染进程中使用)
  -= html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>底部消息通知</title>
  </head>
  <body>
    <button class="btn1">点击通知</button>
    <script>
    let btn1 = document.querySelector('.btn1');
    let option = {
      title:'我是提示',
      body:'我是提示额外内容.....'
    }

    btn1.addEventListener('click',()=>{
      new window.Notification('我是提示',{
        body:'我是提示额外显示的内容'
      })
    })
    </script>
  </body>
  </html>
  -=
    
    
 
## 15.Electron注册全局快捷键
> #### 注册全局快捷键需要用到[globalShortcut](https://www.electronjs.org/docs/api/global-shortcut)模块，=-globalShortcut=-是主进程中的模块(在渲染进程中需要使用=-remote=-)
##### 本文使用到的方法
* =-globalShortcut.register('快捷键',fn())=- --- 注册快捷键
* =-globalShortcut.isRegistered('快捷键')=-  --- 检测快捷键是否注册成功 返回true/false
* =-globalShortcut.unregister('快捷键')=-    --- 注销某个快捷键
* =-globalShortcut.unregisterAll()=-         --- 注销所有快捷键

##### 代码示例
* =-index.html=- -- 渲染进程
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>全局快捷键</title>
    </head>
    <body>
      <h2>ctrl+o加载网页，ctrl+m显示底部通知栏</h2>
      <button class="register-btn-m">注销 ctrl+m 快捷键</button>
      <button class="register-btn-all">注销全部快捷键</button>
      <script>
        const { globalShortcut} = require('electron').remote;
        globalShortcut.register('ctrl+m',()=>{
          new window.Notification('快捷键被点击',{
            body:'ctrl+m被点击'
          })
        })
        let isMRegister = globalShortcut.isRegistered('ctrl+m');
        if(!isMRegister){
          //注册失败(快捷键冲突处理)
          window.alert('注册ctrl+m失败');
        };
        //解绑快捷键
        let btn = document.querySelector('.register-btn-m');
        let btnAll = document.querySelector('.register-btn-all');
        btn.addEventListener('click',e=>{
          globalShortcut.unregister('ctrl+m');
          window.alert('清空快捷键成功')
        })
        btnAll.addEventListener('click',e=>{
          globalShortcut.unregisterAll();
          window.alert('清空快捷键成功')
        })
      </script>
    </body>
    </html>
    -=
* =-index.js=- -- 主进程
    -= js
    const {app, BrowserWindow, globalShortcut} = require('electron');

    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:800,
        height:500,
        webPreferences:{
          nodeIntegration:true
        }
      });
      //注册快捷键
      globalShortcut.register('ctrl+o',()=>{
        win.loadURL('http://www.huya.com');
      })
      //检测快捷键是否注册成功 -- 返回true/false
      let isORegister = globalShortcut.isRegistered('ctrl+o');
      if(!isORegister){
        //注册失败(快捷键冲突处理)
        window.alert('注册ctrl+o失败');
      };
      
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null;
      })
    })
    // Electron 会首先关闭所有的窗口然后触发 will-quit 事件
    app.on('will-quit',()=>{ //关闭时注销所有全局快捷键
      //注销所有的全局快捷键
      globalShortcut.unregisterAll();
    })
    -=



## 16.Electron剪切板的使用(clipboard)
> ### 需要使用到 [clipboard](https://www.electronjs.org/docs/api/clipboard)
#### 点击按钮复制激活码案例：
* index.html
    -= html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <p class="text"我是文本内容</p>
      <button class="btn">点击复制</button>
      <script>
        let { clipboard } = require('electron');
        let text = document.querySelector('.text');
        let btn = document.querySelector('.btn');
        btn.addEventListener('click',e=>{
          clipboard.writeText(text.innerHTML);
        })
      </script>
    </body>
    </html>
    -=
* index.js
    -= js
    const {app,BrowserWindow} = require('electron');
    app.on('ready',()=>{
      let win = new BrowserWindow({
        width:800,
        height:500,
        webPreferences:{
          nodeIntegration:true
        }
      })
      win.loadFile('index.html');
      win.on('closed',()=>{
        win = null
      })
    })
    -=
    
    
    
## 17.electron应用打包
#### 1. 定位到项目根目录
#### 2. 使用=-npm=-或者=-yarn=-安装=-electron-packager=-
-=
//npm
npm install electron-packager --save-dev
cnpm install electron-packager --save-dev
//yarn
yarn add electron-packager --dev
-=
#### 打包方法1(不推荐)
* 第一种打包方法就是直接在命令行中输入electron-packager,然后后边跟着6个打包参数

-=

electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>

//参数说明
location of project : 项目所在路径
name of project : 打包的项目名称
platform : 确定了你要构建哪个平台的应用（Windows、Mac还是Liux）
architecture: 决定了使用x86还是x64还是两个架构都需要
electron version: electron 的版本
optional options: 其他可选选项
-=
#### 打包方法2
* 打开=-package.json=-文件，在=-scripts=-下添加代码

-=
electron-packager ./ HelloWorld --all --out ./outApp --arch=x64 --electron-version 8.2.3  --overwrite --icon=./app/logo72.png

//说明
electron-packager ./ 软件名称 --all(平台) --out ./outApp(输出路径) --arch=x64 --electron-version 8.2.3(electron版本)  --overwrite --icon=./app/logo72.icon(图标)
-=
* 在项目中新建=-outApp=-文件夹
* 使用=-npm run-scripts packager=-


`