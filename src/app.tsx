import { Frog } from "frog";
import { Button } from "frog";

const app = new Frog({
  title: "Tanks Frame",
  initialState: {
    x: 5,
    y: 5,
  },
});

app.frame("/", (c) => {
  const { x, y } = c.state;

  return c.res({
    image: (
      <div style={{ fontSize: 40 }}>
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
});

app.frame("/up", (c) => {
  c.state.y -= 1;
  return c.res({ redirect: "/" });
});

app.frame("/down", (c) => {
  c.state.y += 1;
  return c.res({ redirect: "/" });
});

app.frame("/left", (c) => {
  c.state.x -= 1;
  return c.res({ redirect: "/" });
});

app.frame("/right", (c) => {
  c.state.x += 1;
  return c.res({ redirect: "/" });
});

export default app;
