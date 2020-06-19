/*!
 * jquery-captcha-lgh v1.0 (https://github.com/honguangli/jquery-captcha-lgh)
 * Copyright honguangli
 * Licensed under the MIT license
 */
;
let Captcha;
(function($) {
  "use strict";
  // 默认配置
  const defaults = {
    length: 4,                   // 校验码长度
    code: [],                    // 校验码
    clickRefresh: true,          // 点击刷新
    autoRefresh: true,           // 调用校验接口后是否自动刷新
    width: 100,                  // canvas宽度
    height: 40,                  // canvas高度
    font: 'bold 23px 微软雅黑',   // 文本字体样式
    resourceType: 'aA0',           // 资源类型：a-小写字母、A-大写字母、0-数字，可任意组合
    resourceExtra: [],             // 额外资源
  };

  const resourceUpper = ["A","B","C","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"];
  const resourceLower = ["a","b","c","e","f","g","h","j","k","l","m","n","p","q","r","s","t","w","x","y","z"];
  const resourceNumber = ["0","1","2","3","4","5","6","7","8","9"];
  
  Captcha = function(element, options) {
    const self = this;
    self.options = $.extend(true, defaults, options);
    self.element = element;
    if (self.options.clickRefresh) {
      self.element.on('click', function () {
          self.refresh();
      });
    }
    self.refresh();
  };
  // 刷新
  Captcha.prototype.refresh = function() {
    const self = this;
    
    let resource = [];
    let resourceLength = 0;
    // 合并资源
    if (self.options.resourceType.length > 0) {
      if (self.options.resourceType.indexOf('A') !== -1) {
        resource = resource.concat(resourceUpper);
      }
      if (self.options.resourceType.indexOf('a') !== -1) {
        resource = resource.concat(resourceLower);
      }
      if (self.options.resourceType.indexOf('0') !== -1) {
        resource = resource.concat(resourceNumber);
      }
    }
    if (self.options.resourceExtra.length > 0) {
      resource = resource.concat(self.options.resourceExtra);
    }
    // 配置资源为空
    if (resource.length === 0) {
      resource = resourceUpper.concat(resourceLower).concat(resourceNumber)
    }
    resourceLength = resource.length;
    const canvas = self.element[0];                       // 获取canvas对象
    const context = canvas.getContext("2d");              // 获取canvas环境
    canvas.width = self.options.width;
    canvas.height = self.options.height;

    const code = [];      
    context.font = self.options.font;
    for (let i = 0; i < self.options.length; i++) {
      const txt = resource[Math.floor(Math.random() * resourceLength)]; // 得到随机的一个资源码
      code.push(txt);                                 
      
      const deg = Math.random() * 30 * Math.PI / 180;               //产生0~30之间的随机弧度
      const x = 10 + i * 20;                                        // 文本的x坐标
      const y = 20 + Math.random() * 8;                             // 文本的y坐标
      
      context.translate(x, y);
      context.rotate(deg);

      context.fillStyle = self.randomColor();
      context.fillText(txt, 0, 0);

      context.rotate(-deg);
      context.translate(-x, -y);
    }
    self.options.code = code;
    for (let i = 0; i <= 5; i++) {
      context.strokeStyle = self.randomColor();
      context.beginPath();
      // 显示线条
      context.moveTo(Math.random() * self.options.width, Math.random() * self.options.height);
      context.lineTo(Math.random() * self.options.width, Math.random() * self.options.height);
      // 显示小点
      const x = Math.random() * self.options.width;
      const y = Math.random() * self.options.height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  };
  // 获取当前验证码
  Captcha.prototype.getCode = function() {
    return this.options.code.join('');
  };
  // 校验
  Captcha.prototype.valid = function(code) {
    const self = this;
    const ans = code.toString().toLowerCase() === self.getCode().toLowerCase();
    if (!ans && self.options.autoRefresh) {
      self.refresh();
    }
    return ans;
  };
  // 获取随机的颜色值
  Captcha.prototype.randomColor = function() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
})($);
