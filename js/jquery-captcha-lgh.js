/*!
 * jquery-captcha-lgh v1.0 (https://github.com/honguangli/jquery-captcha-lgh)
 * Copyright honguangli
 * Licensed under the MIT license
 */
;
let Captcha;
(function() {
    "use strict";
    // 默认配置
    const defaults = {
        element: null,
        length: 4,
        code: []
    };

    const sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    const aCode = sCode.split(",");
    const aLength = aCode.length; //获取到数组的长度

    Captcha = function(element, options) {
        const self = this;
        self.options = $.extend(true, defaults, options);
        self.element = element;
        self.refresh();
        self.element.on('click', function () {
            self.refresh();
        });
    };

    Captcha.prototype.refresh = function() {
        const self = this;
        const canvas_width = self.element.width();
        const canvas_height = self.element.height();
        const canvas = self.element[0]; //获取到canvas的对象，演员
        const context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;

        const code = [];
        for (let i = 0; i < self.options.length; i++) {
            const j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            const deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
            const txt = aCode[j]; //得到随机的一个内容
            code.push(txt.toLowerCase());
            const x = 10 + i * 20; //文字在canvas上的x坐标
            const y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        self.options.code = code;
        for (let i = 0; i <= 5; i++) {
            context.strokeStyle = randomColor();
            context.beginPath();
            // 显示线条
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            // 显示小点
            const x = Math.random() * canvas_width;
            const y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    };

    Captcha.prototype.getCode = function() {
        return this.options.code.join('');
    };
    
    Captcha.prototype.valid = function(code) {
        return this.options.code.join('').toLowerCase() === code.toString().toLowerCase();
    }

    function randomColor() { //得到随机的颜色值
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
})();
