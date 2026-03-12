# Stack Skills

5 cognitive firewalls that defend against specific reasoning failures.

## Skills

- **adversarial-review** -- Devil's Advocate stress-testing. Steel-mans, then attacks via 3 vectors (logical soundness, edge cases, structural integrity). Use before merging significant PRs or committing to architecture decisions.
- **creativity-sampler** -- Probability-weighted option generator. Produces 5 alternatives across a typicality spectrum (conventional to wild card) and exposes hidden assumptions. Use at decision points when you catch yourself defaulting to the obvious answer.
- **cross-verified-research** -- Source-traced research with anti-hallucination safeguards. Every claim must be cross-verified by 2+ independent sources with S/A/B/C tier grading. Use when accuracy matters more than speed.
- **pre-mortem** -- Prospective failure analysis. Assumes complete failure, works backward through 5 categories (technical, organizational, external, temporal, assumption) to surface risks with leading indicators and circuit breakers. Use before committing to plans or irreversible decisions.
- **reasoning-tracer** -- Makes reasoning chains auditable. Forces assumption inventories, decision branching, confidence decomposition, and weakest-link identification. Use when the user needs to see WHY a conclusion was reached.

## Recommended Chains

- **Tech Decision**: creativity-sampler -> cross-verified-research -> adversarial-review
- **Architecture Review**: reasoning-tracer -> adversarial-review
- **Project Kickoff**: pre-mortem -> creativity-sampler (for mitigations)
