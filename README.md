<h1>Bildero Bootstrap3 Responsive Images</h1>

bilderoResponsive.js is technique of delivering optimized, contextual image sizes to responsive layouts that utilize different image sizes at different resolutions for Twitter Bootrastrap 3. It's the solution to deliver mobile-optimazed images and larger images for every screen resolution just from one source image on server.

Supports Twitter Bootstrap v3.X.X

First of all you need Bildero Image Server or account on http://live.bildero.com/accounts/signup/
<!------INSTALLATION----->
<h2>Installation</h2>
1. Add bilderoResponsive.js in to your code.
2. Add script:
<pre>
$("img").bilderoResponsive();<br>
/* or */<br>
$("img").bilderoResponsive(options);<br>
</pre>
<br>


And that's all, of course if you want you are able to change some data in JS:
parameter options is an Object it can override some predefined settings available parameters:<br>

<strong>name</strong> - default value (type)- description<br>
<strong>resize</strong> - true (bool) - determines if new picture should be load when layout type changes to bigger or window size expanded by xsOffset<br>
<strong>marginLeft</strong> - 15 (number) - default bootstrap3 value (determines padding between columns)<br>
<strong>marginRight</strong> - 15 (number) -default bootstrap3 value (determines padding between columns)<br>
<strong>columnsSize</strong> - {"sm":64, "md":81, "lg":97} (object) - default bootstrap3 values determines tile width for non-fluid containers<br>
<strong>screenThresholds</strong> - {"sm":750, "md":970, "lg":1170} (object) - default bootstrap3 values determines thresholds for layout ( extraSmall: 0-749, small: 750-969, medium: 970-1169, large: >1170<br>
<strong>xsOffset</strong> - 50 (number) - if resize param is true then load bigger image if window size is expanded by this value<br>
<strong>domains</strong> - [] (array) - extends domain list which can be used by script (default only: bildero.com)<br>
<strong>dev : false (boolean)</strong> - shows real image size on the bildero picture (requires additional plugin captyJS)<br>


<!------USAGE------>
<h2>Usage</h2>
1. Plugin requires img attribute data-src pointing to bildero image for example:
```html
<img data-src="http://s102.bildero.com/1/140325277052.jpg?mode=normal" src="" alt="">
```


<!------EXAMPLES------>
<h2>Examples</h2>
http://dev.player.bildero.pl/bootstrap3/1/ <br>
http://dev.player.bildero.pl/bootstrap3/2/ <br>
http://dev.player.bildero.pl/bootstrap3/3/ <br>
http://dev.player.bildero.pl/bootstrap3/4/ <br>
http://dev.player.bildero.pl/bootstrap3/5/ - fluid layout <br>
http://dev.player.bildero.pl/bootstrap3/6/ <br>