/**
 * SoundManager — Web Audio API sound effects for a quiz website.
 *
 * Usage:
 *   1. Call SoundManager.init() on the first user interaction (click/tap).
 *   2. Then call any play*() method whenever you need a sound.
 *
 * Every sound is synthesised in real-time with oscillators and gain envelopes.
 * No external audio files are required.
 */
window.SoundManager = (function () {
  "use strict";

  // ─── Private state ───────────────────────────────────────────────
  var ctx = null;       // AudioContext (created lazily)
  var masterGain = null; // master volume node
  var muted = false;
  var initialized = false;

  // ─── Helpers ─────────────────────────────────────────────────────

  /**
   * Ensure the AudioContext exists and is running.
   * Safe to call repeatedly — only creates one context.
   */
  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
    }
    // Resume if the browser suspended it (autoplay policy)
    if (ctx.state === "suspended") {
      ctx.resume();
    }
  }

  /**
   * Create an oscillator → gain chain connected to the master bus.
   *
   * @param {string}  type  - "sine", "triangle", "square", "sawtooth"
   * @param {number}  freq  - frequency in Hz
   * @returns {{ osc: OscillatorNode, gain: GainNode }}
   */
  function createTone(type, freq) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;          // start silent — caller shapes the envelope
    osc.connect(gain);
    gain.connect(masterGain);
    return { osc: osc, gain: gain };
  }

  /**
   * Schedule a simple ADSR-ish envelope on a GainNode.
   *
   * @param {GainNode} gain
   * @param {number}   now        - ctx.currentTime base
   * @param {number}   peak       - max gain (0–1)
   * @param {number}   attack     - seconds
   * @param {number}   decay      - seconds
   * @param {number}   sustain    - gain level after decay (0–1)
   * @param {number}   sustainDur - how long sustain holds (seconds)
   * @param {number}   release    - seconds
   * @param {number}   [offset=0] - delay before the note starts
   */
  function envelope(gain, now, peak, attack, decay, sustain, sustainDur, release, offset) {
    var t = now + (offset || 0);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + attack);
    gain.gain.linearRampToValueAtTime(sustain, t + attack + decay);
    gain.gain.setValueAtTime(sustain, t + attack + decay + sustainDur);
    gain.gain.linearRampToValueAtTime(0, t + attack + decay + sustainDur + release);
  }

  /**
   * Play a single shaped tone and clean up automatically.
   *
   * @param {object} opts
   * @param {string} opts.type       - oscillator type
   * @param {number} opts.freq       - Hz
   * @param {number} opts.peak       - 0–1
   * @param {number} opts.attack     - s
   * @param {number} opts.decay      - s
   * @param {number} opts.sustain    - 0–1  (gain level, not duration)
   * @param {number} opts.sustainDur - s
   * @param {number} opts.release    - s
   * @param {number} [opts.offset]   - delay in seconds
   * @param {number} [opts.detune]   - cents to detune
   */
  function playNote(opts) {
    var t = createTone(opts.type, opts.freq);
    if (opts.detune) t.osc.detune.value = opts.detune;
    envelope(
      t.gain, ctx.currentTime,
      opts.peak, opts.attack, opts.decay,
      opts.sustain, opts.sustainDur, opts.release,
      opts.offset || 0
    );
    var total = (opts.offset || 0) + opts.attack + opts.decay + opts.sustainDur + opts.release;
    t.osc.start(ctx.currentTime + (opts.offset || 0));
    t.osc.stop(ctx.currentTime + total + 0.05);
  }

  // ─── Public API ──────────────────────────────────────────────────

  return {

    /* ── Lifecycle ─────────────────────────────────────────────── */

    /**
     * Initialise the AudioContext.
     * Must be called from a user-gesture handler (click / tap).
     */
    init: function () {
      ensureCtx();
      initialized = true;
      this._initialized = true;
    },

    /** Whether init() has been called */
    _initialized: false,

    /* ── Sound effects ─────────────────────────────────────────── */

    /**
     * Soft click / pop — used when the player selects an answer option.
     * A short sine "pop" at ~900 Hz with a fast attack and quick decay.
     */
    playClick: function () {
      if (muted || !ctx) return;
      var now = ctx.currentTime;

      // Primary pop
      playNote({
        type: "sine", freq: 900,
        peak: 0.25, attack: 0.003, decay: 0.06,
        sustain: 0, sustainDur: 0, release: 0.04
      });

      // Subtle harmonic layer for warmth
      playNote({
        type: "triangle", freq: 1400,
        peak: 0.08, attack: 0.003, decay: 0.04,
        sustain: 0, sustainDur: 0, release: 0.03
      });
    },

    /**
     * Cheerful ascending ding — two quick ascending tones (correct answer).
     * Musical interval: roughly a major third (E5 → G#5).
     */
    playCorrect: function () {
      if (muted || !ctx) return;

      // First tone — E5
      playNote({
        type: "sine", freq: 659.25,
        peak: 0.3, attack: 0.01, decay: 0.08,
        sustain: 0.12, sustainDur: 0.06, release: 0.1
      });

      // Soft shimmer on first tone
      playNote({
        type: "triangle", freq: 1318.5,
        peak: 0.07, attack: 0.01, decay: 0.06,
        sustain: 0, sustainDur: 0, release: 0.08
      });

      // Second tone — G#5 (a major third up, delayed 120 ms)
      playNote({
        type: "sine", freq: 830.6,
        peak: 0.3, attack: 0.01, decay: 0.1,
        sustain: 0.1, sustainDur: 0.08, release: 0.15,
        offset: 0.12
      });

      playNote({
        type: "triangle", freq: 1661.2,
        peak: 0.06, attack: 0.01, decay: 0.07,
        sustain: 0, sustainDur: 0, release: 0.1,
        offset: 0.12
      });
    },

    /**
     * Soft descending buzz — wrong answer feedback.
     * Two quick descending tones (C5 → Ab4) with a gentle square timbre.
     */
    playWrong: function () {
      if (muted || !ctx) return;

      // First tone — C5
      playNote({
        type: "square", freq: 523.25,
        peak: 0.1, attack: 0.01, decay: 0.08,
        sustain: 0.04, sustainDur: 0.04, release: 0.08
      });

      // Second tone — Ab4 (descending minor third, delayed 100 ms)
      playNote({
        type: "square", freq: 415.3,
        peak: 0.1, attack: 0.01, decay: 0.1,
        sustain: 0.03, sustainDur: 0.04, release: 0.12,
        offset: 0.1
      });

      // Low sub-thud for weight
      playNote({
        type: "sine", freq: 180,
        peak: 0.12, attack: 0.01, decay: 0.12,
        sustain: 0, sustainDur: 0, release: 0.08,
        offset: 0.08
      });
    },

    /**
     * Clock tick — sharp, short tick for the countdown timer.
     * A high-frequency triangle blip with near-instant decay.
     */
    playTick: function () {
      if (muted || !ctx) return;

      playNote({
        type: "triangle", freq: 1800,
        peak: 0.18, attack: 0.001, decay: 0.03,
        sustain: 0, sustainDur: 0, release: 0.02
      });

      // Tiny click body
      playNote({
        type: "square", freq: 3500,
        peak: 0.04, attack: 0.001, decay: 0.01,
        sustain: 0, sustainDur: 0, release: 0.01
      });
    },

    /**
     * Alert buzzer — medium-urgency alarm when the timer expires.
     * Three rapid pulses of a slightly detuned square-wave pair.
     */
    playBuzzer: function () {
      if (muted || !ctx) return;

      for (var i = 0; i < 3; i++) {
        var delay = i * 0.15;

        playNote({
          type: "square", freq: 440,
          peak: 0.15, attack: 0.005, decay: 0.04,
          sustain: 0.1, sustainDur: 0.06, release: 0.03,
          offset: delay
        });

        // Slightly detuned second voice for "buzz" character
        playNote({
          type: "square", freq: 444,
          peak: 0.12, attack: 0.005, decay: 0.04,
          sustain: 0.08, sustainDur: 0.06, release: 0.03,
          offset: delay
        });

        // Sub-bass punch
        playNote({
          type: "sine", freq: 220,
          peak: 0.1, attack: 0.005, decay: 0.06,
          sustain: 0, sustainDur: 0, release: 0.04,
          offset: delay
        });
      }
    },

    /**
     * Success fanfare — celebratory ascending arpeggio for quiz completion.
     * Plays a C-major arpeggio: C5 → E5 → G5 → C6 with shimmer overtones.
     */
    playFanfare: function () {
      if (muted || !ctx) return;

      var notes = [
        { freq: 523.25, time: 0 },      // C5
        { freq: 659.25, time: 0.12 },   // E5
        { freq: 783.99, time: 0.24 },   // G5
        { freq: 1046.5, time: 0.38 }    // C6
      ];

      notes.forEach(function (n) {
        // Primary tone
        playNote({
          type: "sine", freq: n.freq,
          peak: 0.22, attack: 0.01, decay: 0.1,
          sustain: 0.1, sustainDur: 0.12, release: 0.25,
          offset: n.time
        });

        // Octave shimmer (quiet)
        playNote({
          type: "triangle", freq: n.freq * 2,
          peak: 0.05, attack: 0.01, decay: 0.08,
          sustain: 0.02, sustainDur: 0.08, release: 0.2,
          offset: n.time
        });
      });

      // Final sustained chord bloom (C6 + E6 together)
      playNote({
        type: "sine", freq: 1046.5,
        peak: 0.15, attack: 0.02, decay: 0.15,
        sustain: 0.08, sustainDur: 0.3, release: 0.5,
        offset: 0.5
      });
      playNote({
        type: "sine", freq: 1318.5,
        peak: 0.1, attack: 0.02, decay: 0.15,
        sustain: 0.06, sustainDur: 0.3, release: 0.5,
        offset: 0.5
      });
    },

    /**
     * Hover whoosh — barely-audible, ultra-short breath of air.
     * Uses filtered noise-like character via high-frequency triangle.
     */
    playHover: function () {
      if (muted || !ctx) return;

      // Breathy high-frequency sweep
      var t = createTone("triangle", 3000);
      var now = ctx.currentTime;

      // Quick frequency sweep upward for "whoosh" feel
      t.osc.frequency.setValueAtTime(2000, now);
      t.osc.frequency.linearRampToValueAtTime(4500, now + 0.06);

      envelope(t.gain, now, 0.03, 0.005, 0.03, 0, 0, 0.025, 0);

      t.osc.start(now);
      t.osc.stop(now + 0.08);

      // Secondary softer layer
      playNote({
        type: "sine", freq: 5000,
        peak: 0.015, attack: 0.005, decay: 0.02,
        sustain: 0, sustainDur: 0, release: 0.02
      });
    },

    /**
     * Confetti pop — sharp burst that evokes a party popper.
     * A quick sine pop with noisy high-frequency burst.
     */
    playPop: function () {
      if (muted || !ctx) return;
      var now = ctx.currentTime;

      // Sharp sine pop (body)
      var body = createTone("sine", 600);
      body.osc.frequency.setValueAtTime(800, now);
      body.osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      envelope(body.gain, now, 0.3, 0.003, 0.05, 0.04, 0.01, 0.04, 0);
      body.osc.start(now);
      body.osc.stop(now + 0.12);

      // High-frequency crackle (square for texture)
      playNote({
        type: "square", freq: 4000,
        peak: 0.06, attack: 0.001, decay: 0.02,
        sustain: 0, sustainDur: 0, release: 0.02
      });

      // Bright ping
      playNote({
        type: "triangle", freq: 2200,
        peak: 0.08, attack: 0.002, decay: 0.04,
        sustain: 0, sustainDur: 0, release: 0.03
      });
    },

    /* ── Mute controls ─────────────────────────────────────────── */

    /**
     * Toggle mute state. Returns the new muted value (true = muted).
     * @returns {boolean}
     */
    toggleMute: function () {
      muted = !muted;
      if (masterGain) {
        masterGain.gain.value = muted ? 0 : 1;
      }
      return muted;
    },

    /**
     * Check whether sounds are currently muted.
     * @returns {boolean}
     */
    isMuted: function () {
      return muted;
    }
  };
})();
