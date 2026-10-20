(() => {
const { parts, householdChoices, examples, reflectionChoices, explorationChoices, nextChoices, pathways, stages, needsPathway, startingPoint, startingPointText } = globalThis.DLRContent;

// Deliberately ephemeral. No storage, cookies, URL answers, or network requests.
const state = { screen: 'welcome', household: '', example: '', reflection: '', exploration: '', next: '', pathway: '' };
const main = document.querySelector('main');
const map = document.querySelector('#parts');
const screenPart = { welcome: 0, notice: 1, example: 2, reflection: 2, safety: 3, journey: 3, explore: 4, next: 4, pathway: 4, offer: 4, takeaway: 4, done: 4 };
const returnAddress = new URL(location.href);
returnAddress.search = '';
returnAddress.hash = '';
const returnUrl = returnAddress.href;
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icons = {
  bill: '<rect x="6" y="3" width="16" height="24" rx="2"/><path d="M10 9h8m-8 5h8m-8 5h4"/>',
  device: '<rect x="3" y="5" width="24" height="17" rx="2"/><path d="M10 27h10m-5-5v5"/>',
  folder: '<path d="M3 9V6h9l3 4h12v15H3Z"/><path d="M3 14h24"/>',
  arrow: '<path d="M5 15h20m-7-7 7 7-7 7"/>',
  leaf: '<path d="M6 25C4 8 16 4 26 4c0 15-7 23-17 18M6 27 21 11"/>'
};
function icon(name) { return `<svg viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] ?? icons.leaf}</svg>`; }
function heading(kicker, title, intro = '') { return `<p class="eyebrow">${kicker}</p><h1 tabindex="-1">${title}</h1>${intro ? `<p class="intro">${intro}</p>` : ''}`; }
function button(label, action, secondary = false, disabled = false) { return `<button type="button" class="button ${secondary ? 'secondary' : ''}" data-action="${action}" ${disabled ? 'disabled' : ''}>${label}${!secondary ? icon('arrow') : ''}</button>`; }
function nav(back, next, label = 'Continue', required = '') { return `<div class="navigation">${button('Back', back, true)}${button(label, next, false, required && !state[required])}</div>`; }
function choiceGroup(key, choices, legend) {
  const selected = choices.find(item => item.id === state[key]);
  return `<fieldset class="choices"><legend class="sr-only">${legend}</legend>${choices.map(item => `<label class="choice ${item.detail ? 'with-detail' : ''}"><input type="radio" name="${key}" value="${item.id}" ${state[key] === item.id ? 'checked' : ''}><span class="radio-mark" aria-hidden="true"></span>${item.icon ? `<span class="choice-icon">${icon(item.icon)}</span>` : ''}<span>${item.label}${item.detail ? `<small>${item.detail}</small>` : ''}</span></label>`).join('')}</fieldset><div class="acknowledgement" role="status" aria-live="polite" aria-atomic="true">${selected?.ack ? `${icon('leaf')}<p>${selected.ack}</p>` : ''}</div>`;
}
function house() { return `<div class="house-scene" aria-hidden="true"><span class="scene-label label-top">The people you count on</span><svg class="house-art" viewBox="0 0 440 400" fill="none"><circle cx="230" cy="205" r="150" fill="#e7e9da"/><circle cx="230" cy="205" r="174" stroke="#c6cebc" stroke-dasharray="3 9"/><path d="m108 191 122-97 122 97" stroke="#244d40" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M129 179v153h202V179" fill="#f7f4eb" stroke="#244d40" stroke-width="5" stroke-linejoin="round"/><path d="M266 122V88h32v60" stroke="#244d40" stroke-width="5" stroke-linejoin="round"/><rect x="210" y="251" width="43" height="81" rx="20" fill="#b7c4aa" stroke="#244d40" stroke-width="4"/><circle cx="242" cy="292" r="3" fill="#244d40"/><rect x="155" y="200" width="41" height="42" rx="3" fill="#e9cc9f" stroke="#244d40" stroke-width="4"/><path d="M175 201v40m-19-20h39" stroke="#244d40" stroke-width="3"/><rect x="266" y="200" width="41" height="42" rx="3" fill="#e9cc9f" stroke="#244d40" stroke-width="4"/><path d="M287 201v40m-20-20h39" stroke="#244d40" stroke-width="3"/><path d="M87 332h290M104 327c-21-20-22-46-10-57 19 10 25 28 10 57Zm250 0c-15-27-7-49 9-55 14 17 10 38-9 55Z" stroke="#657c5c" stroke-width="3" stroke-linecap="round"/><path d="m227 170 4 4 4-4a8 8 0 0 1 12 11l-16 15-16-15a8 8 0 0 1 12-11Z" fill="#b97959"/></svg><span class="scene-label label-left">The things you know</span><span class="scene-label label-bottom">The routines that keep life moving</span></div>`; }

function render(focus = true) {
  const part = screenPart[state.screen];
  map.innerHTML = parts.map((title, i) => `<li ${part === i ? 'aria-current="step"' : ''}><span class="part-number">0${i + 1}</span><span>${title}</span></li>`).join('');
  main.className = state.screen === 'welcome' ? 'welcome' : 'inner';
  let html = '';
  switch (state.screen) {
    case 'welcome': html = `<div class="welcome-layout"><div>${heading('Your first DLR experience', 'What keeps your<br class="desktop-break"> household running?', 'Your household depends on people, information, and everyday routines. What would happen if something important became unavailable?')}<p class="welcome-copy">Digital Life Readiness helps you understand what matters and become better prepared, one manageable step at a time.</p><div class="welcome-actions">${button('Let’s begin', 'notice')}<span>Around 10–15 minutes.<br>Take the time that feels right.</span></div></div>${house()}</div><div class="welcome-bottom"><p><strong>A little noticing can go a long way.</strong><br>Think about finances, communication, important documents, or technology. A small disruption—like a person being away or a phone not working—can interrupt an everyday routine.</p><p>This introduction is for households of any shape or size, including a household of one. No technical knowledge or private details needed.</p></div><p class="scope-note">An introduction to DLR. Formal preparedness work begins later.</p>`; break;
    case 'notice': html = `${heading('Notice your household', 'Which statement feels most familiar?', 'Every household has its own way of making things work. Think about yours, just as it is today.')}${choiceGroup('household', householdChoices, 'Which statement feels most familiar?')}<p class="hint">There is no right answer. You can change your choice or reflect privately.</p>${nav('welcome', 'example', 'Explore one example', 'household')}`; break;
    case 'example': html = `${heading('Explore one example', 'Let’s make it everyday.', 'Choose just one familiar example to think about. There is no need to review every part of your household.')}${choiceGroup('example', examples, 'Choose one example')}<p class="hint">You’ll consider one situation. No names, accounts, or other details are needed.</p>${nav('notice', 'reflection', 'Think about this example', 'example')}`; break;
    case 'reflection': {
      const example = examples.find(item => item.id === state.example);
      html = `${heading('Explore one example', 'Would someone know where to begin?')}<div class="example-story">${icon(example.icon)}<div><span class="eyebrow">${example.label}</span><p>${example.story}</p></div></div><p class="question-context">If the person who normally handles this was unavailable, would someone know where to begin?</p>${choiceGroup('reflection', reflectionChoices, 'Would someone know where to begin?')}<p class="hint">A routine can work beautifully today and still depend on one person’s knowledge. That is something to notice, without judging it.</p>${nav('example', 'safety', 'Explore safe preparedness', 'reflection')}`; break;
    }
    case 'safety': html = `${heading('Safe preparedness', 'Help life carry on.<br>Keep your boundaries.', 'Preparedness means making appropriate continuity possible. It doesn’t mean sharing every password or giving someone unrestricted access.')}<dl class="distinctions"><div><dt>Know</dt><dd>Know something exists, why it matters, or where to begin.</dd></div><div><dt>Access</dt><dd>Legitimately reach the information, device, account, or service.</dd></div><div><dt>Act</dt><dd>Have the practical ability to do what is needed.</dd></div><div><dt>Authority</dt><dd>Have the appropriate permission or authority to do it.</dd></div></dl><p class="hint distinction-note">These are different ideas, not a ladder. Not everyone needs all four. Being a spouse, relative, or trusted person does not automatically give someone authority. DLR does not create it.</p><div class="safety-habits"><div><h2>Slow down and verify</h2><p>If an important request is unusual, urgent, or sensitive, verify it independently through a known, legitimate contact route.</p></div><div><h2>Use legitimate routes and help</h2><p>Provider processes, trusted people, and appropriate professionals can help. Respect restrictions rather than bypassing them.</p></div></div><p class="quiet-note">No passwords, PINs, account numbers, recovery codes, or personal identifiers belong in this experience.</p>${nav('reflection', 'journey', 'See the DLR journey')}`; break;
    case 'journey': html = `${heading('The wider DLR journey', 'A path you can take gradually.', 'Start by understanding what matters. Each part prepares the ground for what follows. Useful arrangements you already have can carry forward.')}<ol class="journey"><li>Understand what matters</li><li>Make access dependable</li><li>Prepare people and safeguards</li><li>Create a usable plan</li><li>Test it</li><li>Keep it current</li></ol><p class="hint">This is a simple way to see the journey. The ten formal stages keep their own names and sequence.</p><details class="stage-details"><summary>Explore the ten DLR stages</summary><p>Ten distinct preparedness questions, with different amounts of work depending on your household and what is already in place.</p><ol class="stages">${stages.map(stage => `<li>${stage}</li>`).join('')}</ol><p>After the initial journey, maintenance keeps useful preparedness current as circumstances change. It does not mean repeatedly redoing the whole program.</p></details><div class="pathway-awareness"><h2>Same DLR. Different ways to work through it.</h2><p><strong>Self-Guided:</strong> work through materials yourself. <strong>Digital:</strong> use an interactive experience. <strong>Facilitated:</strong> work with a facilitator. <strong>Hybrid / Supported:</strong> combine independent work and support.</p><p>All follow the same preparedness standard. You can change how you work later, and legitimate progress carries forward.</p></div><p class="scope-note">You’re in Orientation: an introduction to DLR. If you continue, the program preamble helps you approach the work; Stage 1, <em>Understand How Your Household Runs</em>, begins the formal household assessment. This introduction does not complete Stage 1 or establish household readiness.</p>${nav('safety', 'explore', 'Consider my starting point')}`; break;
    case 'explore': html = `${heading('Your starting point', 'What might you like to explore?', 'If something caught your attention, you can keep it in mind. Choosing a topic is optional; it doesn’t commit you to any work.')}${choiceGroup('exploration', explorationChoices, 'What might you like to explore?')}${nav('journey', 'next', 'Choose what comes next')}<button class="text-button" data-action="skip-explore">Skip this optional choice</button>`; break;
    case 'next': html = `${heading('Your starting point', 'What feels right for you next?', 'You can choose to continue, come back, or leave it here. There is no obligation to do more today.')}${choiceGroup('next', nextChoices, 'What feels right for you next?')}${nav('explore', 'next-route', 'Continue', 'next')}`; break;
    case 'pathway': html = `${heading('Your starting point', 'How might you like to continue?', 'These are ways to experience the same DLR work. This is an optional preference, and you can change it later.')}${choiceGroup('pathway', pathways, 'How might you like to continue?')}<p class="hint">This prototype offers an introduction only. It does not enroll you, book support, or open the full program.</p>${nav('next', 'offer', 'Continue')}`; break;
    case 'offer': html = `${heading('Your starting point', 'Keep what feels useful.', 'My DLR Starting Point can bring together what you noticed and the direction you chose—a personal bookmark you can copy or print, without turning it into a task.')}<div class="bookmark-illustration" aria-hidden="true">${icon('leaf')}</div><p>You can also leave without creating anything. Noticing what already works is as welcome here as finding a question to explore.</p><div class="navigation">${button('Back', needsPathway(state.next) ? 'pathway' : 'next', true)}${button('Make my Starting Point', 'takeaway')}</div><button class="text-button" data-action="done">Finish without a takeaway</button>`; break;
    case 'takeaway': {
      const point = startingPoint(state);
      html = `${heading('Yours to keep, if you wish', 'My DLR Starting Point', 'Here’s what you chose to keep in view. You can go back and change any choice.')}<article class="takeaway" aria-label="My DLR Starting Point"><div class="takeaway-top"><span>DLR Companion</span>${icon('leaf')}</div><h2>My DLR Starting Point</h2><p>${escape(point.opening)}</p><dl><dt>Something I noticed</dt><dd>${escape(point.noticed)}</dd><dt>Something I might want to explore</dt><dd>${escape(point.explore)}</dd><dt>What I’d like to do next</dt><dd>${escape(point.next)}</dd><dd>${escape(point.direction)}</dd><dt>How I can return</dt><dd class="return-reference">${escape(returnUrl)}<small>${escape(point.returnNote)}</small></dd></dl><p class="takeaway-boundary">A personal bookmark from this introduction. It is not a household assessment, a Digital Readiness Snapshot, or evidence of Stage 1 completion or household readiness.</p></article><div class="export-actions">${button('Copy my Starting Point', 'copy', true)}${button('Print / save as PDF', 'print', true)}</div><p id="export-status" role="status" aria-live="polite"></p><div id="copy-fallback"></div><p class="hint">Only copy or print if you are comfortable keeping these reflections on this device or on paper. Nothing is saved by the app.</p>${nav('offer', 'done', 'Finish here')}`; break;
    }
    case 'done': {
      const chosen = nextChoices.find(item => item.id === state.next);
      const point = startingPoint(state);
      const title = state.next === 'not-now' ? 'You can leave it here.' : state.next === 'deciding' ? 'Room to decide.' : 'A starting point, at your pace.';
      html = `${heading('At your pace', title, escape(point.opening))}<div class="closing-choice"><span class="eyebrow">Your preferred next step</span><h2>${escape(chosen.label)}</h2><p>${escape(point.direction)}</p></div><p class="hint">This was an introduction. It does not establish Stage 1 completion or household readiness. The full program and support services are outside this prototype.</p><div class="navigation">${button('Review my choices', 'next', true)}${button('View my Starting Point', 'takeaway')}</div><p class="quiet-note">${escape(point.returnNote)} Keep your optional Starting Point only if you’d find it useful.</p>`; break;
    }
  }
  main.innerHTML = `<div class="screen">${html}</div>`;
  if (focus) { main.querySelector('h1').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
}

main.addEventListener('change', event => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== 'radio') return;
  if (input.name === 'example' && state.example !== input.value) state.reflection = '';
  state[input.name] = input.value;
  const choices = { household: householdChoices, example: examples, reflection: reflectionChoices, exploration: explorationChoices, next: nextChoices, pathway: pathways }[input.name];
  const choice = choices.find(item => item.id === input.value);
  const ack = main.querySelector('.acknowledgement');
  ack.innerHTML = choice.ack ? `${icon('leaf')}<p>${choice.ack}</p>` : '';
  const next = main.querySelector('.navigation .button:not(.secondary)');
  if (next) next.disabled = false;
});

main.addEventListener('click', async event => {
  const target = event.target.closest('button[data-action]');
  if (!target || target.disabled) return;
  let action = target.dataset.action;
  if (action === 'print') { window.print(); return; }
  if (action === 'copy') {
    const text = startingPointText(state, returnUrl);
    try {
      await navigator.clipboard.writeText(text);
      document.querySelector('#export-status').textContent = 'Your Starting Point was copied. Paste it somewhere you’d like to keep it.';
    } catch {
      document.querySelector('#export-status').textContent = 'Automatic copying is unavailable. Select and copy the text below, or use Print / save as PDF.';
      document.querySelector('#copy-fallback').innerHTML = `<label class="fallback-label" for="fallback-text">Your Starting Point, ready to copy</label><textarea id="fallback-text" readonly rows="10">${escape(text)}</textarea>`;
      const fallback = document.querySelector('#fallback-text'); fallback.focus(); fallback.select();
    }
    return;
  }
  if (action === 'next-route') action = needsPathway(state.next) ? 'pathway' : 'offer';
  if (action === 'skip-explore') { state.exploration = ''; action = 'next'; }
  state.screen = action;
  render();
});
render(false);
})();
