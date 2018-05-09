import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

export default class DpickDocument extends Document {
  static getInitialProps ({ renderPage, isServer }) {
    // inject css to header for ssr
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props}/>))
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags
    }
  }

  render = () => (
    <html>
      <Head>
        <title>{locale('title')}</title>
        <meta name='description' content={locale('description')}/>
        <meta name='keywords' content={locale('keywords')}/>

        <meta property='og:title' content={locale('title')}/>
        <meta property='og:type' content='Website'/>
        <meta property='og:url' content='https://who-is-spy.firebaseapp.com/'/>
        <meta property='og:image:secure_url' content='https://who-is-spy.firebaseapp.com/img/profile.jpg'/>
        <meta property='og:image:width' content='378'/>
        <meta property='og:image:height' content='378'/>
        <meta property='og:image' content='https://who-is-spy.firebaseapp.com/img/profile.jpg'/>
        <meta property='og:site_name' content={locale('title')}/>
        <meta property='og:description' content={locale('description')}/>

        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'/>
        {/* <meta name='apple-mobile-web-app-capable' content='yes'/> */}

        <link rel='manifest' href='/manifest.json'/>
        <link rel='stylesheet' type='text/css' href='/normalize.css'/>

        <link rel='shortcut icon' href='/img/favicon.ico' type='image/x-icon'/>
        <link rel='icon' type='image/png' href='/img/favicon-32x32.png' sizes='32x32'/>
        <link rel='icon' type='image/png' href='/img/favicon-48x48.png' sizes='48x48'/>
        <link rel='icon' type='image/png' href='/img/favicon-96x96.png' sizes='96x96'/>
        <link rel='icon' type='image/png' href='/img/favicon-144x144.png' sizes='144x144'/>
        <link rel='icon' type='image/png' href='/img/favicon-512x512.png' sizes='512x512'/>
        <link rel='apple-touch-icon' sizes='180x180' href='/img/apple-touch-icon.png'/>

        {this.props.styleTags}
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>

      <script async src='https://www.googletagmanager.com/gtag/js?id=UA-100366323-2'></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());
        gtag('config', 'UA-100366323-2');
      </script>
    </html>
  )
}
