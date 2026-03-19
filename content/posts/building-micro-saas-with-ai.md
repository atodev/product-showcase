---
title: "Building Micro-SaaS Products with AI"
date: "2026-03-20"
excerpt: "How I approach building focused, AI-powered SaaS tools — from idea validation to production deployment in weeks, not months."
tags: ["AI", "Micro-SaaS", "Development"]
---

The best micro-SaaS products solve one problem exceptionally well. When you add AI to that equation, the surface area of solvable problems expands dramatically — but so does the temptation to over-engineer.

## Start with the problem, not the model

Every product I've built started with a specific pain point, not a technology. Interview Edge came from watching candidates over-prepare on generic content while missing the actual signals interviewers look for. ONA Dashboard came from organisations drowning in engagement survey data but unable to see the network beneath it.

The AI layer came second — once the problem was clear, the right model and approach became obvious.

## Local vs cloud AI

One of the most important decisions early on is where the inference runs. For most prototypes, a hosted API (OpenAI, Anthropic) is the right call — fast to integrate, no infrastructure to manage, and costs stay predictable at low volumes.

As you scale, or when the data is sensitive, local models become compelling. Running Ollama on a customer's own infrastructure means no data leaves their environment — a real differentiator in enterprise and regulated industries.

## Ship fast, iterate faster

The goal is a working product in the hands of real users within weeks. That means:

- **One core feature first** — resist the backlog
- **Vercel for deployment** — zero-config, global CDN, instant rollbacks
- **Next.js app router** — server components, streaming, and API routes in one framework
- **TypeScript throughout** — catches entire classes of bugs before they reach production

The rest is iteration based on what users actually do, not what you assumed they'd do.
