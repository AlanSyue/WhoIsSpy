import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import locale from '~/constants/locale'

export default class DpickDocument extends Document {
  static getInitialProps ({ renderPage, isServer }) {
    // inject css to header for ssr
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props}/>))
    const styles = sheet.getStyleElement()

    return {
      ...page,
      styles
    }
  }

  render = () => (
    <html>
      <Head>
        <title>{locale('title')}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
        <link rel='shortcut icon' type='image/png' href='/favicon.png'/>
        <link rel='stylesheet' type='text/css' href='/normalize.css'/>
        {this.props.styles}
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </html>
  )
}
