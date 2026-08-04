/**
 * Ambient declaration for global stylesheet side-effect imports.
 *
 * Next 15 ships type declarations for `*.module.css` only, and TypeScript 5.9
 * reports TS2882 for a side-effect import without one. Placed in `src/styles/`
 * beside the stylesheet it describes — `ARCHITECTURE.md` §3 documents no
 * `src/types/` folder, and inventing one is not permitted.
 */
declare module '*.css';
