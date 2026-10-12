# Technical QA — version 1.1.0

## Corrections

| Issue | Correction |
| --- | --- |
| Opening menu appeared as a small card inside the playfield | Introduction, pause, and result screens now cover the entire viewport with responsive typography |
| Normal layout could overflow the browser height | A viewport-height layout allocates remaining space to the game |
| Portrait phones stretched the world vertically | A shared scene rectangle preserves aspect ratio for both drawing and input |
| Touch coordinates could drift between normal and fullscreen modes | Pointer coordinates use the same viewport transform in every mode |
| Second touches could overwrite a running gesture | A gesture belongs to one pointer until release or cancellation |
| Active wind could persist across resizing | Resize and fullscreen changes release pointer capture and clear held controls |
| Space on a focused button also triggered the global pause shortcut | Button keyboard activation and gameplay shortcuts are handled separately |
| Low frame rates slowed physics and the frost clock | A fixed 60 Hz simulation catches up across frames, with a 250 ms hitch limit |
| Shelter counters became difficult to read on small screens | A responsive text summary reports every animal's warmth above the game |
| Offline title link navigated away from the game | The title is now non-navigating text |
| Audio startup failures could reject asynchronously | Audio resume failures are handled and sound state remains consistent |
| Menus could leave keyboard focus behind them | Menu focus stays on the action button; play restores focus to the canvas |

## Verification completed

- **14 automated tests passed:** five gameplay checks and nine viewport/input checks.
- Browser menu checks at **320 × 480, 390 × 844, 844 × 390, 768 × 1024, 1366 × 768, 1920 × 1080, and 2560 × 1080**.
- The opening menu covered the full viewport at every tested resolution. Its action button remained visible, and there was no horizontal page overflow.
- Browser checks for entering the game, keyboard wind, restart, pause/resume, Space on buttons, menu focus, and fullscreen button transitions.
- Game viewport and toolbar bounds checked on small, portrait, landscape, tablet, and desktop layouts.
- No browser console errors or warnings observed during these checks.

## Practical limits

The scene keeps its original proportions, so a portrait or ultrawide viewport can have spare space around the playable world. Gameplay coordinates and objectives remain intact. Screens too short to fit menu content can scroll the menu without scrolling the game.

Mobile sizes were simulated in the available browser. This is not a certification of physical Android/iOS touch behavior or all browser engines. True device fullscreen depends on the browser and the embedding page's permissions; the viewport-filling layout works independently of that API.

The original downloadable build is retained in `releases/A-Little-Warmth-original.zip`. If this update is submitted after the jam deadline, keep the original downloadable on itch.io and describe the fixes as an update.
