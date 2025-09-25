app.frame("/up", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.y = Math.max(0, s.y - 1);
  });
  return render({ x, y }, c);
});

app.frame("/down", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.y = Math.min(9, s.y + 1);
  });
  return render({ x, y }, c);
});

app.frame("/left", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.x = Math.max(0, s.x - 1);
  });
  return render({ x, y }, c);
});

app.frame("/right", (c) => {
  const { x, y } = c.deriveState((s) => {
    s.x = Math.min(9, s.x + 1);
  });
  return render({ x, y }, c);
});
