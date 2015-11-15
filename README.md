# color-sampler
A jQuery plugin provides color sampler function for Canvas.

## Download
[Compress JS](https://raw.github.com/emn178/color-sampler/master/build/color-sampler.min.js)  
[Compress CSS](https://raw.github.com/emn178/color-sampler/master/build/color-sampler.min.css)  
[Uncompress JS](https://raw.github.com/emn178/color-sampler/master/src/color-sampler.js)  
[Uncompress CSS](https://raw.github.com/emn178/color-sampler/master/src/color-sampler.css)

## Installation
You can also install color-sampler by using Bower.
```
bower install color-sampler
```

## Demo
[Demo](http://emn178.github.io/color-sampler/samples/demo/)

## Usage
You could just use jQuery `bind`, `delegate` or `on` to listen event.
HTML
```HTML
<canvas id="#canvas">
</canvas>
```
JavaScript
```JavaScript
$('#canvas').colorSampler({
  onPreview: function (color) {
    // ...
  },
  onSelect: function (color) {
    // ...
  }
});
```

### Methods

#### enable()

Enable the color sampler function.

#### disable()

Disable the color sampler function.

#### resize()

When timer is disabled, call this method to tell color sampler that canvas size change.

#### $.colorSampler.setInterval(inverval)

Set interval of timer that check canvas resize.

##### *inverval: `Number` (default: `50`)*

Interval of timer. Set 0 to disable timer, and you can use `resize()` to update manually.

## Example
```JavaScript
$('#canvas').colorSampler('enable');
$('#canvas').colorSampler('disable');
$('#canvas').colorSampler('resize');
// disable timer
$.colorSampler.setInterval(0);
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/color-sampler  
Author: emn178@gmail.com
