# Motion

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §9 · ADR-011 · [`FOUNDATION.md`](../FOUNDATION.md) §8

`ARCHITECTURE.md` §9 and ADR-011 are frozen and define the motion policy. This document does not restate them as decisions — it takes them as given and specifies the values, curves, and behaviours that implementation needs, plus the design-level reasoning behind each.

Motion is the element most likely to make this site worse. It is also the element that, done with restraint, most reliably signals craft. The system resolves that tension by making motion a closed set with a stated purpose per pattern.

---

## 1. Interaction philosophy

**Motion communicates hierarchy and intent. It never decorates.**

Three purposes are sanctioned (`ARCHITECTURE.md` §9). Every animation in the system maps to exactly one:

| Purpose | What it tells the reader | Pattern |
|---|---|---|
| Orientation | New content has arrived and here is where it sits | Entrance reveal (§5) |
| Confirmation | Your input registered | Interaction feedback (§6) |
| ~~Continuity~~ | ~~This is the same object, in a new state~~ | Shared continuity — **removed by ADR-018** (§7) |

A fourth purpose — *focus* — is handled separately because it is not really animation: the focus indicator must appear instantly and merely settles (§6.3).

**The governing test.** Before any animation ships: *what does this help the reader understand?* If the answer requires more than one sentence, or contains the word "feel," it fails.

**The corollary that matters most.** Motion is a supplement to a state change that has already happened, never the mechanism by which it happens. Content is never invisible pending an animation. If script fails, if the reader has reduced motion enabled, if the animation is interrupted mid-flight — the interface is in its correct final state, immediately. This is what `ARCHITECTURE.md` §2 means by progressive enhancement applied to motion, and it is verified in CI rather than assumed.

---

## 2. Duration tokens

Frozen in `ARCHITECTURE.md` §9. Four values, no additions without an ADR.

| Token | Duration | Applied to |
|---|---|---|
| `--duration-instant` | 100 ms | Press feedback, focus ring settle |
| `--duration-fast` | 160 ms | Hover, small state changes |
| `--duration-base` | 240 ms | Standard transitions |
| `--duration-entrance` | 400 ms | Content reveal on scroll |

**Why these four and not a continuous range.** A closed set makes motion consistent by construction. With an open range, each component picks a duration that feels right in isolation, and the aggregate reads as unsystematic even though each choice was reasonable. Four values cover every sanctioned pattern, and the gaps between them are large enough to be perceptible — a distinction a reader cannot perceive is not worth encoding.

**Why nothing exceeds 400 ms.** Above roughly 400 ms an animation stops reading as responsiveness and starts reading as latency. On repeat exposure — and every reader scrolling a case study sees many entrance reveals — anything slower becomes an obstacle between the reader and the content.

**Why 100 ms for press.** Below about 100 ms a transition is not perceived as motion, which is correct for press feedback: the reader should perceive the *result*, not a journey to it.

---

## 3. Easing tokens

Three curves. Frozen in principle by `ARCHITECTURE.md` §9 ("a standard emphasized curve for most transitions, a decelerating curve for entrances, an accelerating curve for exits"); the specific values are specified here.

| Token | Curve | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default. Hover, press, state changes |
| `--ease-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Entrances. Element arriving and coming to rest |
| `--ease-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Exits. Element leaving |

**Why these shapes.**

*Standard* starts quickly and decelerates hard into its endpoint. The early speed makes the interface feel responsive; the long tail makes the arrival feel settled rather than abrupt. It is emphasized — the deceleration is more pronounced than a symmetric ease — because a symmetric curve reads as mechanical.

*Decelerate* begins with almost no acceleration phase, as though the element were already in motion before it entered view. This is correct for entrances: the reader is not watching something start, they are watching something arrive.

*Accelerate* is the mirror. An element leaving should not linger — it should commit and be gone, so attention returns to what remains.

**No linear easing on anything a reader perceives as physical** (`ARCHITECTURE.md` §9). Linear motion has no analogue in the physical world and reads as machine-driven. The one permitted exception is a pure opacity cross-fade with no transform component, which is not perceived as physical movement.

**Springs are not used.** Spring physics produce genuinely better continuity animation, and they are declined for two reasons independent of any implementation: a spring has no fixed duration, which makes the 400 ms ceiling unenforceable and untestable; and its overshoot reads as playful, which is the wrong register for `VISUAL_LANGUAGE.md` §1. Under ADR-018 they are also unavailable, since no animation library is a dependency. If a future pattern genuinely needs continuity that duration-based easing cannot express, that is an ADR.

---

## 4. Permitted properties

**`transform` and `opacity` only** (`ARCHITECTURE.md` §9).

Both are compositor-driven: they can be animated on the GPU without triggering layout or paint. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` forces layout on every frame, which on the reference device — a mid-tier phone (`ARCHITECTURE.md` §10) — is the difference between motion that is free and motion that drops frames.

`color`, `background-color`, and `border-color` transitions are permitted **only** at `--duration-fast` or `--duration-instant` on interaction states. These trigger paint but not layout, and at 160 ms over a small area the cost is negligible. They are the mechanism for hover and press feedback (§6), which would otherwise have to move things — and moving things on hover is worse.

**Prohibited outright**, per `ARCHITECTURE.md` §9: scroll-jacking of any kind, parallax on text, cursor followers and custom cursors, staggered reveals beyond four elements, animation on page load that delays content, autoplaying video, any animation exceeding 400 ms, and any animation that must complete before content is readable.

---

## 5. Entrance reveal

The only scroll-triggered pattern in the system.

| Property | Value |
|---|---|
| Opacity | 0 → 1 |
| Transform | `translateY(16px)` → `translateY(0)` |
| Duration | `--duration-entrance` (400 ms) |
| Easing | `--ease-decelerate` |
| Trigger | 20% of the element's height intersecting the viewport |
| Repeat | Never. Fires once per element per page load |

**Constraints.**

- **Never applied above the fold.** Content in the initial viewport is visible immediately, at full opacity, with no transform. Animating it would delay the reader's first contact with the claim and would jeopardise the LCP budget.
- **Applied to blocks, not to text runs.** A section, a card, a figure, a table. Never a paragraph, never a heading in isolation, never a list item.
- **Never applied to more than four elements in one group** — see stagger, below.
- **The element renders visible without JavaScript.** The animated state is applied by script; the default state in markup is the final state. An element whose CSS sets `opacity: 0` and relies on script to reveal it is a defect, because a script failure makes content permanently invisible.

**Why 16 px and not more.** The translate exists to give the eye a direction of arrival, not to be noticed as movement. Above roughly 24 px the motion becomes the subject; below about 8 px it is imperceptible and the transform is wasted work. 16 px is enough to register subliminally.

**Why once, never re-firing.** Re-triggering on scroll-up turns a reading surface into an attention-demanding one. A reader scrolling back to re-read a paragraph should find it exactly as they left it.

### Stagger

| Property | Value |
|---|---|
| Maximum elements | 4 (`ARCHITECTURE.md` §9) |
| Interval | 60 ms |
| Total sequence | 400 + (3 × 60) = 580 ms |

**Note on the 400 ms ceiling.** `ARCHITECTURE.md` §9 prohibits "any animation exceeding 400 ms." Each element's animation is 400 ms; the *sequence* of four staggered elements resolves at 580 ms. This is read as compliant — the ceiling governs a single animation — but the interpretation is recorded here so it is visible rather than assumed. The sequence is separately capped at 600 ms.

**Why 60 ms.** Below roughly 40 ms the stagger is imperceptible and the group reads as simultaneous, making the mechanism pointless. Above about 90 ms the reader perceives elements arriving individually and begins waiting for the last one. 60 ms produces a group that reads as one gesture with internal order.

**Why four.** Beyond four staggered elements the last arrival is late enough that a reader scrolling at normal speed has already moved past it — so the animation plays to nobody, having cost frames. Groups larger than four animate as a single unit with no stagger.

---

## 6. Interaction feedback

### 6.1 Hover

| Property | Value |
|---|---|
| Duration | `--duration-fast` (160 ms) |
| Easing | `--ease-standard` |
| Permitted changes | `color`, `border-color`, `background-color`, `translateY` ≤ 2 px |

**Hover is gated behind `@media (hover: hover) and (pointer: fine)`.** Touch devices emulate hover on tap, producing a state that sticks after the finger lifts — an element that appears permanently hovered. Gating removes the class of bug entirely rather than working around it.

**Hover never reveals information.** Anything a reader needs must be present without hovering. Hover is confirmation that an element is interactive, never a disclosure mechanism — it is unavailable to touch users, to keyboard users, and to anyone using a screen reader.

**Never scale text-bearing elements on hover.** A scale transform on text resamples glyphs and produces a brief blur that reads as low quality. The 2 px translate is the only positional hover change permitted, and it is reserved for cards.

**Hover transitions in but not out at the same speed.** Entering uses `--duration-fast`; leaving uses `--duration-instant`. A hover state that lingers after the pointer has left reads as lag.

### 6.2 Press

| Property | Value |
|---|---|
| Duration | `--duration-instant` (100 ms) |
| Easing | `--ease-standard` |
| Permitted changes | `background-color`, `border-color`, `scale(0.99)` on buttons only |

Press feedback must be perceptible on touch, where there is no hover state to precede it. It is the only confirmation a touch reader gets that a tap landed.

### 6.3 Focus

| Property | Value |
|---|---|
| Appearance | Instant. No transition on appearance |
| Settle | `--duration-instant` on the ring's own properties only |

**The focus indicator never animates in.** A keyboard reader moving quickly through a page must see the indicator at the moment the key is released. A 160 ms fade-in means the indicator is not fully visible until after a fast reader has pressed Tab again, which makes rapid keyboard navigation feel unreliable.

Full focus indicator specification: `ACCESSIBILITY.md` §4.

---

## 7. Shared continuity — removed

**This pattern was removed by ADR-018.** It is not available and must not be reintroduced without a new decision record.

It was specified because `ARCHITECTURE.md` §9 sanctioned it, not because a use case had been identified, and this section committed in advance to its own removal: "If Phase 3 completes without consuming it, it should be removed from the system rather than kept for a hypothetical." Phase 3 completed and phases 4 through 6 identified no consumer.

Layout animation between two states of the same element is also the one sanctioned pattern that raw CSS cannot do well, so it was the pattern carrying the cost of an animation library on its own. Removing an unused pattern rather than paying 35 KB to keep it available is the trade ADR-018 makes.

**If future work genuinely needs it**, that is a new ADR stating the consumer, measuring the mechanism against the budget of the day, and saying what is given up in exchange.

---

## 8. Page transitions

**Not adopted.**

`ARCHITECTURE.md` §9 defines a closed set of four sanctioned patterns and states that nothing else ships without an ADR. Page transitions are not in that set. This section records the decision rather than leaving the absence unexplained.

**Why declined.**

*They delay content.* A cross-fade or slide between routes puts an animation between the reader's click and the content they asked for. On a site where a hiring manager may open three case studies in five minutes, that cost is paid repeatedly for no informational gain.

*They conflict with the performance budget.* A view transition requires the outgoing document to remain rendered while the incoming one paints, which affects the measured LCP of the incoming route — the metric with the tightest budget in `ARCHITECTURE.md` §10.

*They require JavaScript to be meaningful.* The site is statically rendered and fully functional without script (`ARCHITECTURE.md` §2). A transition system that only works when script has loaded produces two different navigation experiences, and the one without script is the one a first-time reader on a slow connection gets.

*There is no continuity to express.* Page transitions earn their cost in applications where a reader's mental model spans routes. Here, each route is a separate document. Fading between two unrelated documents communicates nothing.

**What would have to be true to reconsider.** A measured demonstration that a transition improves comprehension of the relationship between two routes, plus evidence that the LCP budget holds on the reference device profile, plus a no-script path that is not degraded. That is an ADR (`ARCHITECTURE.md` §9), not a design decision.

---

## 9. Reduced motion

**A first-class path, not a degradation** (`ARCHITECTURE.md` §9).

Under `prefers-reduced-motion: reduce`:

| Pattern | Reduced-motion behaviour |
|---|---|
| Entrance reveal | Transform removed entirely. Opacity 0 → 1 at `--duration-fast`, or no transition at all |
| Hover | Colour transitions retained at `--duration-instant`. No transform |
| Press | Colour change retained, instant. No scale |
| Focus | Unchanged — it was already instant |
| Shared continuity | Removed. State change is instant |
| Stagger | Removed. All elements resolve simultaneously |

**Reduced motion is not "the same animation, faster."** A shortened transform animation is still a transform animation, and vestibular triggers are movement, not duration. The transform is removed, not accelerated.

**Colour transitions are retained** because they involve no movement and are not a vestibular trigger. Removing them would strip interaction feedback from readers who need reduced motion, which makes the interface worse for them rather than safer.

**The reduced-motion path is tested in CI** (`ARCHITECTURE.md` §11, §12), not assumed. The test asserts that no transform-based animation is applied under the media query — this is the class of regression that is invisible to a developer who does not have the setting enabled.

**The global mechanism** is a single `prefers-reduced-motion: reduce` block in the base stylesheet, which removes transform-based transitions everywhere so a component author cannot forget. Per-component handling is a supplement, never the primary mechanism, because it relies on every author remembering.

---

## 10. Bundle discipline

From `ARCHITECTURE.md` §9, restated because it constrains design:

- No animation library is a dependency (ADR-018). Entrance reveal uses one `IntersectionObserver` and a CSS transition; every other pattern is CSS only.
- Motion components live under `components/motion/` as client leaves and are the **only** sanctioned animation surface. A component elsewhere importing the animation library directly is a defect.
- Animated content renders visible without JavaScript.

**The design consequence:** any pattern that cannot be expressed by the small set of motion primitives under `components/motion/` is not available. This is a deliberate constraint on design, not just on implementation — it means a new motion idea requires a new primitive, which requires justification, which is the friction that keeps the set closed.

---

## 11. Maintenance implications

- **The four-duration, three-easing set will be under pressure.** The request will be for "just a slightly slower one for this." Each addition halves the perceptibility of the distinctions between existing tokens. Additions require an ADR.
- **Springs are unavailable and remain declined on their own merits.** If they are ever adopted, it requires both a library (ADR-018) and a rework of the 400 ms ceiling and its CI assertion, because springs have no duration to assert against.
- **The reduced-motion CI assertion is the load-bearing test.** It is the only thing preventing a well-intentioned transform from being added to a component and shipping unnoticed.
- ~~**If shared continuity (§7) is unused at the end of Phase 3, remove it.**~~ Done — removed by ADR-018. A sanctioned pattern with no consumer is a pattern that will eventually be used badly because it was available.

---

## 12. User experience implications

- A reader with vestibular sensitivity gets an interface with no movement at all, that still confirms their interactions.
- A reader on a mid-tier phone gets animation that costs no frames, because nothing animates a layout property.
- A reader scrolling quickly through a case study is never waiting for content to become visible, because content is visible by default and the animation is a supplement.
- A keyboard reader sees the focus indicator instantly at every step, because it is the one thing in the system that does not ease.
- A reader who clicks between three case studies gets each one immediately, because there is no transition between them.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. Page transitions declined; recorded in §8. |
