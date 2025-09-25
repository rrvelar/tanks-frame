import { Frog } from "frog";

type State = {
  x: number;
  y: number;
};

export const app = new Frog<{ State: State }>({
  initialState: { x: 0, y: 0 },
});

app.frame("/", (ctx) => {
  const { x, y } = ctx.state;

  return ctx.res({
    image: (
      <div
        style={{
          fontSize: 42,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p>🚀 Tanks Frame</p>
        <p>Position: ({x}, {y})</p>
      </div>
    ),
    intents: [
      <button action="/up">⬆️ Up</button>,
      <button action="/down">⬇️ Down</button>,
      <button action="/left">⬅️ Left</button>,
      <button action="/right">➡️ Right</button>,
    ],
  });
});

app.frame("/up", (ctx) => {
  ctx.updateState((s) => {
    s.y -= 1;
  });
  return ctx.res({ redirect: "/" });
});

app.frame("/down", (ctx) => {
  ctx.updateState((s) => {
    s.y += 1;
  });
  return ctx.res({ redirect: "/" });
});

app.frame("/left", (ctx) => {
  ctx.updateState((s) => {
    s.x -= 1;
  });
  return ctx.res({ redirect: "/" });
});

app.frame("/right", (ctx) => {
  ctx.updateState((s) => {
    s.x += 1;
  });
  return ctx.res({ redirect: "/" });
});

export default app;
