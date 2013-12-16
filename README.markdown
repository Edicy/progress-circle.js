Super simple JavaScript library that draws good looking SVG progress circles. Requires jQuery.

## Usage

Simplest thing that works:

```html
<div id="progress"></div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="progress-circle.js"></script>

<script type="text/javascript">

// Set progress in percentages
$('#progress').progressCircle(19);

</script>
```

Of course, it is completely configurable:

```html
<script type="text/javascript">

$('#progress').progressCircle({
    bgColor: 'yellow',
    fgColor: 'red',
    percentage: 73
});

</script>
```

## Options

* **progress** -- progress in percentages, from **0..100**
* **bgColor** -- color of the background circle
* **fgColor** -- color of progress bar
* **bgWidth** -- width of background circle
* **fgWidth** -- width of progress bar
* **width** -- width of circle
* **height** -- height of circle
