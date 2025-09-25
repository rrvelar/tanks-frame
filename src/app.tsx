import { Frog, Button } from "frog";
import { devtools } from "frog/dev";

// Типы
type Dir = "U" | "D" | "L" | "R";
interface Vec { x: number; y: number }
interface GameState {
  w: number;
  h: number;
  p: Vec;
  d: Dir;
  e: Vec | null;
  win: boolean;
  moves: number;
  init: boolean;
}

// Утилиты и начальное состояние (как раньше) ...
const initState = (): GameState => ({
  w: 5, h: 5,
  p: { x: 2, y: 4 },
  d: "U",
  e: { x: 2, y: 0 },
  win: false,
  moves: 0,
  init: true,
});

// Функция рендера и логика те же, опустим здесь...

const app = new Frog<{ State: GameState }>({
  basePath: "/api",
  title: "Tanks Frame Game",
});

devtools(app);

// Пример маршрута:
app.frame("/", (c) => {
  // берём состояние из c.req.state
  const prev = (c.req.state as GameState) || initState();
  const s = prev.init ? prev : initState();
  return c.res({
    image: /* JSX */,
    intents: /* кнопки */,
    state: s,  // возвращаем state сюда
  });
});

// Другие маршруты аналогично:

app.frame("/up", (c) => {
  const prev = (c.req.state as GameState) || initState();
  const s = prev.init ? prev : initState();
  movePlayer(s, "U");
  return c.res({
    image: /* JSX */,
    intents: /* кнопки */,
    state: s,
  });
});

// и т.д...

export default app;
