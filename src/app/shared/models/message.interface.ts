type MapType = {
  [id: string]: string
}
export interface MessageInterface {
  id?: string
  key: string
  messages: MapType
  moduleName?: string
}
