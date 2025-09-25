/** @jsxImportSource frog/jsx */

import { Frog } from "frog";

type GameState = {
  x: number;
  y: number;
};

const app = new Frog<{ State: GameState }>({
  initialState: { x: 5, y: 5 }
});

function renderGame(state: GameState) {
  const grid = Array.from({ length: 10 }, () => Array(10).fill("⬜"));
  grid[state.y][state.x] = "🚜"; // танк
  return grid.map((row) => row.join("")).join("\n");
}

app.frame("/", (c) => {
  const state = c.memory.state<GameState>() ?? { x: 5, y: 5 };

  return c.res({
    image: (
      <div style={{ fontSize: 24, whiteSpace: "pre" }}>
        {renderGame(state)}
      </div>
    ),
    intents: [
      { action: "/up", label: "⬆️" },
      { action: "/down", label: "⬇️" },
      { action: "/left", label: "⬅️" },
      { action: "/right", label: "➡️" }
    ]
  });
});

app.frame("/up", (c) => {
  const state = c.memory.state<GameState>() ?? { x: 5, y: 5 };
  return c.res({
    image: (
      <div style={{ fontSize: 24, whiteSpace: "pre" }}>
        {renderGame({ ...state, y: Math.max(0, state.y - 1) })}
      </div>
    ),
    intents: [{ action: "/", label: "◀️ Назад" }]
  });
});

app.frame("/down", (c) => {
  const state = c.memory.state<GameState>() ?? { x: 5, y: 5 };
  return c.res({
    image: (
      <div style={{ fontSize: 24, whiteSpace: "pre" }}>
        {renderGame({ ...state, y: Math.min(9, state.y + 1) })}
      </div>
    ),
    intents: [{ action: "/", label: "◀️ Назад" }]
  });
});

app.frame("/left", (c) => {
  const state = c.memory.state<GameState>() ?? { x: 5, y: 5 };
  return c.res({
    image: (
      <div style={{ fontSize: 24, whiteSpace: "pre" }}>
        {renderGame({ ...state, x: Math.max(0, state.x - 1) })}
      </div>
    ),
    intents: [{ action: "/", label: "◀️ Назад" }]
  });
});

app.frame("/right", (c) => {
  const state = c.memory.state<GameState>() ?? { x: 5, y: 5 };
  return c.res({
    image: (
      <div style={{ fontSize: 24, whiteSpace: "pre" }}>
        {renderGame({ ...state, x: Math.min(9, state.x + 1) })}
      </div>
    ),
    intents: [{ action: "/", label: "◀️ Назад" }]
  });
});

export default app;
