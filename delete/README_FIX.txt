IPPGOnline layout repair

The flyer CSS is now namespaced with ippg-* classes so generic site/repo styles cannot resize the flyer assets.
Permanent asset sizes are explicitly constrained for the top logo, footer logo, QR, dog, and eero promo.
The Mobile offer is rendered with HTML/CSS so the missing mobile image no longer creates a broken-image icon.
Print CSS is locked to one 8.5 x 11 inch page.

Optional Effra:
If your licensed webfont files are available for this project, place them in assets/fonts using:
Effra-Regular.woff2
Effra-Bold.woff2
Effra-Heavy.woff2
Otherwise the page uses its fallback stack.
