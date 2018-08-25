const DICTIONARY = {
  game: {
    alert: {
      browserNotSupportCameraError: '您的瀏覽器（可能是App內的瀏覽器）不支援相機，請用Chrome或Safari等瀏覽器開啟',
      cameraError: '請開啟相機權限',
      cancel: '取消',
      confirm: '確定',
      homeTitle: '確定要離開遊戲？',
      replayTitle: '確定要重新開始？'
    },
    confirmCard: '我記住了',
    drawCardRemind: '請抽卡',
    execute: '處決',
    forget: '忘詞',
    loyal: '平民',
    replay: '重新開始',
    spy: '臥底',
    whiteboard: '白板',
    win: '獲勝'
  },
  menu: {
    alert: {
      rules: [
        '選擇玩家人數',
        '選擇「臥底」人數，其餘為「平民」，自行選擇是否要開啟「白板」',
        '遊戲開始後，輪流抽卡，記住卡上的詞彙，按下「我記住了」並拍照',
        '抽完後，每人輪流用一段話，隱約地描述、暗示你拿到的詞彙',
        '切記不可說到詞彙上的字，也不可以說謊',
        '只有「臥底」的詞彙與其他人不同，「臥底」需掩飾身份與找出隊友',
        '若為身份為「白板」（詞彙為「白板」），需觀察其他人的描述來唬爛，掩飾身為「白板」的事實',
        '每個人都講完後，投票給你認為是「臥底」的人，點擊最高票玩家頭像並按下「處決」，若票數平手，猜拳敗者出局',
        '被「處決」玩家即出局，繼續下一輪描述，已出局玩家無法參與描述和投票',
        '所有「臥底」先被「處決」則為「平民」獲勝且遊戲結束，反之亦然'
      ],
      ruleTitle: '規則'
    },
    player: '玩家',
    start: '開始',
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
