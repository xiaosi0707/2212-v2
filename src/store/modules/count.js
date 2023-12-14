const state = {
  count: 0 // 计数器
}
const mutations = {
  // 计数器的加加
  mutCountAdd(state) {
    state.count++
  },
}
export default {
	namespaced: true,
	state,
	mutations
}
