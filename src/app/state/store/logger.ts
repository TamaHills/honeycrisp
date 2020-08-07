import { MiddlewareContext } from "./types";

export const logger = (ctx: MiddlewareContext) => {
    console.log('previous state', ctx.prevState)
    console.log('dispatched action', ctx.action)
    console.log('resulting state', ctx.newState)

    return ctx.newState
}