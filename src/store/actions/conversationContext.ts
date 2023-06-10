
export const setCurrentConversation = data => ({
  type: 'SET_CURRENT_CONV',
  data,
})

export const addAskingDudao = (B2A, B2C) => ({
  type: 'ADD_ASK_DUDAO',
  B2A,
  B2C,
})