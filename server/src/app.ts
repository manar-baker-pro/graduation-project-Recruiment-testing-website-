import dbConfig from "./configs/DBConfig";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import HomeController from "./controllers/home.controllers";
import AuthRoutes from "./routes/auth.routes";
import { SurveyRoutes } from "./routes/survey.routes";
import "./configs/globalRequestType";
import { TechnologyRoutes } from "./routes/technology.routes";
import { cronExpireConfig } from "./configs/cronJop";
import cron from "node-cron";
import CompanyRoutes from "./routes/company.routes";
import UserRoutes from "./routes/user.routes";
import ResponsesRoutes from "./routes/responses.routes";
import { TestRoutes } from "./routes/test.routes";
import { ApiErrorHandler } from "./lib/ErrorHandling/handleErrors";
import { Server, Server as SocketIO } from "socket.io";
import session from "express-session";
import http from "http";
import {
  EstablishConnectionMiddle,
  RemoveConnectionMiddle,
} from "./middlewares/socketIoEstablishConnection";
import { corsConfig } from "./configs/CORS";
import { InterviewEventsRoutes } from "./routes/interviewEvents.routes";
import { InterviewPlatformRoutes } from "./routes/interviewPlatform.routes";
// import csrf from "csurf";

dotenv.config();
dbConfig();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.set("socketio", io);

io.on("connection", (socket) => {
  EstablishConnectionMiddle(socket, io);
  RemoveConnectionMiddle(socket);
  console.log("Client connected" + socket.id);
});
// app.use(
//   session({
//     secret: `${process.env.EXPRESS_SESSION_KEY}`,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(
  session({
    secret: `${process.env.EXPRESS_SESSION_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

// cronExpireConfig(cron);
const port = process.env.PORT || 8000;
const authRoutes: AuthRoutes = new AuthRoutes();
const surveyRoutes: SurveyRoutes = new SurveyRoutes();
const technologyRoutes: TechnologyRoutes = new TechnologyRoutes();
const companyRoutes: CompanyRoutes = new CompanyRoutes();
const responsesRoutes: ResponsesRoutes = new ResponsesRoutes();
const userRoutes: UserRoutes = new UserRoutes();
const testRoutes: TestRoutes = new TestRoutes();
const interviewEventsRoutes: InterviewEventsRoutes = new InterviewEventsRoutes();
const interviewPlatformRoutes: InterviewPlatformRoutes = new InterviewPlatformRoutes();
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(flash());
app.get("/", HomeController.homeController);
app.use("/auth", authRoutes.router);
app.use("/survey", surveyRoutes.router);
app.use("/company", companyRoutes.router);
app.use("/user", userRoutes.router);
app.use("/technologies", technologyRoutes.router);
app.use("/tests", testRoutes.router);
app.use("/responses", responsesRoutes.router);
app.use("/interviewEvents", interviewEventsRoutes.router);
app.use("/interviewPlatform", interviewPlatformRoutes.router);
app.use(ApiErrorHandler);

io.on("disconnect", () => {
  console.log("Client disconnected");
});
server.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
