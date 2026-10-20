import test from 'node:test';
import assert from 'node:assert/strict';
import '../content.js';
const { householdChoices, examples, reflectionChoices, explorationChoices, nextChoices, pathways, stages, needsPathway, startingPoint, startingPointText } = globalThis.DLRContent;

test('Starting Point carries selected observations without turning them into findings', () => {
  const state = { household: 'different', example: 'bills', reflection: 'help', exploration: 'privacy', next: 'begin', pathway: 'hybrid' };
  const point = startingPoint(state);
  assert.equal(point.noticed, 'We share responsibilities, but each knows different things. Paying household bills: I think someone would probably know where to begin, although some help might be needed.');
  assert.equal(point.explore, 'Preparing while protecting privacy');
  assert.equal(point.next, 'Begin the DLR journey — Hybrid / Supported DLR.');
  const text = startingPointText(state, 'http://localhost:4173/');
  for (const value of Object.values(point)) assert.ok(text.includes(value));
  assert.ok(text.includes('http://localhost:4173/'));
  assert.ok(text.includes('not a household assessment'));
});

test('Private reflection and skipped exploration remain private and optional', () => {
  const point = startingPoint({ household: 'private', example: 'information', reflection: 'private', next: 'not-now' });
  assert.equal(point.noticed, 'Finding important information: I reflected privately on this example.');
  assert.equal(point.explore, 'Nothing in particular right now.');
  assert.equal(point.next, 'Not now.');
});

test('Changing continuation preference never carries an irrelevant former pathway into the takeaway', () => {
  for (const next of ['not-now', 'later', 'deciding']) {
    assert.equal(needsPathway(next), false);
    assert.ok(!startingPoint({ next, pathway: 'facilitated' }).next.includes('Facilitated'));
  }
  assert.equal(needsPathway('begin'), true);
  assert.equal(needsPathway('support'), true);
});

test('Every selectable response maps accurately and has an acknowledgement', () => {
  for (const [key, choices] of Object.entries({ household: householdChoices, reflection: reflectionChoices, exploration: explorationChoices, next: nextChoices, pathway: pathways })) {
    for (const choice of choices) {
      assert.ok(choice.ack.length > 20, `${key}/${choice.id} needs acknowledgement`);
      const state = { household: 'one', example: 'technology', reflection: 'yes', exploration: 'working', next: 'begin', pathway: 'self', [key]: choice.id };
      const point = startingPoint(state);
      if (key === 'household' && choice.id !== 'private') assert.ok(point.noticed.includes(choice.label));
      if (key === 'reflection') assert.ok(point.noticed.includes(choice.note));
      if (key === 'exploration' && choice.id !== 'none') assert.equal(point.explore, choice.label);
      if (key === 'next' || key === 'pathway') assert.ok(point.next.includes(choice.label));
    }
  }
  for (const example of examples) {
    assert.ok(example.ack.length > 20);
    assert.ok(startingPoint({ example: example.id, reflection: 'uncertain' }).noticed.includes(example.label));
  }
});

test('Formal stage names and sequence match the frozen Orientation baseline', () => {
  assert.deepEqual(stages, [
    'Understand How Your Household Runs', 'Identify Your Critical Accounts', 'Secure Your Passwords', 'Prepare Account Recovery', 'Prepare Devices, Email & Phone Access', 'Choose Your Trusted Person', 'Establish Scam & Fraud Safeguards', 'Create Your Emergency Access Plan', 'Test the Plan', 'Maintain the Plan'
  ]);
});

test('Opening reflections follow each selected perception, including strengths and private reflection', () => {
  const expected = { yes: 'arrangement you feel good about', help: 'probably know where to begin with some help', uncertain: 'unsure whether someone would know where to begin', explore: 'like to understand this example better', private: 'household reflection stays private' };
  for (const example of examples) {
    for (const reflection of reflectionChoices) {
      const state = { household: 'private', example: example.id, reflection: reflection.id, next: 'later' };
      const point = startingPoint(state);
      assert.ok(point.opening.includes(expected[reflection.id]), `${example.id}/${reflection.id}`);
      assert.ok(point.noticed.includes(reflection.note));
      assert.ok(startingPointText(state, 'http://localhost:4173/').includes(point.opening));
    }
  }
  const privateExampleOpenings = { one: 'one person handles most responsibilities', different: 'different knowledge between you', arrangements: 'arrangements you value', unsure: 'unsure how things would work', private: 'household reflection stays private' };
  for (const household of householdChoices) {
    assert.ok(startingPoint({ household: household.id, reflection: 'private' }).opening.includes(privateExampleOpenings[household.id]));
  }
});

test('Every continuation, topic, and pathway combination produces accurate, consistent export reflections', () => {
  const expectedDirection = { begin: 'program preamble comes before Stage 1', support: 'no service is arranged here', later: 'If you return', 'not-now': 'nothing more to decide here', deciding: 'leave the decision open' };
  for (const next of nextChoices) {
    for (const exploration of ['', ...explorationChoices.map(item => item.id)]) {
      for (const pathway of ['', ...pathways.map(item => item.id)]) {
        const state = { household: 'arrangements', example: 'bills', reflection: 'yes', next: next.id, exploration, pathway };
        const point = startingPoint(state);
        assert.ok(point.direction.includes(expectedDirection[next.id]), `${next.id}/${exploration}/${pathway}`);
        for (const value of Object.values(point)) assert.ok(startingPointText(state, 'http://localhost:4173/').includes(value));
        if (['begin', 'later'].includes(next.id) && exploration && exploration !== 'none') {
          assert.ok(point.direction.includes(explorationChoices.find(item => item.id === exploration).label.toLowerCase()));
        }
        if (!needsPathway(next.id)) {
          for (const option of pathways) assert.ok(!`${point.next} ${point.direction}`.includes(option.label));
        }
        if (next.id === 'not-now') {
          assert.ok(!/if you return|revisit DLR|begin DLR/i.test(`${point.direction} ${point.returnNote}`));
        }
        if (next.id === 'support' && pathway && pathway !== 'undecided') {
          assert.ok(point.direction.includes(pathways.find(item => item.id === pathway).label));
        }
      }
    }
  }
});
