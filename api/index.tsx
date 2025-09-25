/** @jsxImportSource frog/jsx */
import { Frog, Button } from 'frog';
import { handle } from 'frog/next';

type State = { x: number; y: number };

export const app = new Frog<{ State: State }>({
  basePath: '/api',
  title: 'Tanks Frame',
  initialState: { x: 4, y: 4 },
});

const SIZE = 8;

function render(state: State, c: any) {
  // рисуем простую "сетку" и позицию танка
  const rows: string[] = [];
  for (let r = 0; r < SIZE; r++) {
    let line = '';
    for (let col = 0; col < SIZE; col++) {
      line += r === state.y && col === state.x ? '🟩' : '⬜️';
    }
    rows.push(line);
  }

  return c.res({
    image: (
      <div style={{ fontSize: 28, whiteSpace: 'pre', textAlign: 'center' }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>Tanks Frame</div>
        {rows.map((l) => <div>{l}</div>)}
        <div style={{ marginTop: 8 }}>({state.x}, {state.y})</div>
      </div>
    ),
    intents: [
      <Button action="/up">⬆️</Button>,
      <Button action="/down">⬇️</Button>,
      <Button action="/left">⬅️</Button>,
      <Button action="/right">➡️</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  });
}

// стартовый экран
app.frame('/', (c) => {
  const state = c.deriveState((s: State) => s); // просто читаем текущее состояние
  return render(state, c);
});

// управление
app.frame('/up', (c) => {
  const state = c.deriveState((s: State) => { s.y = Math.max(0, s.y - 1); });
  return render(state, c);
});

app.frame('/down', (c) => {
  const state = c.deriveState((s: State) => { s.y = Math.min(SIZE - 1, s.y + 1); });
  return render(state, c);
});

app.frame('/left', (c) => {
  const state = c.deriveState((s: State) => { s.x = Math.max(0, s.x - 1); });
  return render(state, c);
});

app.frame('/right', (c) => {
  const state = c.deriveState((s: State) => { s.x = Math.min(SIZE - 1, s.x + 1); });
  return render(state, c);
});

// Vercel/Next адаптеры
export const GET = handle(app);
export const POST = handle(app);
