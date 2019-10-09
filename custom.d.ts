declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "*.json" {
    const value: any;
    export default value;
}
declare module Rx {
    export interface Observable{
        debug: () => any;
    }
}