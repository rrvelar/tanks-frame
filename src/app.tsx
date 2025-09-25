import { Frog, Button } from "frog";
import { devtools } from "frog/dev";

// ==== БАЗА ПРИЛОЖЕНИЯ ====
const app = new Frog({
  basePath: "/api",
  title: "Tanks Frame Game",
});

devtools(app);

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
const EMPTY = "·";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
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
  if (s.win) return s;
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
      else row.push(EMPTY);
    }
    rows.push(row.join(" "));
  }
  return rows;
}

function screen(c: any, s: GameState) {
  const grid = renderGrid(s);
  const subtitle = s.win ? "🎉 Победа! Вы поразили врага" : "Стреляй по направлению танка";
  return c.res({
    image: (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: "100%", height: "100%", background: "#0B0F1A", color: "#fff",
        fontFamily: "monospace", padding: 24
      }}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>Tanks — Frame</div>
        <div style={{ opacity: 0.8, fontSize: 28, marginBottom: 16 }}>{subtitle}</div>
        <div style={{ fontSize: 44, lineHeight: 1.3 }}>
          {grid.map((r, i) => (
            <div key={i}>{r}</div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 24, opacity: 0.8 }}>Moves: {s.moves}</div>
      </div>
    ),
    intents: s.win ? [
      <Button action="/reset">🔁 Reset</Button>,
      <Button.Link href="/share">Share</Button.Link>,
    ] : [
      <Button action="/up">⬆️ Up</Button>,
      <Button action="/left">⬅️ Left</Button>,
      <Button action="/right">➡️ Right</Button>,
      <Button action="/down">⬇️ Down</Button>,
      <Button action="/shoot">💥 Shoot</Button>,
      <Button action="/reset">🔁 Reset</Button>,
      <Button.Link href="/share">Share</Button.Link>,
    ],
    state: s,
  });
}

// ==== РОУТЫ ФРЕЙМА ====

// Главный экран
app.frame("/", (c) => {
  const st = (c.req.state as GameState) || ({} as GameState);
  const s = st?.init ? st : initState();
  return screen(c, s);
});

// Сброс
app.frame("/reset", (c) => screen(c, initState()));

// Движение
app.frame("/up", (c) => { const s = (c.req.state as GameState) || initState(); movePlayer(s, "U"); return screen(c, s); });
app.f
