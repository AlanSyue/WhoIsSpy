const DICTIONARY = {
  game: {
    alert: {
      cameraError: '請開啟相機權限',
      cancel: '取消',
      confirm: '確定',
      homeTitle: '確定要離開遊戲？',
      replayTitle: '確定要重新開始？'
    },
    confirmCard: '我記住了',
    execute: '處決',
    forget: '忘詞',
    loyal: '平民',
    replay: '重新開始',
    spy: '臥底',
    whiteboard: '白板',
    win: '獲勝'
  },
  menu: {
    player: '玩家',
    start: '開始遊戲',
    spy: '臥底',
    title: '誰是臥底',
    whiteboard: '白板'
  },
  title: '誰是臥底',
  description: '誰是臥底網頁版，經典聚會遊戲、團康破冰神手遊，適合4至16人遊戲',
  keywords: '誰是臥底 網頁版 遊戲 聚會 團康 破冰'
}

// //////////////////////////////////////////////////////////////////////////////////
// Example:
//
// DICTIONARY = {
//   'validation': {
//     'minLength': 少なくとも{length}文字必要です
//   }
// }
//
// locale('validation.minLength', { length: 20 })
//
// //////////////////////////////////////////////////////////////////////////////////

export default (id, variables) => {
  let result = DICTIONARY

  id.split('.').forEach(key => {
    if (typeof result === 'object') {
      result = result[key]
    }
  })

  if (typeof variables === 'object') {
    Object.keys(variables).forEach(key => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), variables[key])
    })
  }

  return result
}
