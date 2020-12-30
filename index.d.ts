/**
 * 事件监听处理器
 */
export declare class Evention {

  /**
   * 绑定事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  on (name: string, fn: (events: { name: string, origin: any }) => any, scope?: any): () => any
  
  /**
   * 触发事件
   * @param name 触发的事件名称
   * @param data 触发传递的数据
   */
  fire (name: string, data?: any): void
  
  /**
   * 取消特定的绑定事件
   * @param name 取消的绑定事件
   * @param fn 需要的判定事件处理函数（null则移除全部）
   */
  off (name: string, fn?: (events: { name: string, origin: any }) => any): void
  
  /**
   * 绑定一次性事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  once (name: string, fn?: (events: { name: string, origin: any }) => any, scope?: any): () => any

}
