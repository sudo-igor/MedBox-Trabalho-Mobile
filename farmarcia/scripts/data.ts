export function dataAleatoriaAte30Dias() {
  const diasMax = 25;
  const msPorDia = 24 * 60 * 60 * 1000;

  // valor aleatório entre 0 e 30 dias (em ms)
  const msAtras = Math.floor(Math.random() * (diasMax * msPorDia));

  return new Date(Date.now() - msAtras).toISOString();
}
export function formatDate(dataString: string) {
  const data = new Date(dataString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}
