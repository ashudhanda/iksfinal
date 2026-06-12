/**
 * ConfettiManager — Canvas-based confetti particle animation module
 * 
 * Usage:
 *   ConfettiManager.launch();                        // default burst
 *   ConfettiManager.launch({ duration: 5000 });      // 5-second burst
 *   ConfettiManager.launch({ particleCount: 300 });   // more particles
 *   ConfettiManager.launch({ colors: ['#FF0000'] }); // custom palette
 *   ConfettiManager.stop();                           // immediate cleanup
 *
 * Self-contained IIFE — no dependencies, no frameworks.
 */
;(function (window) {
  'use strict';

  // ─── Default Configuration ────────────────────────────────────────
  var DEFAULTS = {
    duration: 3000,
    particleCount: 150,
    colors: [
      '#4ade80', // green primary
      '#86efac', // light green
      '#16a34a', // deep green
      '#a7f3d0', // mint
      '#22c55e', // vivid green
      '#FFD700', // gold
      '#065f46', // forest
      '#FFFFFF'  // white sparkle
    ]
  };

  // ─── Utility Helpers ──────────────────────────────────────────────

  /** Random float in [min, max) */
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  /** Pick a random element from an array */
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Convert hex color to an rgba string with the given alpha */
  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /** Ease-out cubic — used for the fade near the end of the animation */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ─── Particle Class ───────────────────────────────────────────────

  /**
   * Each particle has position, velocity, rotation, size, shape, color,
   * and physics properties. Shapes are either 'rect' or 'circle'.
   */
  function Particle(canvasW, canvasH, colors) {
    // Spawn from center-top region with some horizontal spread
    this.x = canvasW * 0.5 + rand(-canvasW * 0.15, canvasW * 0.15);
    this.y = canvasH * 0.05 + rand(-10, 30);

    // Initial velocity — burst outward and downward
    var angle = rand(-Math.PI * 0.85, -Math.PI * 0.15); // upward-ish arc
    var speed = rand(8, 18);
    this.vx = Math.cos(angle) * speed + rand(-3, 3);
    this.vy = Math.sin(angle) * speed - rand(2, 6); // negative = upward initially

    // Size, shape, color
    this.size = rand(5, 12);
    this.shape = Math.random() > 0.45 ? 'rect' : 'circle';
    this.color = pick(colors);

    // Rotation state
    this.rotation = rand(0, Math.PI * 2);
    this.rotationSpeed = rand(-0.12, 0.12);

    // Wobble (sinusoidal lateral drift for a fluttering look)
    this.wobbleAmplitude = rand(0.3, 1.5);
    this.wobbleFrequency = rand(0.02, 0.06);
    this.wobblePhase = rand(0, Math.PI * 2);

    // Physics tuning per-particle for variety
    this.gravity = rand(0.12, 0.28);
    this.drag = rand(0.97, 0.995);
    this.wind = rand(-0.15, 0.35); // slight rightward wind bias

    // Tilt for 3-D ribbon effect (scaling along one axis)
    this.tilt = rand(0, Math.PI * 2);
    this.tiltSpeed = rand(0.03, 0.08);

    // Track age in frames for wobble calculation
    this.age = 0;
  }

  /** Advance particle physics by one frame (≈16.67 ms at 60 fps) */
  Particle.prototype.update = function () {
    // Apply gravity
    this.vy += this.gravity;

    // Apply wind
    this.vx += this.wind * 0.05;

    // Apply drag (air resistance)
    this.vx *= this.drag;
    this.vy *= this.drag;

    // Wobble (flutter)
    var wobble = Math.sin(this.age * this.wobbleFrequency + this.wobblePhase) * this.wobbleAmplitude;
    this.x += this.vx + wobble;
    this.y += this.vy;

    // Rotation & tilt
    this.rotation += this.rotationSpeed;
    this.tilt += this.tiltSpeed;

    this.age++;
  };

  /**
   * Draw this particle onto the given 2D context.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} globalAlpha  0–1 for the fade-out effect
   */
  Particle.prototype.draw = function (ctx, globalAlpha) {
    var alpha = Math.max(0, Math.min(1, globalAlpha));
    var tiltScale = 0.4 + 0.6 * Math.abs(Math.cos(this.tilt)); // 3-D flip

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(1, tiltScale);
    ctx.globalAlpha = alpha;

    if (this.shape === 'rect') {
      // Rounded-corner rectangle for a premium confetti strip look
      var w = this.size * 2.2;
      var h = this.size * 0.8;
      var r = Math.min(w, h) * 0.2; // corner radius
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, h / 2 - r);
      ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      ctx.lineTo(-w / 2 + r, h / 2);
      ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      ctx.lineTo(-w / 2, -h / 2 + r);
      ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();

      // Subtle highlight stripe for depth
      ctx.globalAlpha = alpha * 0.3;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-w / 2, -h / 2, w * 0.35, h);
    } else {
      // Circle
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Radial highlight for a glossy look
      ctx.globalAlpha = alpha * 0.35;
      ctx.beginPath();
      ctx.arc(-this.size * 0.12, -this.size * 0.12, this.size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    }

    ctx.restore();
  };

  // ─── Core Engine ──────────────────────────────────────────────────

  var canvas = null;
  var ctx = null;
  var particles = [];
  var animationId = null;
  var startTime = 0;
  var duration = 0;

  /** Create or re-use the full-screen canvas overlay */
  function createCanvas() {
    // If a canvas already exists, just resize it
    if (canvas && canvas.parentNode) {
      resizeCanvas();
      return;
    }

    canvas = document.createElement('canvas');
    canvas.id = '__confetti_canvas__';
    canvas.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'width:100vw',
      'height:100vh',
      'pointer-events:none',
      'z-index:9999'
    ].join(';');

    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();

    // Keep canvas sized correctly on resize
    window.addEventListener('resize', resizeCanvas);
  }

  /** Match canvas pixel dimensions to viewport (handles DPR) */
  function resizeCanvas() {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /** Remove the canvas from the DOM and clean up listeners */
  function destroyCanvas() {
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    window.removeEventListener('resize', resizeCanvas);
    canvas = null;
    ctx = null;
  }

  /** Spawn the initial batch of particles */
  function spawnParticles(count, colors) {
    particles = [];
    var w = window.innerWidth;
    var h = window.innerHeight;
    for (var i = 0; i < count; i++) {
      particles.push(new Particle(w, h, colors));
    }
  }

  /**
   * Main render loop — updates physics, draws particles,
   * handles fade-out and auto-cleanup.
   */
  function tick(timestamp) {
    if (!ctx || !canvas) return;

    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1); // 0 → 1

    // Global alpha: full opacity for the first 60%, then ease-out fade
    var fadeStart = 0.6;
    var globalAlpha = progress < fadeStart
      ? 1
      : 1 - easeOutCubic((progress - fadeStart) / (1 - fadeStart));

    // Clear the entire canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Update and draw every particle
    var screenH = window.innerHeight;
    var aliveCount = 0;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update();

      // Skip particles that have fallen well below the viewport
      if (p.y > screenH + 100) continue;

      p.draw(ctx, globalAlpha);
      aliveCount++;
    }

    // Stop if duration exceeded or no visible particles remain
    if (progress >= 1 || aliveCount === 0) {
      cleanup();
      return;
    }

    animationId = requestAnimationFrame(tick);
  }

  /** Cancel animation and remove the canvas */
  function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    particles = [];
    destroyCanvas();
  }

  // ─── Public API ───────────────────────────────────────────────────

  window.ConfettiManager = {
    /**
     * Launch a confetti burst.
     *
     * @param {Object} [options]
     * @param {number} [options.duration=3000]       Animation length in ms
     * @param {number} [options.particleCount=150]   Number of particles
     * @param {string[]} [options.colors]            Array of hex color strings
     */
    launch: function (options) {
      options = options || {};

      // Kill any running animation first
      cleanup();

      // Merge with defaults
      duration = (typeof options.duration === 'number' && options.duration > 0)
        ? options.duration
        : DEFAULTS.duration;
      var count = (typeof options.particleCount === 'number' && options.particleCount > 0)
        ? options.particleCount
        : DEFAULTS.particleCount;
      var colors = (Array.isArray(options.colors) && options.colors.length > 0)
        ? options.colors
        : DEFAULTS.colors;

      // Set up canvas and particles
      createCanvas();
      spawnParticles(count, colors);

      // Kick off the render loop
      animationId = requestAnimationFrame(function (ts) {
        startTime = ts;
        tick(ts);
      });
    },

    /** Immediately stop any running confetti and remove the canvas. */
    stop: function () {
      cleanup();
    }
  };

})(window);
