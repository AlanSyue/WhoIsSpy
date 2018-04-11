import get from 'lodash/get'

const handleJoiError = (ctx, err) => {
  const { message, path, type } = err.details[0]

  ctx.render(400, {
    message,
    field: path,
    error: ctx.errors.ErrorCode[type]
  })
}

const handleAPIError = (ctx, err) => {
  const { body, statusCode } = err.response || {}

  ctx.render(statusCode, body)
}

const handleAPIServerDownError = ctx => {
  ctx.render(503, {
    error: ctx.errors.ErrorCode.APIServerDown,
    message: 'API server down error'
  })
}

const handleUnknownError = (ctx, err) => {
  ctx.render(500, {
    error: ctx.errors.ErrorCode.Unknown,
    message: 'Internal server error'
  })
}

export default async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    if (err.isJoi) {
      handleJoiError(ctx, err)
    } else if (err.response) {
      handleAPIError(ctx, err)
    } else if (get(err, 'error.code') === 'ECONNREFUSED') {
      handleAPIServerDownError(ctx)
    } else {
      handleUnknownError(ctx, err)
    }

    throw err
  }
}
