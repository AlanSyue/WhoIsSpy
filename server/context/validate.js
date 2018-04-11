import { promisify } from 'util'

import Joi from 'joi'

export default promisify(Joi.validate)
