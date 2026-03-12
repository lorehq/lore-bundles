# Stack Skills (Lore Bundle)

5 cognitive firewall skills for AI agents, packaged as a Lore bundle.

## Attribution

Originally created by [@thestack_ai](https://github.com/whynowlab) as [whynowlab/stack-skills](https://github.com/whynowlab/stack-skills). Licensed under MIT.

## What's Included

| Skill | Purpose |
|-------|---------|
| adversarial-review | Devil's Advocate stress-testing with 3-vector attack |
| creativity-sampler | Probability-weighted option generation that breaks anchoring bias |
| cross-verified-research | Source-traced research with anti-hallucination safeguards |
| pre-mortem | Prospective failure analysis using Gary Klein's technique |
| reasoning-tracer | Makes reasoning chains visible and auditable |

## What Changed from the Original

- Converted from Claude Code skill format to Lore bundle format
- Skill directories moved from `skills/` (lowercase) to `SKILLS/` (uppercase per Lore convention)
- Frontmatter cleaned: removed `triggers`, `argument-hint`, and `allowed-tools` (Claude Code-specific fields); added `user-invocable: true` (Lore standard)
- Descriptions cleaned: removed embedded trigger keyword lists
- Removed references to skills not included in this bundle (deep-dive-analyzer, skill-composer, orchestrator strategy team)
- Skill body content preserved as-is -- no rewrites
- Added `manifest.json` and `LORE.md` per Lore bundle standard

## License

MIT License. See the original repo for full license text.
