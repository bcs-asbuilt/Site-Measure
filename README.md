# Site Measure

Phone app for site measuring ducting, grille boots and plenums, with drawings, 3D view and PDF sheets. Works offline once installed.

## Use it

Open the GitHub Pages address on your phone (Settings > Pages shows it), then:

- **iPhone:** Safari > Share > Add to Home Screen
- **Android:** Chrome > menu > Install app

Saved jobs stay on each phone; they aren't shared through GitHub.

## Files

- `index.html`, `sw.js`, `manifest.webmanifest`, `fonts/`, `icons/`, `lib/`: the installable app (this is what GitHub Pages serves)
- `duct-site-measure.html`: the same app as one file, for working on it in Claude
- `duct-site-measure.md`: changelog (version, who, what changed)

## Updating

Replace the files with the new ones and commit. Change the version in `sw.js` (`VERSION = 'site-measure-…'`) every time, or phones keep the old copy. Add a line to `duct-site-measure.md`.
