# Interaction

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §2, §9, §11 · [`MOTION.md`](./MOTION.md) · [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)

`MOTION.md` specifies how things animate. This document specifies how things **behave** — what an interaction means, what it promises, and what it must never do. Where a timing or curve is needed, `MOTION.md` is referenced rather than repeated. Where a conformance requirement applies, `ACCESSIBILITY.md` is referenced rather than restated.

---

## 1. Principles

**Every interaction has one meaning, used consistently.** Hover means "this is interactive." Focus means "your keyboard is here." Press means "your input landed." A property that means one thing in one place and something else in another is worse than an inconsistent visual style, because the reader has built a model and the interface has broken it.

**Input modality changes nothing about capability.** Pointer, keyboard, and touch reach the same functionality, in the same order, with the same feedback. There is no pointer-only affordance and no keyboard-only shortcut. This is not primarily an accessibility position — it is a consistency position that happens to satisfy the accessibility requirement.

**The interface never withholds.** Nothing is behind a hover, a long-press, a scroll position, or a disclosure. Progressive disclosure through interaction is prohibited for primary content (`ARCHITECTURE.md` §5), and the same reasoning applies to interaction generally: content a reader must discover is content most readers never see.

**Nothing happens that the reader did not ask for.** No autoplay, no auto-advance, no scroll hijacking, no content that arrives after the reader has started reading. The reader controls pacing completely.

**State is always legible without testing.** A reader should never have to click something to find out whether it was clickable, or hover to learn where they are. The affordance precedes the interaction.

---

## 2. Pointer and hover

Hover is a **hint**, never a mechanism. It confirms that something is interactive and does nothing else.

| Rule | Reason |
|---|---|
| Gated behind `@media (hover: hover) and (pointer: fine)` | Touch devices emulate hover on tap and leave elements stuck in the hovered state. Gating removes the bug class rather than patching it (`MOTION.md` §6.1) |
| **No hover delay, entering or leaving** | Delay exists to prevent accidental triggering of destructive or expensive actions. Nothing here is either. A delay on a purely visual state change reads as lag, and readers interpret lag as a slow site rather than as a considered timing |
| Hover never reveals content or controls | Unavailable to touch, keyboard, and screen-reader users. A control that appears on hover does not exist for most of the audience |
| Hover never changes layout | A hover state that reflows makes targets move under the pointer. Permitted changes are colour, border, and a ≤ 2 px translate (`MOTION.md` §6.1) |
| Cursor is the platform default | `pointer` on links and buttons, `text` on text. Custom cursors are prohibited (`ARCHITECTURE.md` §9). The cursor is a system affordance and readers rely on it |

**Why there is no hover intent detection.** Hover-intent — a short delay to distinguish deliberate hover from a pointer passing through — is correct for menus that open on hover. This site has no such menu, so the delay would cost responsiveness and buy nothing.

---

## 3. Focus

Focus behaviour is specified in full in `ACCESSIBILITY.md` §4. The behavioural rules that follow from it:

- **Focus is never moved without the reader's action**, except on overlay open and close, where it is moved deliberately and returned to the trigger.
- **Focus is never trapped**, except inside the mobile navigation overlay while it is open — which is a requirement, not an exception, because a modal surface that leaks focus to the page behind it is disorienting.
- **Focus order follows visual order.** Where they diverge, the layout is wrong, not the tab order.
- **The focus indicator appears instantly** (`MOTION.md` §6.3). It is the one element in the system that never eases.
- **Skip link first, always.** The first focusable element on every page, visually hidden until focused.

**Why keyboard navigation mirrors pointer behaviour rather than adding shortcuts.** A command palette or single-key navigation would be enjoyable to build and would signal technical taste to the one audience most likely to try it. It is declined: shortcuts are undiscoverable without a help surface, they collide with screen-reader and browser bindings, and they optimise repeat navigation on a site with eight routes that nobody visits twice in a session. The keyboard path is the pointer path, and its quality comes from being complete rather than from being fast.

---

## 4. Touch

- **Minimum target 44 × 44 px** including padding, exceeding the WCAG 2.2 minimum of 24 × 24 (`COMPONENT_GUIDELINES.md` §2.2). The reference device is a phone.
- **Minimum 8 px between adjacent targets**, so a mis-tap is a miss rather than a wrong action.
- **Press feedback is mandatory on touch** (`MOTION.md` §6.2). It is the only confirmation a touch reader receives that a tap landed, since there is no hover state preceding it.
- **No gestures.** No swipe navigation, no pull-to-refresh, no long-press menus. Gestures are undiscoverable, conflict with platform and assistive-technology gestures, and every one of them here would duplicate a visible control.
- **No tap-to-zoom suppression.** Pinch zoom is never disabled — it is a primary accessibility affordance and disabling it is a conformance failure.

---

## 5. Scrolling

- **Native scrolling only.** No smooth-scroll library, no scroll-linked animation beyond the entrance reveal (`MOTION.md` §5), no scroll-jacking of any kind (`ARCHITECTURE.md` §9).
- **The page never scrolls horizontally.** Wide content — tables, code blocks, diagrams — scrolls inside its own container, and that container is focusable so a keyboard reader can reach and scroll it.
- **Scroll position is never manipulated**, except by anchor navigation, which uses `scroll-margin-top` so a target heading is not flush against the viewport edge.
- **Scroll anchoring is left enabled**, so that content loading above the reader's position does not shift what they are reading. On a static site this should never trigger; leaving it enabled costs nothing and guards against a class of regression.
- **No scroll-to-top control.** It is a solution to pages that are too long to navigate, and the correct fix is the heading structure and the footer.

---

## 6. Navigation

- **Every navigation is a real link with a real URL.** No JavaScript-driven route changes that bypass the address bar, no history manipulation. A reader can bookmark, share, open in a new tab, and use the back button, always.
- **No page transitions** (`MOTION.md` §8). The decision and its full reasoning are recorded there.
- **The current route is marked by two channels** — weight and `aria-current` (`COMPONENT_GUIDELINES.md` §3.1). Never by colour alone.
- **Links do not open in new tabs.** Whether to leave the page is the reader's decision, and forcing it removes their back button. Outbound links are marked with an icon and announced as external, which is the honest version of the same information.
- **The header is not sticky** (`COMPONENT_GUIDELINES.md` §3.1) — it consumes vertical space on the surface where vertical space matters most, and a sticky element is the most common cause of focus being obscured (WCAG 2.2, 2.4.11).
- **Back always works and always returns to the reader's scroll position.** This is the only navigation guarantee that matters and it is free on a statically rendered site — which is one of the reasons the site is statically rendered.

---

## 7. Loading

**There are no loading states, because there is nothing to load.**

Every route is statically generated with no request-time rendering and no client-side data fetching on initial render (`ARCHITECTURE.md` §2). A route arrives complete or it does not arrive.

**Why no skeleton screens.** Skeletons are a technique for masking latency in a data-fetching interface. Introducing them here would mean building a fake pending state for content that is already present in the HTML — adding JavaScript, adding layout risk, and simulating a problem the architecture removed. A skeleton on a static page is a costume.

**Why no progress indicators on navigation.** A spinner or top-loading bar tells the reader their click registered. On a static site served from an edge CDN with a TTFB budget of 200 ms (`ARCHITECTURE.md` §10), the indicator would appear and disappear faster than it could be perceived, and the flash is worse than nothing.

**The one genuine latency case: the reader is on a slow connection and the next document has not arrived.** The browser's native loading indication handles this. It is familiar, it is not something we can improve on, and replacing it costs bytes.

**Images load lazily below the fold** (`ARCHITECTURE.md` §7), with explicit dimensions so the space is reserved and nothing shifts. There is no fade-in on image load — a fade draws attention to the fact that something arrived late, which is the opposite of what is wanted.

---

## 8. Empty states

**The site has almost no empty states, and that is a design property rather than an oversight.** There are no user-generated collections, no filters, no queries. Content either exists at build time or the route does not exist.

The three that do exist:

| State | Behaviour |
|---|---|
| **404** | A real page with the site's full layout. States plainly that the page does not exist and offers `/` and `/work`. No humour, no illustration, no "lost in space" — a reader who hit a broken link is mildly annoyed and wants the exit, not a joke |
| **Draft case study** | Not rendered at all. `visibility: draft` excludes it from the build and the sitemap (`ARCHITECTURE.md` §6.3). There is no "coming soon" placeholder — an unfinished case study advertised as forthcoming is a promise with no delivery date |
| **A case study with no source link** | The link is absent, not disabled. A restricted-disclosure project shows no source affordance and the reason is stated in the case-study text (`FOUNDATION.md` §10) |

**The governing rule: absence is expressed by absence.** A disabled control, a greyed-out link, or a placeholder tells the reader something exists that they cannot reach, which invites a question the interface cannot answer.

---

## 9. Error states

Errors on a static site are limited to two classes.

**Route not found** — the 404 above.

**A client enhancement failed** — the copy control, the theme control, or the mobile navigation did not initialise. In every case the failure mode is *the enhancement is absent*, never *the interface is broken*:

- Copy fails to initialise → the control is not rendered. The code is still selectable and copyable by hand.
- Theme control fails → the site follows `prefers-color-scheme`, which is the correct default anyway.
- Mobile navigation fails → the navigation renders as a plain visible list. It is markup first, disclosure second.

**No error toasts, no error boundaries with apology copy, no retry affordances.** These are patterns from applications with server dependencies. Here they would be dead code that a reader could never trigger, and dead code in an interface is a maintenance liability with no consumer.

**The copy control is the single exception where an error is user-visible:** if the clipboard write is rejected by the browser, the control reports failure in text rather than silently doing nothing. A control that appears to succeed and did not is worse than one that admits failure.

---

## 10. Feedback and micro-interactions

**Success feedback is stated, not celebrated.** The copy control swaps its icon to `check` and announces the result in a live region (`COMPONENT_GUIDELINES.md` §8.3). It reverts after two seconds. No toast, no colour flash, no sound, no animation beyond the swap.

**What qualifies as a micro-interaction here.** Exactly four, and they are the four sanctioned motion patterns applied to controls (`MOTION.md` §1): hover confirmation, press confirmation, focus appearance, and the copy state swap. Nothing else. A micro-interaction that does not confirm an input is decoration with a technical-sounding name.

**Rules.**

- Feedback is immediate. Anything above 100 ms between input and acknowledgement is perceived as unresponsiveness (`MOTION.md` §2).
- Feedback never blocks. A reader can act again immediately; nothing waits for an animation to complete.
- State changes that matter to assistive technology are announced, not only shown. The live region is used once, for copy, and nowhere else — a page that announces frequently is a page screen-reader users leave.
- No haptics. They are unavailable on the primary platforms and inconsistent where available.

---

## 11. Specific controls

Behaviour only. Structure and states are in `COMPONENT_GUIDELINES.md`.

**Links.** Underlined in prose, always (`COMPONENT_GUIDELINES.md` §2.1) — the underline is the affordance and the colour is reinforcement. Navigation and card links are not underlined because position and container supply the affordance. Whole-card links have one accessible name; a card with three links inside it produces a link list full of "Read more."

**Buttons.** A control that navigates is a link; a control that acts is a button. Semantics follow behaviour, never appearance. Disabled buttons are not rendered (`COMPONENT_GUIDELINES.md` §1) — a control a reader cannot use and cannot understand the reason for is worse than its absence.

**Cards.** The entire card is the target, not the title. Hover lifts 2 px and strengthens the border; focus rings the card's outer boundary. The card never expands, never previews, never flips.

**Theme control.** A three-state control — light, dark, system (`COLOR_SYSTEM.md` §8). Implemented as a menu button: the trigger is icon-only, which is one of the four sanctioned icon-only controls (`ICONOGRAPHY.md` §6), and each option inside the menu carries a visible text label. A two-state toggle is declined because it strands a reader who has chosen once with no route back to the system default. The choice persists locally and applies before first paint, so there is no flash.

**Mobile navigation.** Opens on tap, traps focus, closes on the close control, `Escape`, or scrim tap, and returns focus to the trigger. Page scroll is locked while open. It is the only floating surface in the system.

---

## 12. Forms

**The site has no forms.** No contact form, no newsletter, no search input. Contact is a `mailto:` link and the profile links, carried in the footer on every route and expanded at `/connect` (ADR-014). `/connect` is a page of prose and links — availability, current focus, what to bring, response expectations — not an input surface.

**Why no contact form.** It would require either a third-party service — prohibited by the zero-third-party constraint (`ARCHITECTURE.md` §10) — or a server endpoint, which contradicts the static architecture (`ARCHITECTURE.md` §2). It would also add the site's only validation surface, its only error states, and its only spam vector, to replace an email link that works everywhere and that the reader can compose in their own client with their own signature.

**If a form is ever added**, these are the rules it inherits, recorded now so the decision is not made under pressure: labels are visible and persistent, never placeholders; validation is on blur and on submit, never on every keystroke; error messages are specific, adjacent to their field, and announced; required fields are marked in text; nothing is disabled pending validity, because a disabled submit button gives the reader no way to learn what is wrong.

---

## 13. Search

**Not present, and not in the frozen route set** (`ARCHITECTURE.md` §4).

Search solves a findability problem that four case studies and eight routes do not have. A client-side index would add JavaScript against a 120 KB budget; a server-side one contradicts the static architecture.

**The conditions under which it would be reconsidered:** the content set grows past roughly a dozen documents, *and* Tier 3 comprehension testing shows readers failing to find known content. Both, not either. Adding a route is an architecture change and requires amending `ARCHITECTURE.md` §4, which is frozen — so this would be an ADR, not a design decision.

---

## 14. Reduced motion

Specified in full in `MOTION.md` §9. The behavioural consequence: **under `prefers-reduced-motion: reduce`, every interaction still confirms itself.** Colour transitions are retained; transforms are removed, not shortened. A reader with reduced motion enabled gets the same feedback vocabulary, expressed without movement — not a stripped interface.

---

## 15. Anti-patterns

| Rejected | Why |
|---|---|
| Hover-revealed controls | Invisible to touch, keyboard, and screen readers |
| Custom cursors, cursor followers | Prohibited (`ARCHITECTURE.md` §9); break a system affordance |
| Command palette, keyboard shortcuts | Undiscoverable; collide with assistive bindings; optimise a problem eight routes do not have (§3) |
| Skeleton screens, spinners, progress bars | Simulate a latency the architecture removed (§7) |
| Toast notifications | No asynchronous events to report |
| Infinite scroll, "load more" | Four case studies |
| Scroll-triggered narrative, scroll-jacking | Prohibited; takes pacing from the reader |
| Auto-playing anything | The reader controls pacing completely |
| Confirmation dialogs | Nothing here is destructive |
| Tooltips as the only source of information | Unreachable by touch; the content belongs in the interface |
| `target="_blank"` | Removes the reader's back button (§6) |
| Disabled controls | Communicate that something exists and is unreachable (§8) |

---

## 16. Open questions

1. **Does the copy control's two-second revert window feel right?** Chosen by convention, not by evidence. Worth checking during manual verification; trivially adjustable.
2. **Should outbound links carry a visible icon in prose, or only in link lists?** An icon on every external reference in a dense case study may become visual noise. Undecidable until real prose exists.
3. ~~**Is `mailto:` sufficient as the only contact path?**~~ **Resolved 2026-08-04.** It is not — `mailto:` fails for readers without a configured mail client, a small but real share on shared and corporate machines. Both the footer and `/connect` carry the address as selectable plaintext alongside the `mailto:` link (ADR-014).

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |
