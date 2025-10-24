## ADDED Requirements

### Requirement: AR场景初始化
系统SHALL在使用Three.js和WebXR初始化Web AR场景，当页面加载时。

#### Scenario: AR场景成功加载
- **当** 用户在兼容设备上打开网站
- **那么** AR相机被激活，场景被渲染

### Requirement: 物体放置
系统SHALL允许用户通过点击/触摸在AR场景中放置3D物体。

#### Scenario: 点击放置物体
- **当** 用户在AR场景中点击
- **那么** 在点击位置添加一个3D物体

### Requirement: 物体定位
系统SHALL允许用户自由重新定位放置的3D物体。

#### Scenario: 物体重新定位
- **当** 用户选择并拖拽一个放置的物体
- **那么** 物体移动到新位置

### Requirement: 截图捕获
系统SHALL捕获并保存包含放置物体的AR场景截图。

#### Scenario: 截图保存
- **当** 用户点击截图按钮
- **那么** 当前AR场景的图像被下载