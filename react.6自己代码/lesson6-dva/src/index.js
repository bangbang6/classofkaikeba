import dva from "dva";
import "./index.css";

/* // 1. Initialize
const app = dva(); */
//自己配置好的app对象
import app from "./app";

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default);
//4.unmodel app.unmodel就会注销某个Model
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
