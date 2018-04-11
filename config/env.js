// expose partial configs to global
import config from './'

global.DEV = process.env.NODE_ENV !== 'production'
