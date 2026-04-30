import { onRequestPost as __api_chat_ts_onRequestPost } from "/Users/admin/Work/flight-manual/functions/api/chat.ts"
import { onRequestPost as __api_feedback_ts_onRequestPost } from "/Users/admin/Work/flight-manual/functions/api/feedback.ts"
import { onRequest as ___middleware_ts_onRequest } from "/Users/admin/Work/flight-manual/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_ts_onRequestPost],
    },
  {
      routePath: "/api/feedback",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_feedback_ts_onRequestPost],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]