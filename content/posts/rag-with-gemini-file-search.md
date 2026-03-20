---
title: "Grounding Gemini on Ancient Wisdom: RAG with Gemini File Search"
date: "2026-03-20"
excerpt: "How Gemini File Search handles noisy, OCR-damaged historical PDFs that break standard RAG pipelines — demonstrated on an 1887 edition of Marcus Aurelius' Meditations."
tags: ["AI", "RAG", "Gemini"]
---

![Marcus Aurelius Meditations 1887](/images/ma.jpg)

## The Challenge: OCR and Antiquity

This project demonstrates the power of Retrieval-Augmented Generation (RAG) by tackling a unique source: an 1887 digitised copy of Marcus Aurelius' *Meditations*.

Historical texts from this era, when converted to PDF, often suffer from poor OCR due to:

- Aging paper and ink bleed
- Unique, archaic typefaces
- Physical degradation of the original source

These issues result in numerous misspellings and unrecognisable characters that typically confuse standard, manual text-based RAG pipelines.

## The Breakthrough: Gemini File Search

To overcome the limitations of manual RAG when dealing with complex, noisy historical data, we leveraged the **Gemini File Search** tool — a fully managed RAG system built directly into the Gemini API.

**How File Search simplified the process:**

- **Simplified ingestion** — upload the full, corrupted PDF to a dedicated File Search Store
- **Intelligent processing** — the tool automatically handles chunking, embedding, and retrieval
- **State-of-the-art embeddings** — uses the latest Gemini embedding models to capture semantic meaning rather than exact word matching, allowing the system to retrieve corrupted words based on context
- **One-cell solution** — the entire workflow, from file upload and indexing to querying, runs in a single notebook cell

## The Result

By using File Search, Gemini can accurately answer complex philosophical questions grounded entirely within the text of the 1887 edition of *Meditations* — providing direct citations to the original document and successfully bridging the gap between archaic, damaged text and modern AI reasoning.

## Takeaway

Gemini File Search is a practical solution for RAG on real-world, imperfect documents. When standard chunking pipelines fail on noisy data, managed RAG handles the complexity so you don't have to.

The full code and sample data are available on [GitHub](https://github.com/atodev/RAG).
