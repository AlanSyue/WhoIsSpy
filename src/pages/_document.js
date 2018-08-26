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
        <meta property='og:image:secure_url' content='https://pli.io/kphO7.jpg'/>
        <meta property='og:image:width' content='378'/>
        <meta property='og:image:height' content='378'/>
        <meta property='og:image' content='https://pli.io/kphO7.jpg'/>
        <meta property='og:site_name' content={locale('title')}/>
        <meta property='og:description' content={locale('description')}/>

        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'/>
        {/* <meta name='apple-mobile-web-app-capable' content='yes'/> */}

        <link rel='manifest' href='/manifest.json'/>
        <link rel='stylesheet' type='text/css' href='/normalize.css'/>

        <link rel='shortcut icon' href='/img/favicon.ico' type='image/x-icon'/>
        <link rel='icon' type='image/png' href='https://pli.io/kpfKu.png' sizes='32x32'/>
        <link rel='icon' type='image/png' href='https://pli.io/kpYO3.png' sizes='48x48'/>
        <link rel='icon' type='image/png' href='https://pli.io/kpsB9.png' sizes='96x96'/>
        <link rel='icon' type='image/png' href='https://pli.io/kpdCw.png' sizes='144x144'/>
        <link rel='icon' type='image/png' href='https://pli.io/kpFEy.png' sizes='512x512'/>
        <link rel='apple-touch-icon' sizes='180x180' href='https://pli.io/kpKiQ.png'/>

        {this.props.styleTags}
      </Head>
      {this.renderGAScripts()}
      <body>
        <Main/>
        <NextScript/>
      </body>
    </html>
  )

  renderGAScripts = () => (
    <script dangerouslySetInnerHTML={{__html: `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-100366323-2', 'auto');
      window.sendPageview = function() { ga('send', 'pageview', location.pathname + location.search) }
    `}}/>
  )
}
