<?php

$page_redirected_from = $_SERVER['REQUEST_URI'];  // this is especially useful with error 404 to indicate the missing page.
$server_url = "http://{$_SERVER["SERVER_NAME"]}/";

switch(getenv("REDIRECT_STATUS"))
{
  # "400 - Bad Request"
  case 400:
  $error_code = "400 - Bad Request";
  $explanation = "The syntax of the URL submitted by your browser could not be understood. Please verify the address and try again.";
  $redirect_to = "";
  break;

  # "401 - Unauthorized"
  case 401:
  $error_code = "401 - Unauthorized";
  $explanation = "This section requires a password or is otherwise protected. If you feel you have reached this page in error, please return to the login page and try again, or contact the webmaster if you continue to have problems.";
  $redirect_to = "";
  break;

  # "403 - Forbidden"
  case 403:
  $error_code = "403 - Forbidden";
  $explanation = "This section requires a password or is otherwise protected. If you feel you have reached this page in error, please return to the login page and try again, or contact the webmaster if you continue to have problems.";
  $redirect_to = "";
  break;

  # "404 - Not Found"
  case 404:
  $error_code = "404 - Not Found";
  $explanation = "The requested resource '" . $page_redirected_from . "' could not be found on this server. Please verify the address and try again.";
  $redirect_to = $server_url;
  break;

  # "500 - Internal Server Error"
  case 500:
  $error_code = "500 - Internal Server Error";
  $explanation = "The server experienced an unexpected error. Please verify the address and try again.";
  $redirect_to = "";
  break;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ERROR 💀 <?php print($error_code); ?></title>
    <?php if ($redirect_to != "") : ?>
      <meta http-equiv="Refresh" content="5; url='<?php print($redirect_to); ?>'">
    <?php endif ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="Browse forever with Johnny Benson, full stack engineer, product person, problem solver.">
    <link rel="stylesheet" type="text/css" media="screen" href="/main.css" />
    <meta name="apple-mobile-web-app-title" content="👽">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    <link rel="prefetch" href="/assets/svg/open-iconic.svg">
    <script>(function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'); ga('create', 'UA-10529229-4', 'auto'); ga('send', 'pageview');</script>
</head>
<body>

    <section class="🆗🆒 credits" data-scroller>
        <header class="👽">
            <h1>
                <a href="/"><?= ($error_code); ?></a>
            </h1>
        </header>
        <header class="👽">
            <h1>
                <a href="/">ERROR</a>
            </h1>
        </header>
    </section>

    <template data-template-email>
        <header class="👽">
            <h1>
                <a href="/"><?= ($error_code); ?></a>
            </h1>
        </header>
        <header class="👽">
            <h1>
                <a href="/">ERROR</a>
            </h1>
        </header>
    </template>

    <script src="/main.js"></script>

</body>
</html>
