const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  const { _delay, _error, ...rest } = req.query;
  req.query = rest;

  const delay = Number(_delay) || 0;
  const fail = _error ? Number(_error) || 500 : 0;

  setTimeout(() => {
    if (fail) {
      return res.status(fail).json({ message: "simulated failure" });
    }
    next();
  }, delay);
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`Mock shop API listening on http://localhost:${port}`);
});
