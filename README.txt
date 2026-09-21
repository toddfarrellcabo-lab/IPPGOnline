IPPGOnline v4 - Data Connected

This build connects the Working Copy Persona Master to the on-screen IPPG selector and overlays the supplied Q4 2026 Acquisition Promotions on qualifying 1 Gig / 2 Gig rows by base rate-card family.

Sources bundled as derived JSON/JS:
- Personaville-Working-Copy-20260921-1625-v6.xlsx
- Q4_2026_Acquisition_Promotions_CopyPaste - Copy.xlsx

The published Q4 v7 workbook remains a comparison/reference source and is not used to overwrite the Working Copy in this build.

Current controls:
- Lifecycle: Current / Scheduled / All
- Configuration
- Fiber test toggle
- Equipment Included reflects selected configuration but remains manually testable
- Save / Print PDF

Important:
The middle plan-card treatment is an initial functional renderer, not the locked final pricing design.
Q4 eero disclaimer date inconsistency remains unresolved and is not silently corrected.

v5 layout changes:
- Fixed H1 top clipping with visible overflow/top padding.
- H2 moved to ~30px below H1 and increased 25%.
- Removed hidden configuration metadata from behind H2.
- Q4 Acquisition rows sort to the top but display only as "Great Deal".
- Deal price lockup now emulates supplied $39.95 reference: small $, oversized dollars,
  raised cents/asterisk, term, regular rate, and AutoPay/Paperless requirement.
