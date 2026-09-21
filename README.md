# IPPGOnline V0.1

A deliberately small prototype for rendering customer-facing Internet Plans Pricing Guides (IPPGs).

## V1 flow
Select configuration -> resolve rate card/modifiers -> apply offers by effective date -> render letter-size IPPG -> print.

## Run
Because the app loads JSON with fetch(), serve the folder with a simple local web server.
Example:
    python -m http.server 8000
Then open:
    http://localhost:8000

## What is intentionally included
- IPPG configuration selector
- Effective-date selector
- Six Q4 rate-card families
- Working modifier/configuration examples
- Q4 2026 1 Gig and 2 Gig acquisition offer logic
- Edge Max 2 Gig $60 exception
- eero Plus 1 Gig+ eligibility/date logic
- Live 8.5 x 11 portrait HTML/CSS preview
- Print stylesheet for Letter portrait

## What is intentionally NOT production-ready
- Legal copy is placeholder text.
- Only 1 Gig and 2 Gig are seeded because those are the rates supported by the supplied Q4 acquisition sheet used for this prototype.
- Lower speed tiers must be added from verified rate-card/configuration data.
- Configuration-to-market mapping is not yet included.
- Sparklight production artwork, QR destination, fonts, and final creative styling are not yet wired in.
- The eero date is set to 2026-11-22 based on the campaign timeline. The supplied disclaimer transcription contained an inconsistent 11/22/27 date and must be legally verified before production.

## Data model
data/ippg-data.json contains:
- rateCards
- configurations
- offers

Promotions do not define configuration identity. They are applied at render time according to speed, effective date, rate card, and exceptions.
