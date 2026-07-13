import { createElement as h } from "react";

function App() {
  return h(
    "div",
    null,
    h("h1", null, "Hello Frontend Masters"),
    h("p", null, "Hello SSG"),
  );
}

export default App;
