(() => {
const parts = ['Welcome', 'Notice your household', 'Explore one example', 'Safe preparedness & the journey', 'Your starting point'];

const householdChoices = [
  { id: 'one', label: 'One person handles most important responsibilities.', ack: 'When one person handles most things, everyday know-how may sit with them too. Let’s consider one routine and what someone else would need to begin.' },
  { id: 'different', label: 'We share responsibilities, but each knows different things.', ack: 'You share the work, with different knowledge between you. One everyday example can help you notice how those pieces might come together if someone were unavailable.' },
  { id: 'arrangements', label: 'We already have good arrangements for helping each other.', ack: 'You’ve noticed arrangements you value. Keep those in mind as we explore one example—what already works is part of the picture too.' },
  { id: 'unsure', label: 'I’m not sure how things would work if someone became unavailable.', ack: 'You’re not sure how things would work yet. Let’s make the question more concrete with one everyday example; nothing needs to be resolved today.' },
  { id: 'private', label: 'I’d rather reflect privately.', ack: 'Keep your observation to yourself. You can use the next example to think it through without describing your household here.' }
];

const examples = [
  { id: 'bills', label: 'Paying household bills', detail: 'Keeping everyday payments moving', icon: 'bill', ack: 'Bill paying has a routine behind it, even when payments are automatic. Next, consider whether someone would know where to begin, without naming any bills or accounts.', story: 'Imagine the person who normally pays the household bills is away and unable to help for a while. A bill needs attention, and the usual routine has to carry on.' },
  { id: 'technology', label: 'Managing technology', detail: 'Getting help when something stops working', icon: 'device', ack: 'Using technology and knowing how to get help with it can be different things. Let’s consider where someone might begin when it stops working.', story: 'Imagine the person who normally manages the household technology is away and unable to help. The home internet stops working, and someone needs to find a way to get help.' },
  { id: 'information', label: 'Finding important information', detail: 'Knowing where to begin looking', icon: 'folder', ack: 'Information can exist without being easy for someone else to find. Let’s consider where they might begin; no documents or locations need to be named.', story: 'Imagine the person who normally looks after important household information is away and unable to help. A document is needed for an appointment, and someone has to find where to begin looking.' }
];

const reflectionChoices = [
  { id: 'yes', label: 'Yes, we have a good arrangement.', ack: 'You see an arrangement to build on in this example. Next, we’ll look at how preparedness can support what works while respecting privacy and authority.', note: 'I feel we have a good arrangement for someone to know where to begin.' },
  { id: 'help', label: 'Probably, although some help might be needed.', ack: 'You think someone could probably begin with help. Help can be part of continuity; next, we’ll look at what makes that help appropriate and safe.', note: 'I think someone would probably know where to begin, although some help might be needed.' },
  { id: 'uncertain', label: 'I’m uncertain.', ack: 'You’re unsure where someone would begin. Keep that question open as we look at safe preparedness, without deciding what needs to change.', note: 'I’m uncertain whether someone would know where to begin.' },
  { id: 'explore', label: 'This is something I’d like to understand better.', ack: 'You’d like to understand this example better. The next part offers a useful distinction: knowing where to begin is different from access, ability, or authority.', note: 'I’d like to understand better whether someone would know where to begin.' },
  { id: 'private', label: 'I’d rather keep this reflection to myself.', ack: 'Your reflection stays private. The next part looks at safe preparedness in general, so you can consider it without sharing your situation.', note: 'I reflected privately on this example.' }
];

const explorationChoices = [
  { id: 'working', label: 'Building on what already works', ack: 'You want to build on useful arrangements. That can guide later attention without recreating work; next, you can choose whether to continue now.' },
  { id: 'begin', label: 'Helping someone know where to begin', ack: 'You’re interested in a clearer starting point for someone else. You can keep that direction in mind while choosing whether to continue now or later.' },
  { id: 'privacy', label: 'Preparing while protecting privacy', ack: 'You want preparedness to respect privacy. That gives you a principle to carry forward, whether you choose to continue now or leave it here.' },
  { id: 'support', label: 'Understanding what support is available', ack: 'You’d like to understand the support options. Next, you can choose to explore them, leave the decision open, or stop here.' },
  { id: 'none', label: 'Nothing in particular right now', ack: 'No topic needs to become a task today. You can still choose what, if anything, you’d like to do next.' }
];

const nextChoices = [
  { id: 'begin', label: 'Begin the DLR journey', ack: 'You’d like to begin. Next, you can consider how you’d like to work; this records a preference without enrolling you or starting stage work.' },
  { id: 'support', label: 'Explore available support', ack: 'You’d like to explore support before deciding. Next, consider the ways to work through DLR; no one is contacted or booked here.' },
  { id: 'later', label: 'Return later', ack: 'You’d like to return later. An optional Starting Point can hold what you noticed for that visit; the app itself won’t save your responses.' },
  { id: 'not-now', label: 'Not now', ack: 'You’ve chosen not to continue now. You can finish here, with or without a takeaway; nothing more needs to be decided.' },
  { id: 'deciding', label: 'I’m still deciding', ack: 'You’re leaving the decision open. You can keep a Starting Point if it helps you think, without choosing a commitment today.' }
];

const pathways = [
  { id: 'self', label: 'Self-Guided DLR', detail: 'Work through materials yourself, with legitimate help when you need it.', ack: 'You’d prefer to work through materials yourself, with help when needed. Your optional Starting Point can keep that preference; you can change it later.' },
  { id: 'digital', label: 'Digital DLR', detail: 'Use a digital experience to work through the stages.', ack: 'You’d prefer a digital way to work through DLR. You can keep that preference in your Starting Point; this introduction doesn’t open the full program.' },
  { id: 'facilitated', label: 'Facilitated DLR', detail: 'Work through DLR with a facilitator who helps explain and guide.', ack: 'You’d prefer guidance from a facilitator. Your Starting Point can record that preference without booking anyone or committing you to a service.' },
  { id: 'hybrid', label: 'Hybrid / Supported DLR', detail: 'Combine independent work with support where it helps.', ack: 'You’d prefer independent work with support where it helps. You can keep that flexible starting preference in your optional takeaway.' },
  { id: 'undecided', label: 'I’d like to decide later', detail: 'Keep your options open.', ack: 'You’re keeping the ways to continue open. Your Starting Point can still preserve what you noticed without assigning you a pathway.' }
];

const stages = [
  'Understand How Your Household Runs', 'Identify Your Critical Accounts', 'Secure Your Passwords', 'Prepare Account Recovery', 'Prepare Devices, Email & Phone Access', 'Choose Your Trusted Person', 'Establish Scam & Fraud Safeguards', 'Create Your Emergency Access Plan', 'Test the Plan', 'Maintain the Plan'
];

function needsPathway(next) { return next === 'begin' || next === 'support'; }

// Reflections describe selected perceptions only; they never classify a household.
function openingReflection(state) {
  if (state.reflection === 'yes') return 'You’ve noticed an arrangement you feel good about. Keeping what works in view can be as useful as finding something to explore.';
  if (state.reflection === 'help') return 'You think someone would probably know where to begin with some help. Your Starting Point can keep that observation without asking you to work out the details today.';
  if (state.reflection === 'uncertain') return 'You’re unsure whether someone would know where to begin. Your Starting Point can hold that question without asking you to resolve it today.';
  if (state.reflection === 'explore') return 'You’d like to understand this example better. That interest can be a starting point without deciding what needs to change.';
  const householdReflections = {
    one: 'You’ve noticed that one person handles most responsibilities. You can keep that observation without drawing conclusions about how well things would carry on.',
    different: 'You’ve noticed that responsibilities are shared, with different knowledge between you. You can keep that pattern in view while leaving your example reflection private.',
    arrangements: 'You’ve noticed arrangements you value. A starting point can preserve what already works; it doesn’t need to identify a concern.',
    unsure: 'You’re unsure how things would work if someone became unavailable. You can keep that question without recording your private example reflection.'
  };
  return householdReflections[state.household] ?? 'Your household reflection stays private. You can still keep your selected interest or next step without recording the reflection itself.';
}

function nextDirection(state) {
  const interest = explorationChoices.find(item => item.id === state.exploration);
  const topic = interest && interest.id !== 'none' ? `your interest in ${interest.label.toLowerCase()}` : 'what you noticed';
  if (state.next === 'not-now') return 'You’ve chosen not to continue now. There is nothing more to decide here, and no conclusion about preparedness follows from this choice.';
  if (state.next === 'later') return `If you return, this bookmark can remind you of ${topic}. You can revisit DLR a little at a time, whenever you choose.`;
  if (state.next === 'deciding' || !state.next) return 'You can leave the decision open. These selections can be a reference if you want to think about it again; they do not commit you to more work.';
  const pathway = pathways.find(item => item.id === state.pathway);
  if (state.next === 'support') return pathway && pathway.id !== 'undecided'
    ? `You’d like to explore support, with ${pathway.label} as your starting preference. You can change how you work; no service is arranged here.`
    : 'You can explore self-guided, digital, facilitated, or supported ways to work before deciding. Each follows the same DLR standard; no service is arranged here.';
  return `If you begin DLR, you can bring ${topic} with you. The program preamble comes before Stage 1, Understand How Your Household Runs.`;
}

function returnNote(next) {
  return next === 'not-now'
    ? 'This address reopens the introduction. Responses are not saved between visits.'
    : 'You can revisit DLR gradually and reconsider your choices. This address reopens the introduction; it does not restore previous responses.';
}

function startingPoint(state) {
  const household = householdChoices.find(item => item.id === state.household);
  const example = examples.find(item => item.id === state.example);
  const reflection = reflectionChoices.find(item => item.id === state.reflection);
  const exploration = explorationChoices.find(item => item.id === state.exploration);
  const next = nextChoices.find(item => item.id === state.next);
  const pathway = needsPathway(state.next) ? pathways.find(item => item.id === state.pathway) : undefined;
  const observations = [];
  if (household && household.id !== 'private') observations.push(household.label);
  if (example && reflection) observations.push(`${example.label}: ${reflection.note}`);
  return {
    noticed: observations.join(' ') || 'I kept my household reflection private.',
    explore: !exploration || exploration.id === 'none' ? 'Nothing in particular right now.' : exploration.label,
    next: `${next?.label ?? 'I’m still deciding'}${pathway ? ` — ${pathway.label}` : ''}.`,
    opening: openingReflection(state),
    direction: nextDirection(state),
    returnNote: returnNote(state.next)
  };
}

function startingPointText(state, returnUrl) {
  const point = startingPoint(state);
  return `My DLR Starting Point\n\n${point.opening}\n\nSomething I noticed\n${point.noticed}\n\nSomething I might want to explore\n${point.explore}\n\nWhat I’d like to do next\n${point.next}\n${point.direction}\n\nHow I can return\n${returnUrl}\n${point.returnNote}\n\nA personal bookmark from this introduction. It is not a household assessment, a Digital Readiness Snapshot, or evidence of Stage 1 completion or household readiness.`;
}
globalThis.DLRContent = { parts, householdChoices, examples, reflectionChoices, explorationChoices, nextChoices, pathways, stages, needsPathway, startingPoint, startingPointText };
})();
