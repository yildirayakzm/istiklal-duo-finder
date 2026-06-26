/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — İstiklal Shield CAPTCHA (nexus-captcha.js)
 *  Premium slider-based human verification widget.
 *  Anti-bot: mouse movement tracking + timing analysis.
 *  Include on login & register pages.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── Config ──
  var SLIDER_THRESHOLD = 92; // % the slider must reach
  var MIN_DRAG_TIME = 300;   // ms — bots drag too fast
  var MIN_MOUSE_POINTS = 8;  // bots don't make enough mouse moves

  // ── Language ──
  function getLang() {
    try { return localStorage.getItem('preferred_lang') || 'tr'; } catch (e) { return 'tr'; }
  }

  var TEXTS = {
    tr: {
      label: 'Robot olmadığımı doğrula',
      instruction: 'Kaydırıcıyı sağa sürükle',
      success: 'Doğrulandı!',
      failed: 'Tekrar dene',
      shield: 'İstiklal Shield',
      protected: 'Güvenli Doğrulama'
    },
    en: {
      label: 'Verify you are not a robot',
      instruction: 'Slide to the right',
      success: 'Verified!',
      failed: 'Try again',
      shield: 'İstiklal Shield',
      protected: 'Secure Verification'
    }
  };

  // ── CSS Injection ──
  var style = document.createElement('style');
  style.id = 'nexus-captcha-css';
  style.textContent = [
    /* Container */
    '.nexus-captcha-widget {',
    '  position: relative;',
    '  width: 100%;',
    '  background: rgba(10, 11, 30, 0.6);',
    '  backdrop-filter: blur(16px);',
    '  -webkit-backdrop-filter: blur(16px);',
    '  border: 1px solid rgba(139, 92, 246, 0.12);',
    '  border-radius: 16px;',
    '  padding: 18px 20px 14px;',
    '  overflow: hidden;',
    '  transition: all 0.4s ease;',
    '  user-select: none;',
    '}',
    '.nexus-captcha-widget:hover {',
    '  border-color: rgba(139, 92, 246, 0.2);',
    '}',
    '.nexus-captcha-widget.verified {',
    '  border-color: rgba(0, 230, 118, 0.3);',
    '  background: rgba(0, 230, 118, 0.04);',
    '}',
    '.nexus-captcha-widget.failed {',
    '  border-color: rgba(255, 68, 68, 0.3);',
    '  animation: ncShake 0.4s ease;',
    '}',

    /* Header row */
    '.nc-header {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  margin-bottom: 14px;',
    '}',
    '.nc-header-left {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '}',
    '.nc-shield-icon {',
    '  width: 36px; height: 36px;',
    '  border-radius: 10px;',
    '  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.08));',
    '  border: 1px solid rgba(139, 92, 246, 0.2);',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '  transition: all 0.4s ease;',
    '}',
    '.nc-shield-icon .material-symbols-outlined {',
    '  font-size: 20px;',
    '  color: #8B5CF6;',
    '  font-variation-settings: "FILL" 1;',
    '  transition: all 0.4s ease;',
    '}',
    '.nexus-captcha-widget.verified .nc-shield-icon {',
    '  background: linear-gradient(135deg, rgba(0, 230, 118, 0.15), rgba(0, 200, 83, 0.08));',
    '  border-color: rgba(0, 230, 118, 0.3);',
    '}',
    '.nexus-captcha-widget.verified .nc-shield-icon .material-symbols-outlined {',
    '  color: #00e676;',
    '  filter: drop-shadow(0 0 6px rgba(0, 230, 118, 0.5));',
    '}',
    '.nc-title {',
    '  font-family: "Outfit", sans-serif;',
    '  font-size: 13px;',
    '  font-weight: 700;',
    '  color: #e2e2e8;',
    '  letter-spacing: 0.02em;',
    '}',
    '.nc-subtitle {',
    '  font-family: "Poppins", sans-serif;',
    '  font-size: 10px;',
    '  color: #849495;',
    '  margin-top: 1px;',
    '}',
    '.nexus-captcha-widget.verified .nc-title { color: #00e676; }',

    /* Brand badge */
    '.nc-brand {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 4px;',
    '  padding: 3px 8px;',
    '  border-radius: 6px;',
    '  background: rgba(139, 92, 246, 0.06);',
    '  border: 1px solid rgba(139, 92, 246, 0.1);',
    '}',
    '.nc-brand-text {',
    '  font-family: "Outfit", sans-serif;',
    '  font-size: 9px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.1em;',
    '  color: rgba(139, 92, 246, 0.5);',
    '  text-transform: uppercase;',
    '}',
    '.nc-brand .material-symbols-outlined {',
    '  font-size: 12px;',
    '  color: rgba(139, 92, 246, 0.4);',
    '  font-variation-settings: "FILL" 1;',
    '}',

    /* Slider Track */
    '.nc-slider-track {',
    '  position: relative;',
    '  width: 100%;',
    '  height: 48px;',
    '  border-radius: 12px;',
    '  background: rgba(20, 21, 48, 0.6);',
    '  border: 1px solid rgba(45, 46, 74, 0.4);',
    '  overflow: hidden;',
    '  cursor: pointer;',
    '  transition: border-color 0.3s ease;',
    '}',
    '.nc-slider-track:hover {',
    '  border-color: rgba(139, 92, 246, 0.3);',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-track {',
    '  border-color: rgba(0, 230, 118, 0.25);',
    '  cursor: default;',
    '}',

    /* Slider Fill */
    '.nc-slider-fill {',
    '  position: absolute;',
    '  top: 0;',
    '  left: 0;',
    '  height: 100%;',
    '  width: 0;',
    '  background: linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.08));',
    '  border-radius: 12px 0 0 12px;',
    '  transition: width 0.05s linear;',
    '  pointer-events: none;',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-fill {',
    '  background: linear-gradient(90deg, rgba(0, 230, 118, 0.15), rgba(0, 230, 118, 0.05));',
    '  width: 100% !important;',
    '  transition: width 0.5s ease;',
    '}',

    /* Instruction text (center of track) */
    '.nc-slider-text {',
    '  position: absolute;',
    '  top: 50%;',
    '  left: 50%;',
    '  transform: translate(-50%, -50%);',
    '  font-family: "Outfit", sans-serif;',
    '  font-size: 12px;',
    '  font-weight: 600;',
    '  color: rgba(132, 148, 149, 0.5);',
    '  letter-spacing: 0.05em;',
    '  pointer-events: none;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '  white-space: nowrap;',
    '  transition: all 0.3s ease;',
    '}',
    '.nc-slider-text .material-symbols-outlined {',
    '  font-size: 16px;',
    '  animation: ncArrowPulse 1.5s ease-in-out infinite;',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-text {',
    '  color: #00e676;',
    '  font-weight: 700;',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-text .material-symbols-outlined {',
    '  animation: none;',
    '}',

    /* Slider Thumb */
    '.nc-slider-thumb {',
    '  position: absolute;',
    '  top: 4px;',
    '  left: 4px;',
    '  width: 40px;',
    '  height: 40px;',
    '  border-radius: 10px;',
    '  background: linear-gradient(135deg, #8B5CF6, #7C3AED);',
    '  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  cursor: grab;',
    '  transition: box-shadow 0.3s ease, background 0.4s ease;',
    '  z-index: 2;',
    '  touch-action: none;',
    '}',
    '.nc-slider-thumb:hover {',
    '  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.5);',
    '}',
    '.nc-slider-thumb:active {',
    '  cursor: grabbing;',
    '  box-shadow: 0 2px 12px rgba(139, 92, 246, 0.6);',
    '}',
    '.nc-slider-thumb .material-symbols-outlined {',
    '  font-size: 20px;',
    '  color: #fff;',
    '  font-variation-settings: "FILL" 1;',
    '  transition: all 0.3s ease;',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-thumb {',
    '  background: linear-gradient(135deg, #00e676, #00c853);',
    '  box-shadow: 0 4px 20px rgba(0, 230, 118, 0.4);',
    '  cursor: default;',
    '  left: calc(100% - 44px) !important;',
    '  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);',
    '}',

    /* Success checkmark animation */
    '@keyframes ncCheckPop {',
    '  0% { transform: scale(0) rotate(-45deg); }',
    '  60% { transform: scale(1.2) rotate(0deg); }',
    '  100% { transform: scale(1) rotate(0deg); }',
    '}',
    '.nexus-captcha-widget.verified .nc-slider-thumb .material-symbols-outlined {',
    '  animation: ncCheckPop 0.4s ease forwards;',
    '}',

    /* Shake animation for fail */
    '@keyframes ncShake {',
    '  0%, 100% { transform: translateX(0); }',
    '  20%, 60% { transform: translateX(-6px); }',
    '  40%, 80% { transform: translateX(6px); }',
    '}',

    /* Arrow pulse */
    '@keyframes ncArrowPulse {',
    '  0%, 100% { transform: translateX(0); opacity: 0.5; }',
    '  50% { transform: translateX(4px); opacity: 1; }',
    '}',

    /* Particle burst on success */
    '.nc-particle-burst {',
    '  position: absolute;',
    '  top: 50%; left: 50%;',
    '  width: 4px; height: 4px;',
    '  border-radius: 50%;',
    '  pointer-events: none;',
    '  z-index: 10;',
    '}',

    /* Success glow */
    '.nc-success-glow {',
    '  position: absolute;',
    '  inset: 0;',
    '  border-radius: 16px;',
    '  pointer-events: none;',
    '  opacity: 0;',
    '  background: radial-gradient(circle at 50% 50%, rgba(0,230,118,0.1), transparent 70%);',
    '  transition: opacity 0.5s ease;',
    '}',
    '.nexus-captcha-widget.verified .nc-success-glow { opacity: 1; }',

    /* Responsive */
    '@media (max-width: 480px) {',
    '  .nexus-captcha-widget { padding: 14px 16px 10px; }',
    '  .nc-brand { display: none; }',
    '  .nc-slider-track { height: 44px; }',
    '  .nc-slider-thumb { width: 36px; height: 36px; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Create Widget ──
  function createWidget(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    var lang = getLang();
    var T = {
      label: typeof window.t === 'function' ? window.t('captcha_label') : (TEXTS[lang] || TEXTS.tr).label,
      instruction: typeof window.t === 'function' ? window.t('captcha_instruction') : (TEXTS[lang] || TEXTS.tr).instruction,
      success: typeof window.t === 'function' ? window.t('captcha_success') : (TEXTS[lang] || TEXTS.tr).success,
      failed: typeof window.t === 'function' ? window.t('captcha_failed') : (TEXTS[lang] || TEXTS.tr).failed,
      shield: typeof window.t === 'function' ? window.t('captcha_shield') : (TEXTS[lang] || TEXTS.tr).shield,
      protected: typeof window.t === 'function' ? window.t('captcha_protected') : (TEXTS[lang] || TEXTS.tr).protected
    };

    var widget = document.createElement('div');
    widget.className = 'nexus-captcha-widget';
    widget.id = 'nexus-captcha-' + containerId;
    widget.innerHTML =
      '<div class="nc-success-glow"></div>' +
      '<div class="nc-header">' +
        '<div class="nc-header-left">' +
          '<div class="nc-shield-icon">' +
            '<span class="material-symbols-outlined">verified_user</span>' +
          '</div>' +
          '<div>' +
            '<div class="nc-title" data-i18n="captcha_label">' + T.label + '</div>' +
            '<div class="nc-subtitle" data-i18n="captcha_protected">' + T.protected + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="nc-brand">' +
          '<span class="material-symbols-outlined">shield</span>' +
          '<span class="nc-brand-text" data-i18n="captcha_shield">' + T.shield + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="nc-slider-track" id="nc-track-' + containerId + '">' +
        '<div class="nc-slider-fill" id="nc-fill-' + containerId + '"></div>' +
        '<div class="nc-slider-text" id="nc-text-' + containerId + '">' +
          '<span data-i18n="captcha_instruction">' + T.instruction + '</span>' +
          '<span class="material-symbols-outlined">arrow_forward</span>' +
        '</div>' +
        '<div class="nc-slider-thumb" id="nc-thumb-' + containerId + '">' +
          '<span class="material-symbols-outlined">lock_open</span>' +
        '</div>' +
      '</div>';

    container.appendChild(widget);

    // ── State ──
    var state = {
      verified: false,
      dragging: false,
      startX: 0,
      thumbStartX: 4,
      dragStartTime: 0,
      mousePoints: [],
      trackWidth: 0
    };

    var track = document.getElementById('nc-track-' + containerId);
    var fill = document.getElementById('nc-fill-' + containerId);
    var thumb = document.getElementById('nc-thumb-' + containerId);
    var textEl = document.getElementById('nc-text-' + containerId);

    function getTrackWidth() {
      return track.offsetWidth - thumb.offsetWidth - 8;
    }

    // ── Drag Logic ──
    function onStart(e) {
      if (state.verified) return;
      e.preventDefault();
      state.dragging = true;
      state.dragStartTime = Date.now();
      state.mousePoints = [];
      state.trackWidth = getTrackWidth();

      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      state.startX = clientX - thumb.offsetLeft;

      widget.classList.remove('failed');
      thumb.style.transition = 'none';
      fill.style.transition = 'width 0.05s linear';
    }

    function onMove(e) {
      if (!state.dragging || state.verified) return;
      e.preventDefault();

      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      state.mousePoints.push({ x: clientX, y: e.touches ? e.touches[0].clientY : e.clientY, t: Date.now() });

      var newLeft = clientX - state.startX;
      if (newLeft < 4) newLeft = 4;
      if (newLeft > state.trackWidth + 4) newLeft = state.trackWidth + 4;

      thumb.style.left = newLeft + 'px';
      var pct = ((newLeft - 4) / state.trackWidth) * 100;
      fill.style.width = pct + '%';
    }

    function onEnd(e) {
      if (!state.dragging || state.verified) return;
      state.dragging = false;

      var currentLeft = thumb.offsetLeft;
      var pct = ((currentLeft - 4) / state.trackWidth) * 100;
      var dragTime = Date.now() - state.dragStartTime;

      // Verify conditions
      var reachedEnd = pct >= SLIDER_THRESHOLD;
      var humanTiming = dragTime >= MIN_DRAG_TIME;
      var humanMovement = state.mousePoints.length >= MIN_MOUSE_POINTS;

      // Additional: check for non-linear movement (bots move in straight lines)
      var hasVariance = checkMouseVariance(state.mousePoints);

      if (reachedEnd && humanTiming && humanMovement && hasVariance) {
        // ── SUCCESS ──
        state.verified = true;
        widget.classList.add('verified');

        // Update text and icon
        var langNow = getLang();
        var successTxt = typeof window.t === 'function' ? window.t('captcha_success') : (TEXTS[langNow] || TEXTS.tr).success;
        textEl.innerHTML = '<span class="material-symbols-outlined" style="animation:ncCheckPop 0.4s ease forwards;">check_circle</span><span data-i18n="captcha_success">' + successTxt + '</span>';
        thumb.querySelector('.material-symbols-outlined').textContent = 'check';

        // Particle burst
        createParticleBurst(widget, thumb);

        // Dispatch custom event
        widget.dispatchEvent(new CustomEvent('nexus-captcha-verified', { bubbles: true }));
      } else {
        // ── FAIL — reset slider ──
        widget.classList.add('failed');
        thumb.style.transition = 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        fill.style.transition = 'width 0.4s ease';
        thumb.style.left = '4px';
        fill.style.width = '0';

        if (!reachedEnd) {
          // Just didn't slide far enough — no message needed
        } else {
          // Bot detected
          var langNow2 = getLang();
          var failedTxt = typeof window.t === 'function' ? window.t('captcha_failed') : (TEXTS[langNow2] || TEXTS.tr).failed;
          var instructionTxt = typeof window.t === 'function' ? window.t('captcha_instruction') : (TEXTS[langNow2] || TEXTS.tr).instruction;
          textEl.innerHTML = '<span class="material-symbols-outlined" style="color:#ff4444;">warning</span><span style="color:#ff4444;" data-i18n="captcha_failed">' + failedTxt + '</span>';
          setTimeout(function () {
            textEl.innerHTML = '<span data-i18n="captcha_instruction">' + instructionTxt + '</span><span class="material-symbols-outlined">arrow_forward</span>';
            widget.classList.remove('failed');
          }, 2000);
        }
      }
    }

    // ── Mouse variance check ──
    function checkMouseVariance(points) {
      if (points.length < 4) return false;
      var yValues = [];
      for (var i = 0; i < points.length; i++) {
        yValues.push(points[i].y);
      }
      var mean = 0;
      for (var j = 0; j < yValues.length; j++) mean += yValues[j];
      mean /= yValues.length;
      var variance = 0;
      for (var k = 0; k < yValues.length; k++) {
        variance += Math.pow(yValues[k] - mean, 2);
      }
      variance /= yValues.length;
      // Real humans have some Y-axis jitter (> 0.5px variance)
      return variance > 0.3;
    }

    // ── Particle burst on success ──
    function createParticleBurst(parentEl, sourceEl) {
      var colors = ['#00e676', '#8B5CF6', '#EC4899', '#00f2ff', '#FFD700'];
      var rect = sourceEl.getBoundingClientRect();
      var parentRect = parentEl.getBoundingClientRect();
      var cx = rect.left - parentRect.left + rect.width / 2;
      var cy = rect.top - parentRect.top + rect.height / 2;

      for (var i = 0; i < 12; i++) {
        var particle = document.createElement('div');
        particle.className = 'nc-particle-burst';
        particle.style.left = cx + 'px';
        particle.style.top = cy + 'px';
        particle.style.background = colors[i % colors.length];
        particle.style.boxShadow = '0 0 6px ' + colors[i % colors.length];
        parentEl.appendChild(particle);

        var angle = (Math.PI * 2 / 12) * i;
        var distance = 30 + Math.random() * 40;
        var dx = Math.cos(angle) * distance;
        var dy = Math.sin(angle) * distance;

        animateParticle(particle, dx, dy);
      }
    }

    function animateParticle(el, dx, dy) {
      var startTime = Date.now();
      var duration = 600 + Math.random() * 300;
      function step() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        el.style.transform = 'translate(' + (dx * ease) + 'px, ' + (dy * ease) + 'px) scale(' + (1 - progress) + ')';
        el.style.opacity = 1 - progress;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.parentNode.removeChild(el);
        }
      }
      requestAnimationFrame(step);
    }

    // ── Event listeners ──
    thumb.addEventListener('mousedown', onStart);
    thumb.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    // ── Public API ──
    return {
      isVerified: function () { return state.verified; },
      reset: function () {
        state.verified = false;
        state.dragging = false;
        widget.classList.remove('verified', 'failed');
        thumb.style.transition = 'left 0.3s ease';
        fill.style.transition = 'width 0.3s ease';
        thumb.style.left = '4px';
        fill.style.width = '0';
        thumb.querySelector('.material-symbols-outlined').textContent = 'lock_open';
        var langR = getLang();
        var instructionTxt = typeof window.t === 'function' ? window.t('captcha_instruction') : (TEXTS[langR] || TEXTS.tr).instruction;
        var labelTxt = typeof window.t === 'function' ? window.t('captcha_label') : (TEXTS[langR] || TEXTS.tr).label;
        textEl.innerHTML = '<span data-i18n="captcha_instruction">' + instructionTxt + '</span><span class="material-symbols-outlined">arrow_forward</span>';
        var titleEl = widget.querySelector('.nc-title');
        if (titleEl) {
          titleEl.textContent = labelTxt;
          titleEl.setAttribute('data-i18n', 'captcha_label');
        }
      },
      getElement: function () { return widget; }
    };
  }

  // ── Expose globally ──
  window.NexusCaptcha = {
    create: createWidget
  };

})();
