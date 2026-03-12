---
name: investor-outreach
description: "Cold emails, warm intros, follow-ups, and investor communications for fundraising. Use in any maestro phase when drafting investor-facing outreach messages."
user-invocable: true
---

# Investor Outreach

Write investor communication that is short, personalized, and easy to act on.

## Maestro Integration

**Lifecycle**: cross-cutting
**Activates when**: new-track detects relevant tech in tech-stack.md, or implement encounters matching task types.

### Phase Guidance
**In cross-cutting**: Apply investor communication patterns for outreach. Personalize per investor profile, maintain concise and credible tone.

### Related Skills
- investor-materials
- market-research
- article-writing

## Core Rules

1. Personalize every outbound message.
2. Keep the ask low-friction.
3. Use proof, not adjectives.
4. Stay concise.
5. Never send generic copy that could go to any investor.

## Cold Email Structure

1. subject line: short and specific
2. opener: why this investor specifically
3. pitch: what the company does, why now, what proof matters
4. ask: one concrete next step
5. sign-off: name, role, one credibility anchor if needed

## Personalization Sources

Reference one or more of:
- relevant portfolio companies
- a public thesis, talk, post, or article
- a mutual connection
- a clear market or product fit with the investor's focus

If that context is missing, ask for it or state that the draft is a template awaiting personalization.

## Follow-Up Cadence

Default:
- day 0: initial outbound
- day 4-5: short follow-up with one new data point
- day 10-12: final follow-up with a clean close

Do not keep nudging after that unless the user wants a longer sequence.

## Warm Intro Requests

Make life easy for the connector:
- explain why the intro is a fit
- include a forwardable blurb
- keep the forwardable blurb under 100 words

## Post-Meeting Updates

Include:
- the specific thing discussed
- the answer or update promised
- one new proof point if available
- the next step

## Quality Gate

Before delivering:
- message is personalized
- the ask is explicit
- there is no fluff or begging language
- the proof point is concrete
- word count stays tight

---
## Relationship to Maestro Workflow
- `/new-track` -- Detects this skill during Step 9.5 (skill matching)
- `/implement` -- Loads this skill's guidance during task execution
- `/review` -- Uses checklists as review criteria
