---
title: "HerdLink"
date: "2026-07-10"
excerpt: "Virtual-fencing collars don't need a tower or fixed alert thresholds — HerdLink shows how reading the herd's social network catches sickness earlier, with zero false alarms."
tags: ["AI", "SaaS"]
notebooklm: ""
audio: "https://github.com/atodev/herdlink/releases/download/v1.0/Satellite_social_networks_for_cows.m4a"
audioTitle: ""
video: "https://github.com/atodev/herdlink/releases/download/V1a/How_Social_Withdrawal_Predicts_Illness.mp4"
videoTitle: "How Social Withdrawal Predicts Illness"
slides: ""
---

# The collar is fine. The tower and the thresholds are the problem.

*Why the next generation of livestock wearables should ditch on-farm infrastructure and start reading the herd's social network — and what I built to prove it.*

**Live demo: [herdlink.atodev.xyz](https://herdlink.atodev.xyz/) · Source: [github.com/atodev/herdlink](https://github.com/atodev/herdlink)**

---

Virtual-fencing collars are one of the genuinely transformative ideas in pastoral farming. A GPS collar that steers cows with audio cues replaces physical fencing, enables cell grazing at a precision no fence line can match, and puts a sensor on every animal in the herd, around the clock. Farmers who use them don't go back.

But the current generation carries two design decisions that limit what the category can become. Neither is about the collar itself. HerdLink is a working demonstration — a full herd simulation, a trained detection model, and a live social network view, running in your browser — built to show what happens when you change both.

## Problem one: the tower tax

Today's market-leading systems don't connect collars directly to the internet. Each farm needs a base station — a solar-powered radio tower with line-of-sight to the paddocks — before the first collar goes live. That single architectural choice cascades into almost every cost in the business:

- **Capex per farm.** The tower itself, plus a site survey to place it, plus an install crew to commission it.
- **Coverage engineering.** Line-of-sight radio means gullies, bush blocks, and remote lease country can be dead zones — on exactly the terrain where checking stock in person is hardest.
- **A minimum viable farm size.** Tower economics only pencil out above a certain herd density. Small and remote operations — a large share of the world's pastoral farms — are priced out of the category entirely.
- **Slow onboarding.** You can't ship a customer a box; you have to schedule them an installation.

### The solution: skip the tower

Every collar on the market sells health alerts, and nearly all of them work the same way: monitor an individual cow's activity and rumination against a baseline, alarm on deviation. Useful — but it wastes the most interesting data the system collects, and it has a false-alarm problem baked in. Weather shifts every cow's behaviour at once. A storm halves grazing time; a heatwave elevates every temperature on the farm. Fixed thresholds either fire on all of it (and the farmer learns to ignore the app) or get detuned until they miss real cases.

### The solution: read the herd, not just the cow

A collar network is not eighty independent sensors. It's a **social network observatory**. Every position report is also a proximity observation, and from proximity over time you get the herd's social structure for free: who grazes with whom, which animals form cliques, who sits at the centre of the network and who at the edge.

This matters because **social withdrawal is one of the earliest and most reliable sickness behaviours in cattle** — frequently visible before fever peaks or rumination fully collapses. It's been documented in the animal-science literature for decades. No sensor needs to be added to capture it; it's latent in data the collars already produce.

HerdLink implements this end-to-end, with the network analysis vocabulary translated for the farm office:

- Each pair of cows within 15 metres accumulates **tie strength** — the fraction of recent time spent together.
- Each cow gets a **strength score** (her total social embeddedness), a **community** (her grazing clique, found automatically), and a **clustering coefficient** (do her companions also associate with each other?).
- Crucially, the detection model doesn't just ask *"is she peripheral?"* — some healthy cows simply are. It asks *"is she **becoming** peripheral, relative to her own baseline?"* The change in network position is the signal, not the position itself.

These social features feed a trained model alongside the behavioural ones, and every feature is computed **relative to the herd and relative to the animal's own history** — never against a fixed threshold. That one design decision makes the system weather-proof: in a simulated heatwave or snowstorm the whole herd's telemetry shifts together, the distributions move as one, and the false-alarm rate stays at zero.

The demo makes this falsifiable rather than rhetorical. You inject a hidden illness into a random cow — nothing on screen marks her — and watch the detector find her. Measured results on herds the model never trained on: **zero false alerts** across 24 simulated hours of healthy grazing plus forced heatwave and snow, and every injected condition (illness, lameness, oestrus) caught with the correct suspected cause within two to four simulated hours. Adding the social-withdrawal feature measurably accelerated illness detection — the network sees her leave her clique before her vitals settle the question.

The impact if implemented:

- **Earlier treatment.** Hours matter in mastitis and lameness outcomes; a signal that leads the vitals is treatment brought forward.
- **Alerts a farmer can trust.** A system calibrated to near-zero false alarms — and that explains each alert in plain language ("moving 60% slower than the herd; left her usual companions six hours ago") — keeps its credibility. Alert fatigue is what kills monitoring products.
- **Missed heats become rarer.** Oestrus shows up as restlessness *and* changed social behaviour; each missed heat costs a farmer a cycle — roughly three weeks of milk or calving window.
- **A genuinely differentiated product surface.** Per-cow activity alerts are table stakes across the industry. A live herd sociogram — communities, centrality, withdrawal trajectories — is information no incumbent surfaces, built entirely from data every collar already collects.

## The point

Neither of these ideas required new hardware to demonstrate. The tower problem is an architecture decision; the analytics problem is a modelling decision. Both were provable in software — a browser-based simulation with a real trained model and verified detection behaviour — which is exactly what [the demo](https://herdlink.atodev.xyz/) is. The documentation walks through every component, including a [plain-language guide to the network analysis](https://herdlink.atodev.xyz/docs/social-graph) for readers new to SNA.

The collar was never the hard part. Getting the data out cheaply, and taking the herd's social life seriously once you have it — that's where the next product wins.

---

*HerdLink is a personal demonstration concept and is not affiliated with Halter or any collar manufacturer. Simulation parameters are grounded in published cattle-behaviour research; hardware and cost figures are illustrative.*


