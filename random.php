<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>johnny benson builds the internet in <?php echo date('Y', time()) ?></title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width,initial-scale=0.5">
	<link rel="stylesheet/less" type="text/css" href="/css/j-hnnybens-n.less">
	<script src="/js/libs/modernizr-2.0.6.min.js"></script>
	<script src="/js/libs/less-1.1.3.min.js"></script>
</head>
<body>

<div class="wrapper">

	<section id="home" class="page home">
		<pre>'#'+(Math.random()*0xFFFFFF<<0).toString(16);</pre>
	</section><!-- #home -->



	<script src="/js/libs/jquery-1.7.min.js"></script>
	<script src="/js/libs/jquery.fittext.js"></script>
	<script src="/js/libs/jquery.aspect.js"></script>
	<script src="/js/j-hnnybens-n.js"></script>

	<script>
		var _gaq=[['_setAccount','UA-10529229-4'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>

	<script type="text/javascript">

		var getRandomColor = function(options)
		{
			return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		};

		var setRandomColor = function(options)
		{
			var $obj = options['obj'];
			var property = options['property'] ? options['property'] : 'color';
			if ($obj.length)
			{
				$obj.css(property, getRandomColor());
			}
		};

		var home = $('#home > pre');

		var homeColor = setInterval( function(){ setRandomColor({
			obj : home,
			property: 'background'
		}); }, 200);
	</script>

</body>
</html>
