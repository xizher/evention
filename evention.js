const ERROR_MUST_STRING = '首参需为字符串类型'
const ERROR_MUST_FUNCTION = '第二参需为函数类型'

/**
 * 事件监听处理器
 */
export class Evention {

  /**
   * 事件集合
   * @type { Object<string, Function> }
   */
  #events

  /**
   * 构造函数：事件监听处理器
   */
  constructor () {
    this.#events = {}
  }

  /**
   * 绑定事件
   * @param { string } name 事件名称
   * @param { () => * } fn 事件处理函数
   * @param { * } scope 事件处理函数上下文
   * @returns { () => * } 事件处理函数
   */
  on (name, fn, scope) {
    if (typeof name !== 'string') {
      console.error(ERROR_MUST_STRING)
    } else if (typeof fn !== 'function') {
      console.error(ERROR_MUST_FUNCTION)
    } else {
      name = name.toLowerCase()
      this.#events[name] || (this.#events[name] = [])
      // this.#events?.[name] ?? (this.#events[name] = [])
      this.#events[name].push(scope ? [fn, scope] : [fn])
    }
    return fn
  }

  /**
   * 触发事件
   * @param { string } name 触发的事件名称
   * @param { * } data 触发传递的数据
   */
  fire (name, data) {
    name = name.toLowerCase()
    const eventArr = this.#events[name]
    if (eventArr) {
      const event = Object.assign({
        name, // 事件类型
        origin: this, // 绑定的源
      }, data)
      const len = eventArr.length
      for (let i = 0; i < eventArr.length; i++) {
        const item = eventArr[i]
        let fn = item[0]
        // event.scope = item[1] ?? {}
        event.scope = item[1] || {}
        fn(event)
        if (eventArr.length < len) {
          i--
        }
      }
    }
  }

  /**
   * 取消特定的绑定事件
   * @param { string } name 取消的绑定事件
   * @param { () => * } fn 需要的判定事件处理函数（null则移除全部）
   */
  off (name, fn) {
    name = name.toLowerCase()
    const eventArr = this.#events[name]
    if (!eventArr || eventArr.length === 0) {
      return
    }
    if (fn) {
      for (let i = 0; i < eventArr.length; i++) {
        if (fn === eventArr[i][0]) {
          eventArr.splice(i, 1)
          i-- // 可能存在一个事件一个函数绑定多次的情况
        }
      }
    } else {
      eventArr.splice(0, eventArr.length)
    }
  }

  /**
   * 绑定一次性事件
   * @param { string } name 事件名称
   * @param { () => void } fn 事件处理函数
   * @param { * } scope 事件处理函数上下文
   * @returns { () => * } 事件处理函数
   */
  once (name, fn, scope) {
    const _self = this
    function nfn () {
      _self.off(name, nfn)
      fn.apply(scope || _self, arguments)
    }
    this.on(name, nfn, scope)
    return fn
  }

}
