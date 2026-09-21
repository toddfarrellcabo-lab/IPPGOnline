# IPPGOnline V0.2 — normalized Personaville data model

This version converts the existing scheduled Personaville knowledge into an IPPG-oriented model.

## Core model
Configuration + active offer overlays -> rendered IPPG.

Promotional buckets are no longer the identity of the document. The source Personaville scheduled records are collapsed into 18 working IPPG configurations based on:
- source FamilyGroup
- base rate card
- equipment/symmetrical/fiber flags and family-name modifiers
- available speed lineup
- rack rates
- upload-speed pattern

## Source-derived configuration concepts
Base rate cards normalize to:
Core, CoreMax, Enhanced, EnhancedMax, Edge, EdgeMax.

Universal modifiers currently inferred/preserved:
Expansion Markets, HHI, Up to 1 Gig, Normal Speeds, Equipment Included, Symmetrical Speeds, Fiber.

## Q4 overlays
- 1 Gig: $50 for 24 months
- 2 Gig: $65 for 24 months
- EdgeMax 2 Gig exception: $60
- eero Plus: FREE for 3 months for qualifying 1 Gig+ service during the campaign window

## Important production guardrails
This is a working data model, not final approved customer data.
- Legal remains placeholder-only until verified against the production legal tracker.
- Town/market-to-configuration mapping is not yet loaded.
- Price Lock is preserved in Personaville source history but is not modeled as a current Q4 offer because the supplied Q4 acquisition sheet does not establish it.
- The eero campaign timeline date is used as 2026-11-22; the supplied legal transcription had a conflicting 11/22/27 expiration and must be verified.
- Q4 lower-tier promotional/first-paid pricing from old promo buckets is not treated as a universal current offer. Rack rates and speed availability come from the scheduled Personaville structure; Q4 1G/2G overrides come from the acquisition material.

## Run
    python -m http.server 8000
Open http://localhost:8000
