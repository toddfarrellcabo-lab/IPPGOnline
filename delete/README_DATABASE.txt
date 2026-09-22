IPPGOnline database build

Source of truth:
Personaville-Working-Copy-20260922-1106-v6.xlsx

Loaded from the current Personaville export without changing the workbook.
The complete normalized Personaville tables are preserved in:
  data/personaville-db.json

The flyer-ready projection used by the browser is:
  data/ippg-data.json

Counts:
  02_FamilyGroups: 14
  03_PricingSets: 3
  04_Modifiers: 5
  05_Personas: 60
  06_SpeedOptions: 183
  07_PricingSchedules: 404
  08_Disclaimers: 60
  09_Icons: 6
  10_PersonaModifiers: 98
  Persona Master: 60

Demo:
1. Serve this folder with a local/static web server.
2. Open index.html through that server.
3. Click Database.
4. Search/filter Current or Scheduled personas and Pricing Set.
5. Select a persona; the flyer updates from that record.
6. Print / Save PDF uses the selected database record.

Important:
No source workbook rows were edited. The web JSON is generated from the uploaded Personaville export.
