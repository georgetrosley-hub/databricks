# How I'd Build Pipeline and Expansion for Claude Enterprise

This project is a GTM artifact, not a product marketing exercise.

It is meant to show how I think about large enterprise Claude deals:
- how I would create a credible first wedge
- how I would build a champion path
- how I would design the initial pilot
- how I would handle security, procurement, and executive alignment
- how I would map the expansion motion after the first win

## What the artifact includes

- **Capture Plan** — The core account thesis, the first wedge, the pilot logic, and the competitive displacement plan
- **Stakeholder Map** — Who I would build with, where I would expect friction, and how I would multi-thread the deal
- **Deal Plan** — The sequence I would run: land, governance, exec alignment, commercial path, expansion
- **Deal Signals** — The working hypotheses I would pressure-test in discovery and deal execution
- **Field Kit** — The actual materials I would use to move the deal: executive briefs, meeting prep, emails, objection talk tracks, security responses, and battle cards

Today this is still a **prototype**. Some of the account logic is modeled from account metadata rather than pulled from real systems. The point is to show GTM judgment and operating style, with Claude used as an assistive layer for deal execution.

## What I'd build next

1. **Real account inputs** — Pull from Salesforce, call notes, security questionnaires, and meeting summaries so the hypotheses become source-backed.
2. **Better stakeholder memory** — Track real champions, blockers, and sponsor movement across time instead of deriving them from account profiles.
3. **Pilot and expansion proof** — Add explicit success criteria, owner tracking, and post-pilot expansion logic tied to live account activity.
4. **Production deployment** — Move away from local demo key handling and into a proper authenticated enterprise workflow.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Switch accounts (JPMorgan, Pfizer, Comcast, etc.) from the header to see how the capture plan, stakeholder map, deal plan, and field kit shift by account.

## Tech stack

Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts. Prototype-grade, mostly client-side.

---

Built by George Trosley. If you'd like to explore this further, I'd love to talk.
