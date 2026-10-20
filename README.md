# DLR Companion — What Keeps Your Household Running?

A standalone, local Orientation prototype. The three governing Markdown references remain unchanged. The neighboring DLR application is not required or modified.

Version 0.2 refines only the existing acknowledgements and ending. Each selected response connects the observation to the next part of the experience. The Starting Point adds a short reflection and an optional direction based on explicit choices, including existing strengths, private reflection, returning later, uncertainty, and not continuing. Questions, choices, screens, styles, and memory-only state are preserved.

## Run

Requires Node.js 22 or later. No installation or build step is needed.

```sh
npm start
```

Open **http://127.0.0.1:4173**. Stop with Ctrl+C. To choose another port: `PORT=4174 npm start`.

You can also open `index.html` directly in a browser, including offline. No server is required for this option. Browser clipboard permissions may differ; the manual-copy fallback remains available.

## Use

Begin at Welcome, notice a household pattern, consider one example, explore safe preparedness and the journey, then choose a starting point. Some parts unfold over more than one page to keep one question in focus. Back preserves answers during this visit. Changing the example clears its former response so it cannot be applied to a different situation.

Selections use native radio buttons: Tab to the group, arrow keys to select, then Tab to Continue. Buttons and disclosures also work with the keyboard. Private reflection, optional topic skipping, undecided choices, and “Not now” are supported. Continuing with DLR and choosing a delivery preference are separate decisions. No program is started or support booked.

Creating **My DLR Starting Point** is optional. It brings a short opening reflection together with selected observations, an optional interest, the preferred next step, and what that direction could mean. These reflections appear on screen and in both export formats. Copy it, or choose Print / save as PDF using the browser’s print dialog. If clipboard access is unavailable, selectable text appears. The print layout contains only the takeaway. The return address reopens the introduction; it does not restore answers.

## Information handling

Answers exist only in JavaScript memory in the open page. Refreshing or closing loses them. There is no local/session storage, cookie, database, login, analytics, tracking, or third-party request. The local server only serves an allowlist of static assets and does not log requests or accept participant data. All fonts and artwork are local. The page’s content policy blocks network connections and form submissions.

Only predefined choices are offered; there are no fields for names, contact details, passwords, account numbers, recovery codes, or other secrets. Copying or printing creates a participant-controlled copy outside the app; use a destination you are comfortable with.

## Checks

```sh
npm run check
npm test
```

`check` verifies JavaScript syntax. The original five Node tests cover takeaway accuracy, private reflection, continuation changes, response mapping, and frozen stage names/order. Two focused v0.2 additions cover the opening reflections and all 180 combinations of next step, optional topic, and pathway, including export consistency and stale-preference exclusion. There is no compilation, TypeScript, lint dependency, or separate test framework.

Validation performed for v0.2: syntax check and all seven tests passed. Microsoft Edge direct-file checks exercised all 28 selection acknowledgements, all five continuation endings, Back retaining the selected response, finishing without a takeaway, and accurate strength-based takeaway content. Actual copied text and the one-page print preview both contained the new reflections. Desktop and 390px mobile layouts were inspected; the console showed zero messages. The original keyboard, refresh-reset, and ten-stage functionality remains unchanged. The managed environment previously rejected local HTTP listening (`EPERM`), so browser validation uses direct-file mode. No participant study or screen-reader audit has been performed.

## Boundaries

This is Orientation only. It introduces continuity, personal recognition, appropriate preparedness, all four universal safety ideas, the complete journey, and continuation choice. The program preamble and formal Stage 1 assessment remain separate. There are no readiness scores, household inventories, Digital Readiness Snapshots, or stage-completion claims.

The ten approved stages are available in an optional disclosure. The safety content also includes independent verification and legitimate routes/help, as required by the approved baseline but not spelled out in the brief’s four essential ideas. No conflicting baseline requirement was identified.

The restrained green/cream palette echoes the neighboring app; no framework, source components, or assessment logic were reused. The Sites skill’s local-only approach informed the dependency-free implementation. Accounts, persistence, backend services, AI, notifications, full stage workflows, and enrollment/support integrations are intentionally outside scope. The 10–15-minute estimate needs evaluation with participants; human comprehension and accessibility with assistive technology cannot be established by the code checks alone.
