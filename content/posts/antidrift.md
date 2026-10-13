---
title: "Antidrift: Treating an AI Agent's Intent as a Conserved Quantity"
date: "2026-10-13"
excerpt: "Long-running agents drift from what they were asked to do. I borrowed the energy function from Hamiltonian mechanics to measure that drift, built it, tested it, and found that half the idea works."
tags: ["AI", "Agents", "Research"]
notebooklm: ""
audio: "https://github.com/atodev/antidrift/releases/download/v0.1.0/How_Physics_Stops_AI_Agent_Drift.m4a"
audioTitle: "How Physics Stops AI Agent Drift"
slides: ""
---

An AI agent that runs for hundreds of steps, or a system that rewrites its own prompts and code, can end up pursuing something other than what it was asked to do. No single step has to be wrong. A sub-task becomes the task, a search result pulls it sideways, or one "improvement" quietly changes behaviour the original goal depended on.

Most monitors check one step at a time: is this step similar enough to the task? That has no memory. It cannot tell a brief, sensible detour from the tenth step of a steady slide, and it cannot say which input caused the slide.

I wanted something that watches the whole trajectory. The result is **antidrift**: a small open-source monitor, a whitepaper, and an experiment with one clear win and two honest disappointments.

## The idea

In classical mechanics, a system has a position, a momentum and a total energy, the Hamiltonian. A ball rolling in a bowl keeps the same energy unless something outside pushes it, and that energy limits how far up the sides it can climb.

Antidrift applies that picture to an agent:

- **The bowl is the original intent.** The task statement is turned into a vector, and that point is frozen as the bottom of the bowl. The agent can never move it.
- **The ball is the agent's current state.** Each step the agent takes is embedded as a vector, and a smoothed running state tracks where the run currently sits.
- **Energy measures distance from intent.** The further the state is from the bottom of the bowl, the higher its energy.
- **An energy budget sets the limit.** The budget is calibrated on runs that are known to have stayed on task. Energy above the budget for two steps in a row halts the agent.

Because energy is tracked step by step, the monitor can also keep a ledger of which input channel (the planner, a search tool, another agent) added the energy. And for self-modifying systems there is a gate that only accepts a new version if its answers to a fixed set of probe questions match those of the very first version.

![Monitor architecture: the agent emits steps, and everything that judges them sits outside its reach](/images/antidrift-architecture.png)

The important design rule is in that picture: the agent can write to none of the parts that judge it.

## Using it

```python
from hamiltonian import IntentMonitor, SentenceTransformerEmbedder, Status, calibrate_e_ref

embedder = SentenceTransformerEmbedder()
e_ref = calibrate_e_ref(benign_runs, embedder)   # runs known to have stayed on task

monitor = IntentMonitor("Migrate the billing database to PostgreSQL.", embedder, e_ref=e_ref)
for port, text in agent_steps:
    reading = monitor.observe(text, port=port)
    if reading.status is Status.HALT:
        print(monitor.ledger.injected())         # which input added the energy
        break
```

The whole library is 289 lines of Python.

## What the experiment found

I tested it on 1,200 scripted traces: agents that stay on task, agents that take a short legitimate detour, agents that drift gradually, and agents that are knocked off course abruptly.

![Mean energy rises past the budget within 3 steps of abrupt drift and 7 steps of gradual drift](/images/antidrift-energy.png)

- **Memory helps.** With the threshold set so that no well-behaved run raised an alarm, the monitor caught 300 of 300 drifting runs. A step-at-a-time similarity check caught 267.
- **The momentum part added nothing.** The full Hamiltonian has two terms: one for position and one for momentum. The position term alone gave the same detections. In practice, what was tested is a smoothed distance from the intent with a well-calibrated threshold. The physics gave me the structure, but not a measurable edge.
- **The budget does not travel.** A budget calibrated on two kinds of task raised many false alarms on a third. It needs calibrating for the kind of work it is watching.

## What it does not show

The traces are scripted sentences, not output from a real agent, and the drift is a change of topic, which is the easiest kind to detect. An agent that stays on topic while quietly weakening its own tests is a much harder case, and I have not tested it. The input ledger and the self-modification gate have unit tests but no evaluation yet.

So this is a design with a working reference implementation and early evidence on easy cases. The paper sets out the experiment that would settle it on real workloads.

## Read more

- [The whitepaper (PDF)](https://github.com/atodev/antidrift/blob/main/paper/intent-as-a-conserved-quantity.pdf)
- [The code on GitHub](https://github.com/atodev/antidrift)

The code is Apache-2.0 and the paper is CC BY 4.0. The paper, code and test corpus were drafted with an AI assistant and have not yet been independently reviewed. If you work on agent monitoring and think I have something wrong, I would like to hear it.
