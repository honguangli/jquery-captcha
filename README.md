# jquery-captcha
一个基于jquery的简单图形校验码

## 基本使用
```
<canvas id="canvas"></canvas>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="js/jquery-captcha.min.js"></script>
<script type="text/javascript">
  // step-1
  const captcha = new Captcha($('#canvas'), {
    length: 6,                          // 校验码长度
    width: 300,                         // canvas宽度
    height: 80,                         // canvas高度
    font: 'bold 23px 微软雅黑',          // 文本字体样式
    resourceType: 'aA0',                // 资源类型：a-小写字母、A-大写字母、0-数字，可任意组合
    resourceExtra: [],                  // 额外资源
    clickRefresh: true,                 // 点击刷新
    autoRefresh: true,                  // 调用校验接口后是否自动刷新
    caseSensitive: false,               // 大小写是否敏感
  });
  // step-2
  if (captcha.valid('')) {
    // success
  } else {
    // failure
  }
</script>
```

## 方法

```
captcha.refresh(); // 刷新校验码
captcha.getCode(); // 获取当前校验码 [string]
captcha.valid('abcd'); // 校验 [boolean]
```

## License
MIT License
