# Wireframe — `/connect`

**Specification source:** [`EXPERIENCE_FLOW.md`](../design/EXPERIENCE_FLOW.md) §11 · ADR-014

---

## 1. Purpose

Tell a reader who is ready to act what to bring, when, and what to expect back.

**A professional card, not a contact form.** The site is not collecting submissions; it is starting engineering conversations. ADR-014 established this route because the ledger split revealed an unserved question: the competency thesis says what this person *can* do and nothing about what they *want brought to them*. Capability is not appetite.

## 2. Audience

Collaborator, primarily — founders, early-stage teams, open-source contributors, prospective clients, conference organisers. Recruiter secondarily, for availability and timezone.

## 3. Narrative goal

**Entering:** intent — the reader has decided to make contact and is deciding what to say.
**Leaving:** a specific proposal rather than a general enquiry.
**Exit action:** an email that arrives already scoped.

Density `default`.

---

## 4. Mobile — 375 px

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│ H1  Connect                           │
│                                       │
│ The most useful messages arrive with  │  ← PHILOSOPHY
│ a specific problem attached. You do   │    short, 3–4 lines
│ not need a formal brief — one         │    sets the shape of
│ paragraph about what is hard is       │    a good approach
│ enough to start.                      │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Currently                         │  ← CURRENT FOCUS
│                                       │    the one surface
│ ‹OWNER: 2–3 lines — what is being     │    with a months-
│  worked on now. Reviewed whenever a   │    scale shelf life
│  case study is added›                 │
│                                       │
│ H2  Open to                           │  ← AVAILABILITY
│                                       │
│ ▸ Senior and staff engineering roles  │
│ ▸ Collaboration on AI infrastructure  │
│   and agent systems                   │
│ ▸ Speaking about AI-native            │
│   engineering practice                │
│                                       │
│ H2  Less useful                       │
│                                       │
│ ▸ Recruiter outreach with no role     │
│   attached                            │
│ ▸ Unpaid technical evaluations        │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Where to reach me                 │  ← CHANNELS
│                                       │
│ Email                                 │
│ jigargajjarcad@gmail.com              │  ← plaintext, selectable
│ ‹Send an email {mailto}›              │    + mailto link
│                                       │
│ ‹GitHub {arrow-up-right}›             │
│ ‹LinkedIn {arrow-up-right}›           │
│ ‹Résumé {arrow-right}›                │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  What to expect back               │  ← RESPONSE
│                                       │
│ Timezone   ‹OWNER: e.g. GMT / IST›    │
│ Response   Within a few days. If      │
│            something is time-bound,   │
│            say so in the subject.     │
│                                       │
│ I read everything. I do not reply to  │
│ messages with no specific ask.        │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **No form, at any breakpoint.** A form requires a third party or a server, both prohibited (`ARCHITECTURE.md` §10, §2), and it would add the site's only validation surface, only error states, and only spam vector — to replace an email link that works everywhere.

◇ **The address is selectable plaintext beside the `mailto:` link.** `mailto:` fails for readers without a configured mail client, which is a real share on shared and corporate machines. Resolves `INTERACTION.md` §16 open question 3.

◇ **"Less useful" is a real section, not a joke.** It is the clearest available signal of appetite, and it saves both sides time. Written plainly, without snark — `EXPERIENCE_PRINCIPLES.md` §3 refuses charm.

---

## 5. Tablet — 768 px

```
┌─────────────────────────────────────────────────────┐
│ H1  Connect                                          │
│ The most useful messages arrive with a specific      │
│ problem attached.                                    │
├─────────────────────────────────────────────────────┤
│ H2 Currently ──────────  H2 Open to ──────────       │  ← two columns
│ ‹OWNER›                  ▸ roles                     │
│                          ▸ collaboration             │
│                          ▸ speaking                  │
│                          H2 Less useful              │
│                          ▸ ...                       │
├─────────────────────────────────────────────────────┤
│ H2 Where to reach me ───  H2 What to expect back ──  │
│ email / GitHub / LinkedIn Timezone / Response        │
└─────────────────────────────────────────────────────┘
```

◇ **Two columns pair the question with its answer** — what to bring beside what is open, channels beside response expectations. Reading order stays vertical within each column.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ ⟨--container-wide⟩                                             │
│ H1  Connect                                                    │
│ The most useful messages arrive with a specific problem        │
│ attached. You do not need a formal brief — one paragraph       │
│ about what is hard is enough to start.                         │
│ ───────────────────────────────────────────────────────        │
├───────────────────────────────────────────────────────────────┤
│ ⟨--container-prose 68ch — the card does not sprawl⟩            │
│                                                                │
│   H2  Currently          H2  Open to                           │
│   ‹OWNER: 2–3 lines›     ▸ Senior and staff engineering roles  │
│                          ▸ AI infrastructure and agent systems │
│                          ▸ Speaking about AI-native practice   │
│                                                                │
│                          H2  Less useful                       │
│                          ▸ Outreach with no role attached      │
│                          ▸ Unpaid technical evaluations        │
│   ─────────────────────────────────────────────                │
│   H2  Where to reach me   H2  What to expect back              │
│   jigargajjarcad@…        Timezone  ‹OWNER›                    │
│   ‹Send an email›         Response  Within a few days          │
│   ‹GitHub ↗›                                                   │
│   ‹LinkedIn ↗›            I read everything. I do not reply    │
│   ‹Résumé →›              to messages with no specific ask.    │
├───────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└───────────────────────────────────────────────────────────────┘
```

◇ **Constrained to `--container-prose` even at desktop.** A business card that fills 1120 px stops reading as a card. This is the one page where the content is deliberately small and the restraint is the point.

◇ **The footer still carries the contact affordance.** `/connect` does not replace it — a collaborator decides mid-case-study, and a route cannot reach that moment.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Philosophy, prose | Prose primitive | `ARCHITECTURE.md` §3 |
| Open to / Less useful | Semantic `<ul>` | `CONTENT_STRATEGY.md` §8 — enumerable, parallel, unordered |
| Email, profile links | Link; outbound `{arrow-up-right}` | `COMPONENT_GUIDELINES.md` §2.1 |
| Timezone / Response pairs | Definition list `<dl>` | Semantic HTML |
| Footer | Footer | §3.3 |

**No new components.** No form, no scheduling embed, no availability widget.

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| Philosophy | Frames a good approach |
| Currently | Supports C7 |
| Open to / Less useful | **C7 — what kind of problem should I bring them** |
| Where to reach me | C9 · R5 |
| What to expect back | **C8 — will they reply, and how soon** · R4 timezone |

C7 and C8 are answered nowhere else on the site. That is the route's justification.

## 9. Design rationale

**Bullets are correct here and almost nowhere else.** `CONTENT_STRATEGY.md` §8 permits them when items are genuinely parallel, enumerable, and scanned rather than read. "Open to" is exactly that. The philosophy paragraph above them is prose because it carries reasoning.

**Response expectations are stated, including the negative.** "I do not reply to messages with no specific ask" is the sentence that makes the rest credible — a page promising a reply to everything is promising something nobody honours.

**Availability is stated as categories, not as a yes/no.** "Open to senior roles" and "open to collaboration" are different answers, and a founder needs the second one.

## 10. What was deliberately removed

- **Contact form** — `INTERACTION.md` §12; requires a third party or a server, adds the only validation surface and spam vector on the site
- **Scheduling embed** — a third-party request, prohibited by `ARCHITECTURE.md` §10
- **Social feed or latest-posts widget** — third party, and there are no posts
- **A "currently listening to / reading" block** — answers no ledger question
- **Response-time guarantees in hours** — a promise that will be broken
- **Portrait** — this is a card, not an introduction; `/about` owns the person

## 11. Accessibility

One `<h1>` ("Connect"). Five `<h2>` sections. Lists are real `<ul>`s; timezone and response are a `<dl>`. The email address is selectable text, not an image or an obfuscated script. Tab order: skip → header → nav → theme → mailto → GitHub → LinkedIn → Résumé → footer. Two-column layouts at tablet and desktop preserve DOM order.

## 12. Open questions

None blocking. `‹OWNER›` slots for current focus and timezone are content, not structure — and current focus is the item flagged in ADR-014 as decaying on a months-scale.
