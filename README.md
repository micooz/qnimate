# qnimate

An animated colorful [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) 
powered by [d3](https://github.com/d3/d3).

## ScreenShot

![1]

## Live demo

https://micooz.github.io/qnimate

## Try it!

Install via npm:

```shell
$ git clone https://github.com/micooz/qnimate
$ cd qnimate && npm i
```

Run in development:

```shell
$ npm start
```

Build and bundle:

```shell
$ npm run build
```

## Usage

**HTML**:

    <div id="playground"></div>

**js**:

    <script src="qnimate.min.js"></script>

`Qnimate` will be exposed to `window`, create an instance of `Qnimate`, pass an option object and then call `run()`:

```js
document.addEventListener('DOMContentLoaded', function main() {
  var qnimate = new Qnimate({
    id: 'playground',
    width: 960,
    height: 500,
    vertices: 40
  });
  qnimate.run();
});
```

## Acknowledgments

`d3.voronoi` - https://github.com/d3/d3-voronoi

## Known issues

* New triangle appears suddenly.
* White triangle appears from time to time.

## Any advice?

Send me [issue](https://github.com/micooz/qnimate/issues).

[1]: screenshot.png
