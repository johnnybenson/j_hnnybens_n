<?php $environment = strstr($_SERVER['HTTP_HOST'], '.com') ? 'PROD' : 'DEV' ?>
<!doctype html>
<!--[if lte IE 9]>     <html class="no-js ie" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>johnny benson builds the internet in <?php echo date('Y', time()) ?></title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width,initial-scale=0.5">

    <?php if ($environment == 'PROD'): ?>
        <link rel="stylesheet" type="text/css" href="/css/j-hnnybens-n.min.css?1">
    <?php else: ?>
        <link rel="stylesheet/less" type="text/css" href="/css/j-hnnybens-n.less">
        <script src="/js/libs/less-1.1.3.min.js"></script>
    <?php endif ?>

</head>
<body class="<?= ($environment == 'PROD') ? 'johnny-fucking-benson' : 'dev' ?>">

    <div class="wrapper">

        <section id="home" class="page home">
            <h1><a href="#front-end-web-guy" class="link frontend">johnny benson</a> is an <a href="http://www.tumblr.com" class="link tumblr" rel="external">engineer at Tumblr</a>.</h1>
            <h3 class="block"><a href="#friend-stuff" class="link friends">make friends</a> :D</h3>
        </section><!-- #home -->

        <section id="front-end-web-guy" class="page media me-and-dill">
            <h2>me and Dill getting an update.</h2>
        </section><!-- #front-end-web -->

        <section id="friend-stuff" class="page">
            <h2><a href="http://errthng.com" rel="external">errthng.com</a>,</h2>
            <h2><a href="http://errthng.com" rel="external">intrrnt.com</a>,</h2>
            <h2><a href="http://www.facebook.com/johnny.benson" rel="external">facebook</a>,</h2>
            <h2><a href="http://twitter.com/#!/johnnyoffline" rel="external">twitter</a>,</h2>
            <h2><a href="http://ffffound.com/home/johnnyoffline/found" rel="external">ffffound</a>,</h2>
            <h2><a href="http://svpply.com/johnnybenson" rel="external">svpply</a>,</h2>
            <h2><a href="http://vimeo.com/johnnyoffline" rel="external">vimeo</a>,</h2>
            <h2><a href="http://www.youtube.com/user/johnnyoffline" rel="external">youtube</a>,</h2>
            <h2><a href="http://instagrid.me/johnnybenson" rel="external">instagram</a>,</h2>
            <h2><a href="http://vhx.tv/#!/johnnybenson" rel="external">vhx</a>,</h2>
            <h2><a href="http://www.flickr.com/photos/johnnybenson" rel="external">flickr</a>,</h2>
            <h2><a href="https://plus.google.com/u/0/116280515043087866925" rel="external">google+</a>,</h2>
            <h2><a href="http://www.linkedin.com/pub/john-benson/4/91/440" rel="external">linkedin</a>,</h2>
            <h2><a href="http://letterboxd.com/johnnybenson" rel="external">letterboxd</a>,</h2>
            <h2><a href="http://mlkshk.com/user/johnnybenson" rel="external">mlkshk</a></h2>
            <h2><a href="#the-secret-button" class="the-secret-button">don't click</a></h2>
        </section><!-- #friend-stuff -->

    </div>

    <nav class="navigation">
        <a href="#home" class="home"><i class="icon-home"></i></a>
        <a href="#prev" class="prev">prev</a>
        <a href="#next" class="next">next</a>
    </nav>

    <script src="/js/libs/jquery-1.7.min.js"></script>
    <script src="/js/j-hnnybens-n<?= ($environment == 'PROD') ? '.min.' : '.' ?>js?1"></script>

    <script>
    var _gaq=[['_setAccount','UA-10529229-4'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>

</body>
</html>