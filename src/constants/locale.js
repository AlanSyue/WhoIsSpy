const DICTIONARY = {
  game: {
    alertCameraError: '請開啟相機權限',
    confirmCard: '我記住了',
    execute: '處決',
    forget: '忘詞',
    loyal: '平民',
    menu: '主目錄',
    replay: '重玩',
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
  title: '誰是臥底'
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
