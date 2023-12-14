import Axios from 'axios'
const state = {
  list: [], // 任务列表的状态
  inputValue: '', // input框的值
  nextId: 100
}
const mutations = {
  // 变更list的状态
  mutChangeList(state, arr) {
    state.list = arr
  },
  // 变更inputValue的状态
  mutChangeInput(state, val) {
    state.inputValue = val
  },
  // 添加任务
  mutAdd(state) {
    if (state.inputValue.trim() !== '') {
      state.list.push({
        "id": state.nextId,
        "done": false,
        "info": state.inputValue
      })
      state.inputValue = ''
      state.nextId++
    }
  },
  // 删除任务
  mutDel(state, id) {
    state.list.splice(state.list.findIndex(item => item.id === id), 1)
  },
  // 变更任务状态
  mutStatus(state, id) {
    let index = state.list.findIndex(item => item.id === id)
    state.list[index].done = !state.list[index].done
  }
}
const getters = {
  unDoneLength(state) {
    return state.list.filter(item => item.done === false).length
  },
  doneLength(state) {
    return state.list.filter(item => item.done === true).length
  }
}
const actions = {
  // context参数就相当于是把Store对象复制了一份儿
  actGetList(context) {
    // 请求数据
    Axios.get('/list.json').then(res => {
      console.log('请求到的数据：', res)
      let { data } = res
      context.commit('mutChangeList', data)
    })
  }
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
