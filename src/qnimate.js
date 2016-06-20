import * as d3 from 'd3';

class Qnimate {

  constructor({
      id, width, height, vertices
  }) {
    this.domId = id;
    this.width = width || 960;
    this.height = height || 500;
    this.vertexNum = vertices || 40;
    this._init();
  }

  // public members

  run() {
    this.isRunning = true;
    this._tick();
  }

  stop() {
    this.isRunning = false;
  }

  // private members

  _init() {
    this.FPS = 30;
    this.interval = 1000 / this.FPS;
    this.then = Date.now();
    this.renderCount = 10 * this.FPS;


    this.voronoi = d3.voronoi();
    this.vertices = d3.range(this.vertexNum).map(() =>[
      d3.randomUniform(-this.width / 2, 1.5 * this.width)(),
      d3.randomUniform(-this.height / 2, 1.5 * this.height)()
    ]);
    this.symbols = this.vertices.map(() => Math.random() > 0.5 ? 1 : -1);

    // the root element <svg>
    this.svg = d3.select(`#${this.domId}`)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    // our canvas <g>
    this.graph = this.svg.append('g');
  }

  _tick() {
    if (this.isRunning) {
      if (window.requestAnimationFrame) {
        requestAnimationFrame(() => this._tick());
        const now = Date.now();
        const delta = now - this.then;
        if (delta > this.interval) {
          this.then = now - (delta % this.interval);

          // call render recursively
          this._render(this.vertices);
        }
      } else {
        setTimeout(() => this._tick(), this.interval);

        // call render recursively
        this._render(this.vertices);
      }
    }
  }

  /**
   * generate color from a point
   * @param d
   * @private
   */
  _color(d) {
    var dx = d[0] - this.width / 2,
        dy = d[1] - this.height / 2;
    return d3.lab(100 - (dx * dx + dy * dy) / 5000, dx / 10, dy / 10);
  }

  /**
   * render a frame by vertices
   * @private
   */
  _render() {
    let paths = this.graph.selectAll('path')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'butt')
        .data(this.voronoi(this.vertices).triangles());

    if (paths.nodes().length < 1) {
      paths = paths.enter().append('path');
    }

    paths
        .attr('fill', d => {
          return this._color(d3.polygonCentroid(d3.polygonHull(d)))
        })
        .attr('d', d =>`M${d.join('L')}Z`);

    // vertices generated at every render circle
    this._nextVertices();
  }

  /**
   * generate the next vertices
   * @private
   */
  _nextVertices() {
    if (!this.renderCount--) {
      this.symbols = this.symbols.map(() => Math.random() > 0.5 ? 1 : -1);
      this.renderCount = 10 * this.FPS;
    }

    this.vertices = this.vertices.map((v, i) => {
      const dx = Math.random() / 5;
      const dy = Math.random() / 5;

      const x = v[0] + this.symbols[i] * dx;
      const y = v[1] + this.symbols[i] * dy;

      return [x, y];
    });
  }

}

// 'module' is always defined by webpack
window.Qnimate = module.exports = Qnimate;
