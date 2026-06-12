/* ============================================
   IKS QUIZ — App Logic
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  const state = {
    questionCount: 30,
    mode: 'one-by-one', // 'one-by-one' or 'scroll'
    order: 'order',     // 'order' or 'shuffle'
    timer: 0,           // 0 = no timer, 30/60/90 seconds
    currentIndex: 0,
    questions: [],
    answers: {},        // { questionId: selectedOptionIndex }
    checked: {},        // { questionId: true } — individually checked
    locked: {},         // { questionId: true } — locked (timer expired)
    submitted: false,
  };

  // ---- DOM References ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    landing: $('#landing-screen'),
    instructions: $('#instructions-screen'),
    quiz: $('#quiz-screen'),
    results: $('#results-screen'),
    answerkey: $('#answerkey-screen'),
  };

  // ---- Font Switcher ----
  const fontMap = {
    zeroarea: "'Orbitron', sans-serif",
    normal: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    abode: "'Source Sans 3', sans-serif",
    morica: "'Caveat', cursive",
  };

  function initFontSwitcher() {
    const select = $('#font-select');
    const saved = localStorage.getItem('quiz-font') || 'normal';
    select.value = saved;
    applyFont(saved);
    select.addEventListener('change', (e) => {
      applyFont(e.target.value);
      localStorage.setItem('quiz-font', e.target.value);
      if (SoundManager) SoundManager.playClick();
    });
  }

  function applyFont(key) {
    document.body.style.fontFamily = fontMap[key] || fontMap.normal;
    document.documentElement.style.setProperty('--current-font', fontMap[key] || fontMap.normal);
  }

  // ---- Sound Toggle ----
  function initSoundToggle() {
    const btn = $('#sound-toggle');
    btn.addEventListener('click', () => {
      if (!SoundManager._initialized) SoundManager.init();
      const muted = SoundManager.toggleMute();
      btn.textContent = muted ? '🔇' : '🔊';
      btn.classList.toggle('muted', muted);
    });
  }

  // ---- Bold Toggle ----
  function initBoldToggle() {
    const btn = $('#bold-toggle');
    const saved = localStorage.getItem('quiz-bold') === 'true';
    if (saved) {
      document.body.classList.add('bold-mode');
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      document.body.classList.toggle('bold-mode');
      const isActive = document.body.classList.contains('bold-mode');
      btn.classList.toggle('active', isActive);
      localStorage.setItem('quiz-bold', isActive);
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
    });
  }

  // ---- Screen Navigation ----
  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- Radio / Button Group Helpers ----
  function initRadioGroup(containerId, callback) {
    const container = $(`#${containerId}`);
    container.querySelectorAll('.radio-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.radio-option').forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        if (SoundManager && SoundManager._initialized) SoundManager.playClick();
        if (callback) callback(opt.dataset.value);
      });
    });
  }

  function initCountButtons() {
    const container = $('#count-options');
    container.querySelectorAll('.count-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.count-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.questionCount = parseInt(btn.dataset.count);
        if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      });
    });
  }

  // ---- Background Animation (Birds) ----
  function initParticles() {
    if (typeof BirdAnimation !== 'undefined') {
      BirdAnimation.init();
    }
  }

  // ---- Timer ----
  let timerInterval = null;
  let timeLeft = 0;

  function startTimer() {
    if (state.timer <= 0) return;
    clearTimer();
    timeLeft = state.timer;
    const timerContainer = $('#timer-container');
    timerContainer.style.display = 'block';
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 5 && timeLeft > 0) {
        if (SoundManager && SoundManager._initialized) SoundManager.playTick();
      }

      if (timeLeft <= 0) {
        clearTimer();
        if (SoundManager && SoundManager._initialized) SoundManager.playBuzzer();
        lockCurrentQuestion();
        // Auto-advance after a short delay
        setTimeout(() => {
          if (state.currentIndex < state.questions.length - 1) {
            goToQuestion(state.currentIndex + 1);
          }
        }, 800);
      }
    }, 1000);
  }

  function clearTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const text = $('#timer-text');
    const progress = $('#timer-progress');
    text.textContent = timeLeft;

    const circumference = 188.5; // 2 * PI * 30
    const offset = circumference * (1 - timeLeft / state.timer);
    progress.style.strokeDashoffset = offset;

    progress.classList.remove('warning', 'danger');
    if (timeLeft <= 5) {
      progress.classList.add('danger');
    } else if (timeLeft <= 10) {
      progress.classList.add('warning');
    }
  }

  function lockCurrentQuestion() {
    const q = state.questions[state.currentIndex];
    state.locked[q.id] = true;
    // Also mark as checked
    state.checked[q.id] = true;
    // Update UI
    const card = document.querySelector(`.question-card[data-id="${q.id}"]`);
    if (card) {
      disableOptions(card, q);
    }
  }

  // ---- Fisher-Yates Shuffle ----
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---- Quiz Setup ----
  function setupQuiz() {
    // Get selected config values
    const selectedMode = document.querySelector('#mode-options .radio-option.selected');
    state.mode = selectedMode ? selectedMode.dataset.value : 'one-by-one';

    const selectedOrder = document.querySelector('#order-options .radio-option.selected');
    state.order = selectedOrder ? selectedOrder.dataset.value : 'order';

    const selectedTimer = document.querySelector('#timer-options .radio-option.selected');
    state.timer = selectedTimer ? parseInt(selectedTimer.dataset.value) : 0;

    // If scroll mode, no timer
    if (state.mode === 'scroll') state.timer = 0;

    // Prepare questions
    let qs = [...QUESTIONS];
    if (state.order === 'shuffle') qs = shuffleArray(qs);
    state.questions = qs.slice(0, state.questionCount);

    // Reset state
    state.answers = {};
    state.checked = {};
    state.locked = {};
    state.submitted = false;
    state.currentIndex = 0;

    // Update instructions summary
    $('#sum-count').textContent = state.questions.length;
    $('#sum-mode').textContent = state.mode === 'one-by-one' ? 'One by One' : 'Scroll';
    $('#sum-order').textContent = state.order === 'order' ? 'In Order (PDF)' : 'Shuffle';
    $('#sum-timer').textContent = state.timer > 0 ? `${state.timer}s per question` : 'No Timer';
  }

  // ---- Render Quiz ----
  function renderQuiz() {
    const container = $('#quiz-container');
    container.innerHTML = '';

    if (state.mode === 'scroll') {
      // Render all questions
      state.questions.forEach((q, i) => {
        container.appendChild(createQuestionCard(q, i));
      });
      $('#quiz-nav').style.display = 'none';
      $('#timer-container').style.display = 'none';
    } else {
      // One-by-one: render only current
      renderCurrentQuestion();
      renderDots();
      $('#quiz-nav').style.display = 'flex';
    }

    updateProgress();
  }

  function createQuestionCard(q, index) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.id = q.id;
    card.style.animationDelay = `${index * 0.05}s`;

    const letters = ['A', 'B', 'C', 'D'];

    card.innerHTML = `
      <div class="question-number">${index + 1}</div>
      <div class="question-text">${q.question}</div>
      <div class="options-list">
        ${q.options.map((opt, oi) => `
          <button class="option-btn" data-qid="${q.id}" data-oi="${oi}"
            ${state.locked[q.id] || (state.checked[q.id] && state.timer > 0) ? 'disabled' : ''}>
            <span class="option-letter">${letters[oi]}</span>
            <span class="option-text">${opt}</span>
            <span class="option-icon"></span>
          </button>
        `).join('')}
      </div>
      <div class="question-actions">
        <button class="btn-check ${state.checked[q.id] ? 'checked' : ''}" data-qid="${q.id}">✓ Check</button>
      </div>
    `;

    // Restore selected answer
    if (state.answers[q.id] !== undefined) {
      const selectedBtn = card.querySelector(`.option-btn[data-oi="${state.answers[q.id]}"]`);
      if (selectedBtn) selectedBtn.classList.add('selected');
    }

    // Restore checked state
    if (state.checked[q.id]) {
      disableOptions(card, q);
    }

    // Add option click listeners
    card.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => handleOptionClick(btn, q));
    });

    // Add check button listener
    card.querySelector('.btn-check').addEventListener('click', () => handleCheck(q));

    return card;
  }

  function renderCurrentQuestion() {
    const container = $('#quiz-container');
    container.innerHTML = '';
    const q = state.questions[state.currentIndex];
    const card = createQuestionCard(q, state.currentIndex);
    container.appendChild(card);

    // Start timer if applicable
    if (state.timer > 0 && !state.locked[q.id] && !state.checked[q.id]) {
      startTimer();
    } else if (state.timer > 0 && (state.locked[q.id] || state.checked[q.id])) {
      clearTimer();
      // Show timer but frozen
      const timerContainer = $('#timer-container');
      timerContainer.style.display = 'block';
      $('#timer-text').textContent = '—';
      const progress = $('#timer-progress');
      progress.style.strokeDashoffset = '188.5';
      progress.classList.remove('warning', 'danger');
    } else {
      clearTimer();
      $('#timer-container').style.display = 'none';
    }
  }

  function renderDots() {
    const dotsContainer = $('#quiz-dots');
    dotsContainer.innerHTML = '';
    state.questions.forEach((q, i) => {
      const dot = document.createElement('div');
      dot.className = 'quiz-dot';
      if (i === state.currentIndex) dot.classList.add('active');
      if (state.answers[q.id] !== undefined) dot.classList.add('answered');
      if (state.checked[q.id]) {
        const isCorrect = state.answers[q.id] === q.correct;
        dot.classList.add(isCorrect ? 'checked-correct' : 'checked-wrong');
      }
      dot.addEventListener('click', () => goToQuestion(i));
      dotsContainer.appendChild(dot);
    });
  }

  // ---- Auto-check current question before navigating away ----
  function autoCheckCurrent() {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    if (state.checked[q.id]) return; // already checked
    if (state.answers[q.id] === undefined) return; // nothing selected
    // Auto-check it
    state.checked[q.id] = true;
    const card = document.querySelector(`.question-card[data-id="${q.id}"]`);
    if (card) disableOptions(card, q);
  }

  function goToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;
    // Auto-check current question before leaving
    autoCheckCurrent();
    state.currentIndex = index;
    renderCurrentQuestion();
    renderDots();
    updateProgress();
  }

  // ---- Option Click ----
  function handleOptionClick(btn, q) {
    // If locked or checked in timer mode, can't change
    if (state.locked[q.id]) return;
    if (state.checked[q.id] && state.timer > 0) return;
    if (state.checked[q.id]) return;

    // Init sound on first interaction
    if (SoundManager && !SoundManager._initialized) SoundManager.init();

    const card = btn.closest('.question-card');
    card.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.answers[q.id] = parseInt(btn.dataset.oi);

    if (SoundManager && SoundManager._initialized) SoundManager.playClick();
    updateProgress();
    if (state.mode === 'one-by-one') renderDots();
  }

  // ---- Check Answer ----
  function handleCheck(q) {
    if (state.checked[q.id]) return;
    if (state.answers[q.id] === undefined) return; // nothing selected

    if (SoundManager && !SoundManager._initialized) SoundManager.init();

    state.checked[q.id] = true;
    const card = document.querySelector(`.question-card[data-id="${q.id}"]`);
    disableOptions(card, q);

    // Stop timer for this question
    if (state.timer > 0) clearTimer();

    if (state.mode === 'one-by-one') renderDots();
  }

  function disableOptions(card, q) {
    if (!card) return;
    const selectedIdx = state.answers[q.id];
    const isCorrect = selectedIdx === q.correct;

    card.querySelectorAll('.option-btn').forEach((btn) => {
      btn.classList.add('disabled');
      const oi = parseInt(btn.dataset.oi);

      if (oi === q.correct) {
        btn.classList.add('correct');
        btn.querySelector('.option-icon').textContent = '✓';
      }
      if (selectedIdx !== undefined && oi === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
        btn.querySelector('.option-icon').textContent = '✗';
      }
    });

    // Card glow
    if (isCorrect) {
      card.classList.add('correct-glow');
      if (SoundManager && SoundManager._initialized) SoundManager.playCorrect();
    } else {
      card.classList.add('wrong-shake');
      if (SoundManager && SoundManager._initialized) SoundManager.playWrong();
    }

    // Disable check button
    const checkBtn = card.querySelector('.btn-check');
    if (checkBtn) checkBtn.classList.add('checked');
  }

  // ---- Progress ----
  function updateProgress() {
    const answered = Object.keys(state.answers).length;
    const total = state.questions.length;
    const pct = (answered / total) * 100;
    $('#progress-fill').style.width = `${pct}%`;
    $('#progress-text').textContent = `${answered} / ${total} answered`;
  }

  // ---- Submit All ----
  function submitAll() {
    if (state.submitted) return;
    state.submitted = true;
    clearTimer();

    // Auto-check current question if not checked
    autoCheckCurrent();

    // Calculate scores
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    state.questions.forEach((q) => {
      const ans = state.answers[q.id];
      if (ans === undefined || ans === null) {
        skipped++;
      } else if (Number(ans) === Number(q.correct)) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = state.questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Show results screen first
    showScreen('results');

    // Use rAF to ensure DOM is ready after screen transition
    requestAnimationFrame(() => {
      // Stats - update directly
      const statCorrectEl = document.getElementById('stat-correct');
      const statWrongEl = document.getElementById('stat-wrong');
      const statSkippedEl = document.getElementById('stat-skipped');
      if (statCorrectEl) statCorrectEl.textContent = correct;
      if (statWrongEl) statWrongEl.textContent = wrong;
      if (statSkippedEl) statSkippedEl.textContent = skipped;

      // Score ring and counter
      const scoreEl = document.getElementById('score-number');
      const totalEl = document.getElementById('score-total');
      const pctEl = document.getElementById('score-percentage');
      const ringFill = document.getElementById('ring-fill');

      if (totalEl) totalEl.textContent = '/ ' + total;

      // Animate counter from 0 to correct
      if (scoreEl) {
        let current = 0;
        if (correct === 0) {
          scoreEl.textContent = '0';
          if (pctEl) pctEl.textContent = '0%';
        } else {
          const step = Math.max(1, Math.ceil(correct / 30));
          const counterInterval = setInterval(() => {
            current = Math.min(current + step, correct);
            scoreEl.textContent = current;
            if (pctEl) pctEl.textContent = Math.round((current / total) * 100) + '%';
            if (current >= correct) clearInterval(counterInterval);
          }, 50);
        }
      }

      // Animate ring
      if (ringFill) {
        const circumference = 502.65;
        const offset = circumference * (1 - pct / 100);
        ringFill.className = 'ring-fill';
        if (pct >= 70) ringFill.classList.add('excellent');
        else if (pct >= 50) ringFill.classList.add('good');
        else if (pct >= 30) ringFill.classList.add('average');
        else ringFill.classList.add('poor');
        setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 100);
      }

      // Performance badge
      const badge = document.getElementById('performance-badge');
      const emojiEl = document.getElementById('result-emoji');
      let badgeText, badgeClass, emoji;
      if (pct >= 90) {
        badgeText = '\uD83C\uDFC6 Outstanding!'; badgeClass = 'excellent'; emoji = '\uD83C\uDFC6';
      } else if (pct >= 70) {
        badgeText = '\uD83C\uDF1F Excellent!'; badgeClass = 'excellent'; emoji = '\uD83C\uDF89';
      } else if (pct >= 50) {
        badgeText = '\uD83D\uDC4D Good Job!'; badgeClass = 'average'; emoji = '\uD83D\uDC4D';
      } else {
        badgeText = '\uD83D\uDCAA Keep Trying!'; badgeClass = 'poor'; emoji = '\uD83D\uDCAA';
      }
      if (badge) { badge.textContent = badgeText; badge.className = 'performance-badge ' + badgeClass; }
      if (emojiEl) emojiEl.textContent = emoji;

      // Confetti for good scores
      if (pct >= 70 && typeof ConfettiManager !== 'undefined') {
        setTimeout(() => ConfettiManager.launch({ duration: 4000, particleCount: 200 }), 500);
      }

      // Fanfare sound
      if (SoundManager && SoundManager._initialized) {
        setTimeout(() => SoundManager.playFanfare(), 300);
      }

      // Detailed report
      renderReport();
    });
  }

  function animateScore(target, total, pct) {
    const scoreEl = $('#score-number');
    const totalEl = $('#score-total');
    const pctEl = $('#score-percentage');
    const ringFill = $('#ring-fill');

    totalEl.textContent = `/ ${total}`;

    // Animate counter
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const counterInterval = setInterval(() => {
      current = Math.min(current + step, target);
      scoreEl.textContent = current;
      pctEl.textContent = `${Math.round((current / total) * 100)}%`;
      if (current >= target) clearInterval(counterInterval);
    }, 40);

    // Animate ring
    const circumference = 502.65; // 2 * PI * 80
    const offset = circumference * (1 - pct / 100);
    ringFill.className = 'ring-fill';
    if (pct >= 70) ringFill.classList.add('excellent');
    else if (pct >= 50) ringFill.classList.add('good');
    else if (pct >= 30) ringFill.classList.add('average');
    else ringFill.classList.add('poor');

    setTimeout(() => {
      ringFill.style.strokeDashoffset = offset;
    }, 200);
  }

  function renderReport() {
    const list = $('#report-list');
    list.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    state.questions.forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'report-item';
      item.style.animationDelay = `${i * 0.03}s`;

      const selected = state.answers[q.id];
      let icon, detail;

      if (selected === undefined) {
        icon = '⏭';
        detail = `<span class="correct-answer">Correct: ${letters[q.correct]}) ${q.options[q.correct]}</span>`;
      } else if (selected === q.correct) {
        icon = '✅';
        detail = `<span class="correct-answer">${letters[q.correct]}) ${q.options[q.correct]}</span>`;
      } else {
        icon = '❌';
        detail = `<span class="your-answer">Your answer: ${letters[selected]}) ${q.options[selected]}</span><br>
                  <span class="correct-answer">Correct: ${letters[q.correct]}) ${q.options[q.correct]}</span>`;
      }

      item.innerHTML = `
        <span class="report-icon">${icon}</span>
        <div>
          <div class="report-q">Q${i + 1}. ${q.question}</div>
          <div class="report-detail">${detail}</div>
        </div>
      `;
      list.appendChild(item);
    });
  }

  // ---- Answer Key Renderer ----
  function renderAnswerKey() {
    const grid = $('#answerkey-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    QUESTIONS.forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'ak-item';

      let optionsHTML = q.options.map((opt, oi) => {
        const isCorrect = oi === q.correct;
        return `<div class="ak-option${isCorrect ? ' ak-correct' : ''}">
          <span class="ak-letter">${letters[oi]}</span>
          <span class="ak-opt-text">${opt}</span>
          ${isCorrect ? '<span class="ak-check">✔</span>' : ''}
        </div>`;
      }).join('');

      item.innerHTML = `
        <div class="ak-qnum">${i + 1}</div>
        <div class="ak-body">
          <div class="ak-qtext">${q.question}</div>
          <div class="ak-options">${optionsHTML}</div>
        </div>
      `;
      grid.appendChild(item);
    });
  }

  // ---- Event Listeners ----
  function initEventListeners() {
    // Config
    initCountButtons();
    initRadioGroup('order-options', (val) => { state.order = val; });
    initRadioGroup('mode-options', (val) => {
      state.mode = val;
      // Show/hide timer section
      const timerSection = $('#timer-section');
      if (val === 'scroll') {
        timerSection.style.opacity = '0.4';
        timerSection.style.pointerEvents = 'none';
      } else {
        timerSection.style.opacity = '1';
        timerSection.style.pointerEvents = 'auto';
      }
    });
    initRadioGroup('timer-options', (val) => { state.timer = parseInt(val); });

    // Start button
    $('#btn-start').addEventListener('click', () => {
      if (SoundManager && !SoundManager._initialized) SoundManager.init();
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      setupQuiz();
      showScreen('instructions');
    });

    // Instructions
    $('#btn-back-landing').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      showScreen('landing');
    });

    $('#btn-begin').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      renderQuiz();
      showScreen('quiz');
    });

    // Quiz navigation
    $('#btn-prev').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      goToQuestion(state.currentIndex - 1);
    });

    $('#btn-next').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      goToQuestion(state.currentIndex + 1);
    });

    // Submit all
    $('#btn-submit-all').addEventListener('click', () => {
      const answered = Object.keys(state.answers).length;
      const total = state.questions.length;
      if (answered < total) {
        const unanswered = total - answered;
        if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
      }
      submitAll();
    });

    // Results
    $('#btn-retake').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      setupQuiz();
      renderQuiz();
      showScreen('quiz');
    });

    $('#btn-home').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      showScreen('landing');
    });

    // Answer Key
    $('#btn-answerkey').addEventListener('click', () => {
      if (SoundManager && !SoundManager._initialized) SoundManager.init();
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      renderAnswerKey();
      showScreen('answerkey');
    });

    $('#btn-answerkey-back').addEventListener('click', () => {
      if (SoundManager && SoundManager._initialized) SoundManager.playClick();
      showScreen('landing');
    });

    // Keyboard navigation (one-by-one mode)
    document.addEventListener('keydown', (e) => {
      if (state.mode !== 'one-by-one' || !screens.quiz.classList.contains('active')) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToQuestion(state.currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToQuestion(state.currentIndex - 1);
      } else if (e.key >= '1' && e.key <= '4') {
        // Select option by number key
        const q = state.questions[state.currentIndex];
        const optIndex = parseInt(e.key) - 1;
        const btn = document.querySelector(`.option-btn[data-qid="${q.id}"][data-oi="${optIndex}"]`);
        if (btn && !btn.classList.contains('disabled')) {
          handleOptionClick(btn, q);
        }
      } else if (e.key === 'Enter') {
        // Check answer
        const q = state.questions[state.currentIndex];
        if (!state.checked[q.id] && state.answers[q.id] !== undefined) {
          handleCheck(q);
        }
      }
    });

    // Hover sounds on buttons
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.btn-primary, .btn-secondary, .count-btn')) {
        if (SoundManager && SoundManager._initialized) SoundManager.playHover();
      }
    });
  }

  // ---- Init ----
  function init() {
    initFontSwitcher();
    initBoldToggle();
    initSoundToggle();
    initEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
