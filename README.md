# jquery-captcha-lgh
jquery-pagination-lgh is a captcha component depend on jquery

## Basic Usages
```
<canvas id="canvas"></canvas>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-captcha-lgh.min.js"></script>
<script type="text/javascript">
  // step-1
  const captcha = new Captcha($('#canvas'));
  // step-2
  //captcha.valid("");
</script>
```

and you can use some methods

```
captcha.refresh(); // refresh the code
captcha.getCode(); // get the code
captcha.valid("input code"); // valid you code and return bool type result
```

## License
MIT License

## Contact
1947501227@qq.com
