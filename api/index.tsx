/** @jsxImportSource frog/jsx */
import { Frog, Button } from "frog";

type State = {
  x: number;
  y: number;
};

const app = new Frog<{ State: State }>({
  title: "Tanks Frame",
  initialState: { x: 4, y: 4 },
});

function render(state: State, c: any) {
  return c.res({
    image: (
      <div style={{ fontSize: 28, textAlign: "center" }}>
        🚀 Tanks Frame
        <div>Position: ({state.x}, {state.y})</div>
      </div>
    ),
    intents: [
      <Button action="/up">⬆️</Button>,
      <Button action="/down">⬇️</Button>,
      <Button action="/left">⬅️</Button>,
      <Button action="/right">➡️</Button>,
    ],
  });
}

// стартовый экран
app.frame("/", (c) => {
  const { x, y } = c.deriveState((s: State) => s);
  return render({ x, y }, c);
});

// движение вверх
app.frame("/up", (c) => {
  const { x, y } = c.deriveState((s: State) => {
    s.y = Math.max(0, s.y - 1);
  });
  return render({ x, y }, c);
});

// движение вниз
app.frame("/down", (c) => {
  const { x, y } = c.deriveState((s: State) => {
    s.y = Math.min(9, s.y + 1);
  });
  return render({ x, y }, c);
});

// движение влево
app.frame("/left", (c) => {
  const { x, y } = c.deriveState((s: State) => {
    s.x = Math.max(0, s.x - 1);
  });
  return render({ x, y }, c);
});

// движение вправо
app.frame("/right", (c) => {
  const { x, y } = c.deriveState((s: State) => {
    s.x = Math.min(9, s.x + 1);
  });
  return render({ x, y }, c);
});

export default app;
