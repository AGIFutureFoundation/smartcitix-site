# SmartCiti.X — Trade Craft Academy (smartciti.x.agifuturefoundation.org)

Static site for **SmartCiti.X** — gamified training to enhance robotic and
human integrations. The Trade Craft Academy: 111 union halls, quests, the
wilds worlds, and the Adaptive Stack (ACP protocol suite v3.2, 9,267 passing
checks). Powered by AGI Corp. Content reviewed from the
[SmartCiti.X](https://github.com/AGIFutureFoundation/SmartCiti.X) repository.

## Deploy
```bash
vercel          # preview deploy
vercel --prod   # production
```
Then add the custom domain (`smartciti.x.agifuturefoundation.org`) in the
Vercel dashboard (Settings → Domains). DNS is already pointing to Vercel at
Hostinger — it goes live instantly.

## Agent infrastructure
- Mail: `academy@agifuturefoundation.org` (catch-all → `x@agifuturefoundation.org`)
- x402 micropayments: implemented in Metropolis-SmartCiti on Monad
- ERC-8004 agent identity with Omega Steward governance

## TODO
- [ ] Fill in the academy overview video embed
- [ ] Replace `#` placeholders in footer social links with real profile URLs
