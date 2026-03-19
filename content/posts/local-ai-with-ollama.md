---
title: "Running AI Locally with Ollama"
date: "2026-03-10"
excerpt: "Why local AI models are becoming a serious option for business applications, and how Ollama makes self-hosted inference practical."
tags: ["AI", "Ollama", "Local AI"]
---

A year ago, "run your own AI" meant wrangling CUDA drivers, managing Python environments, and hoping your GPU had enough VRAM. Ollama changed that.

## What Ollama does

Ollama wraps open-weight models (Llama, Mistral, Gemma, Phi and dozens more) in a simple REST API that runs locally. One install command, one `ollama pull` to fetch a model, and you have an OpenAI-compatible endpoint at `localhost:11434`.

For business applications this is significant. The model call looks identical to an OpenAI call — you can swap providers with a single config change.

## When local makes sense

Not every use case needs GPT-4. A surprising number of business tasks — classification, extraction, summarisation, structured output — run well on 7B or 13B parameter models on commodity hardware.

The cases where local AI wins:

- **Data sensitivity** — customer data, financial records, health information that can't leave the building
- **Latency** — no round trip to an external API, responses in milliseconds
- **Cost at scale** — a one-time hardware cost vs. per-token pricing at high volume
- **Offline capability** — works without an internet connection

## The trade-off

Frontier models (GPT-4o, Claude 3.5 Sonnet) are still ahead on complex reasoning tasks. Local models close the gap fast but haven't caught up on everything.

The right architecture for most business products: local models for the high-volume, lower-complexity tasks; cloud APIs for anything that needs the best available reasoning.

## Getting started

```bash
# Install Ollama
brew install ollama

# Pull a model
ollama pull llama3.2

# It's running at localhost:11434
curl http://localhost:11434/api/generate \
  -d '{"model": "llama3.2", "prompt": "Summarise this in one sentence: ..."}'
```

The barrier to entry for self-hosted AI has never been lower. For the right use cases, it's now the obvious choice.
