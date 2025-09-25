import { Frog } from "frog";
import { Button } from "frog";

type State = {
  x: number;
  y: number;
};

const app = new Frog<{ State: State }>({
  title: "Tanks Frame",
  initialState: {
    x: 5,
    y: 5,
  },
});

function renderScene(x: number, y: number, c: any) {
  return c.res({
    image: (
      <div style={{ fontSize: 40, textAlign: "center" }}>
        🚀 Tank at ({x}, {y})
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
  const { x, y } = c.deriveState((s) => s);
  return renderScene(x, y, c);
});

// управление
app.frame("/up", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.y -= 1;
    return s;
  });
  return renderScene(x, y, c);
});

app.frame("/down", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.y += 1;
    return s;
  });
  return renderScene(x, y, c);
});

app.frame("/left", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.x -= 1;
    return s;
  });
  return renderScene(x, y, c);
});

app.frame("/right", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.x += 1;
    return s;
  });
  return renderScene(x, y, c);
});

export default app;
