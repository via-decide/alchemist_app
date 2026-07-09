# Alchemist Decision Engine Architecture

Alchemist no longer treats swipe as the learning model. Swipe is now one possible interaction source that emits a normalized `DecisionEvent` into an interaction-agnostic backend engine.

## Layering

```text
Presentation Layer
  ↓ emits UI interactions only
Interaction Router
  ↓ normalizes SWIPE, BUTTON, KEYBOARD, SEARCH, READ, BOOKMARK, NOTE, HIGHLIGHT, QUIZ, VOICE, GRAPH_NODE, TIMELINE, LAB, PDF, EPUB, API
Decision Engine
  ↓ applies state, mastery, confidence, progress, history, analytics
Knowledge Engine
  ↓ indexes Markdown KnowledgeUnits
Persistence
```

The current card interface is preserved, but it no longer owns XP or mastery. It sends swipe choices to the Decision Engine and displays the returned aggregate progress.

## DecisionEvent

Every interface produces the same shape:

```json
{
  "type": "decision",
  "interactionType": "SWIPE",
  "topic": "Physical Chemistry",
  "concept": "Thermodynamics",
  "action": "mastered",
  "confidence": null,
  "duration": 4200,
  "timestamp": "2026-07-09T00:00:00.000Z"
}
```

## KnowledgeUnit

Cards are just one renderer of a `KnowledgeUnit`. The engine tracks concepts rather than cards:

```json
{
  "id": "thermodynamics",
  "title": "Thermodynamics",
  "category": "Physical Chemistry",
  "difficulty": "advanced",
  "prerequisites": [],
  "mastery": 0.82,
  "confidence": 82,
  "history": [],
  "tags": [],
  "related_topics": [],
  "references": []
}
```

## State machine

The deterministic state machine supports:

```text
unknown → seen → learning → practicing → confident → mastered → needs_review → archived
```

Transitions are configurable through `createDecisionEngine({ stateMachine: { transitions } })`.

## API surface

`api/decision-api.js` exposes the decision layer for static/serverless adapters:

- `GET /api/progress`
- `GET /api/mastery`
- `GET /api/confidence`
- `POST /api/decision`
- `GET /api/history`
- `GET /api/analytics`
- `GET /api/topic/{id}`
- `POST /api/bookmark`
- `POST /api/highlight`
- `POST /api/note`

## Migration note

The existing swipe UI remains intact. Gesture physics still chooses a direction, but the quiz result is routed through `DECISION_ENGINE.decide({ interactionType: "SWIPE", ... })`. XP, confidence, mastery, progress, decision history, and analytics are produced by core modules under `core/decision-engine/`, making the same backend reusable by documentation readers, EPUB readers, research workspaces, graph explorers, timelines, search, and PWA interfaces.
