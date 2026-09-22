IPPGOnline frame-stack v11

Architecture:
- Rebuilt the variable middle as ONE invisible content frame.
- Frame bounds: x=48px, width=520px, y=Builder Plan Area Y (default 210px), height=690px.
- The frame itself has no visible border/background.

Natural stack order:
1. Plan rows
2. Optional promo artwork (eero, future promo art)
3. Mobile artwork

Plan rows:
- Large speed on left.
- Large magenta price block on right.
- Navy bar with magenta gradient overlay below.
- 1 Gig receives MOST POPULAR in the gradient.
- Pricing schedule is a small supporting line beneath the bar.
- 2/3/4 speed layouts compact through row padding rather than absolute positioning.

Promos:
- eero is part of the same flow, not an independently positioned page element.
- Mobile is the last child in the frame, left aligned, 396px wide.
- If eero is absent, Mobile naturally moves upward.
- No promo can drift under the dog because the entire variable stack is constrained to the frame.

Legal remains in its separate footer-safe frame at 6pt.
