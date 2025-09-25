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
  const { x, y } = c.state

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
  c.deriveState((s) => { s.y -= 1 })
  return c.res({
    action: "/",
    image: <div><p>Обновляем...</p></div>,
  })
})

app.frame("/down", (c) => {
  c.deriveState((s) => { s.y += 1 })
  return c.res({
    action: "/",
    image: <div><p>Обновляем...</p></div>,
  })
})

app.frame("/left", (c) => {
  c.deriveState((s) => { s.x -= 1 })
  return c.res({
    action: "/",
    image: <div><p>Обновляем...</p></div>,
  })
})

app.frame("/right", (c) => {
  c.deriveState((s) => { s.x += 1 })
  return c.res({
    action: "/",
    image: <div><p>Обновляем...</p></div>,
  })
})

export default app
