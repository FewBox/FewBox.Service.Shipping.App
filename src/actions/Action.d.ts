interface IActionMeta{
    type: string;
}
export interface IPayloadAction<T = any> extends IActionMeta{
    payload: T
}
export interface IAction<T = any> extends IActionMeta{
    value: T
}
export interface IEmptyAction extends IActionMeta{
}