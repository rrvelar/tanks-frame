/** @jsxImportSource frog/jsx */
import { Frog, Button } from "frog"

type State = {
  x: number
  y: number
}

export const app = new Frog<{ State: State }>({
  initialState: {
    x: 0,
    y: 0,
  },
  title: "Tanks Game",
})

// Главный экран
app.frame("/", (c) => {
  // просто читаем состояние, без return
  const { x, y } = c.deriveState((s) => s)

  return c.res({
    image: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Танки</h1>
        <p>Позиция: ({x}, {y})</p>
      </div>
    ),
    intents: [
      <Button action="/up">⬆️</Button>,
      <Button action="/down">⬇️</Button>,
      <Button action="/left">⬅️</Button>,
      <Button action="/right">➡️</Button>,
    ],
  })
})

// Движения
app.frame("/up", (c) => {
  const { x, y } = c.deriveState((s) => { s.y -= 1 })
  return renderUpdate(c, x, y)
})

app.frame("/down", (c) => {
  const { x, y } = c.deriveState((s) => { s.y += 1 })
  return renderUpdate(c, x, y)
})

app.frame("/left", (c) => {
  const { x, y } = c.deriveState((s) => { s.x -= 1 })
  return renderUpdate(c, x, y)
})

app.frame("/right", (c) => {
  const { x, y } = c.deriveState((s) => { s.x += 1 })
  return renderUpdate(c, x, y)
})

function renderUpdate(c: any, x: number, y: number) {
  return c.res({
    image: <div>Обновляем… ({x},{y})</div>,
    action: "/",
  })
}

export default app
