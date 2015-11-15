# color-sampler
A jQuery plugin provides color sampler function for Canvas.

## Download
[Compress](https://raw.github.com/emn178/color-sampler/master/build/color-sampler.min.js)  
[Uncompress](https://raw.github.com/emn178/color-sampler/master/src/color-sampler.js)

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

## Example
```JavaScript
$('#canvas').colorSampler('enable');
$('#canvas').colorSampler('disable');
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/color-sampler  
Author: emn178@gmail.com
