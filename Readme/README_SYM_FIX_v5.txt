IPPGOnline Symmetrical Backdrop Fix v5

Fixes:
- Any persona containing SymSpds, Sym Speed, Symmetrical, or a standalone SYM marker in persona name, filename, modifiers, or base rate card is treated as symmetrical.
- Fiber Internet defaults to symmetrical even if the source symSpeed boolean is missing/false.
- PM_041-CoreMax-HHI-SymSpds therefore resolves to Fiber-Fueled_EquipmentInc-SYM-Backdrop.jpg.
- Selecting a new database record resets Backdrop to Auto and Symmetrical to database/default logic, preventing a previous manual override from leaking into the next persona.
- Manual backdrop selection validates the backdrop key. If an image fails, the renderer falls back to that record's automatic backdrop instead of leaving the page broken.
- Symmetrical checkbox now synchronizes every time a record renders.
- All eight backdrop JPGs remain in assets/.
