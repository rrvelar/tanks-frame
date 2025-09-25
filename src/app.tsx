import { Frog, Button } from "frog";
import { devtools } from "frog/dev";
import { serve } from "frog/serve";

// ==== БАЗА ПРИЛОЖЕНИЯ ====
const app = new Frog({ basePath: "/api" });
devtools(app, { serveStatic: true });

// ==== ТИПЫ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====
type Dir = "U" | "D" | "L" | "R";
interface Vec { x: number; y: number }
interface GameState {
  w: number; h: number;
  p: Vec;              // позиция игрока
  d: Dir;              // направление игрока
  e: Vec | null;       // позиция врага (null = убит)
  win: boolean;        // победа
  moves: number;       // кол-во ходов
  init: boolean;       // было ли инициализировано
}

const DIR_ICON: Record<Dir, string> = { U: "▲", D: "▼", L: "◀", R: "▶" };
const EMPTY = "·"; // можно заменить на "⬛"

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const eq = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y;
const copy = <T,>(o: T): T => JSON.parse(JSON.stringify(o));

const initState = (): GameState => ({
  w: 5, h: 5,
  p: { x: 2, y: 4 },   // снизу центр
  d: "U",
  e: { x: 2, y: 0 },   // сверху центр
  win: false,
  moves: 0,
  init: true,
});

function movePlayer(s: GameState, nd: Dir) {
  if (s.win) return s; // уже победили
  s.d = nd;
  const np = copy(s.p);
  if (nd === "U") np.y -= 1;
  if (nd === "D") np.y += 1;
  if (nd === "L") np.x -= 1;
  if (nd === "R") np.x += 1;
  np.x = clamp(np.x, 0, s.w - 1);
  np.y = clamp(np.y, 0, s.h - 1);
  s.p = np;
  s.moves += 1;
  return s;
}

function shoot(s: GameState) {
  if (s.win || !s.e) return s;
  const { p, d, e } = s;
  if (d === "U" && e.x === p.x && e.y <= p.y) s.win = true;
  if (d === "D" && e.x === p.x && e.y >= p.y) s.win = true;
  if (d === "L" && e.y === p.y && e.x <= p.x) s.win = true;
  if (d === "R" && e.y === p.y && e.x >= p.x) s.win = true;
  if (s.win) s.e = null;
  s.moves += 1;
  return s;
}

function renderGrid(s: GameState): string[] {
  const rows: string[] = [];
  for (let y = 0; y < s.h; y++) {
    const row: string[] = [];
    for (let x = 0; x < s.w; x++) {
      const isP = s.p.x === x && s.p.y === y;
      const isE = s.e && s.e.x === x && s.e.y === y;
      if (isP) row.push(DIR_ICON[s.d]);
      else if (isE) row.push("💣");

