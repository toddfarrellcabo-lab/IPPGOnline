IPPGOnline clean structure v6

Live data: data/ippg-data.json and data/personaville-db.json
Artwork: assets/
Font: assets/fonts/Effra Bold.ttf
Documentation: Readme/

Cleanup:
- Removed duplicate JSON files from repo root.
- Removed duplicate backdrop JPGs from data/.
- app.js uses ./data/ippg-data.json.
- Symmetrical badge is baked into the SYM backdrops, so the old bug-style control was removed.
- Any SymSpds/Sym Speed/Symmetrical/SYM record is symmetrical.
- Fiber Internet defaults to symmetrical.
- Existing symSpeed=true stays symmetrical.
- ippg-data.json was normalized to those rules.
- eero/mobile prefer each record's promos values.
- Plus_Free_Mobile.png is not present in this uploaded repo. Add it to assets/ with that exact name; until then it hides safely.
