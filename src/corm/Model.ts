import type { ObjectFromUnion } from './Types'
import type { Attrribute, Attr, Method, HasOne, HasMany } from './Attr'

export interface Model<D extends Definition<any> = any> {
  setup: Setup<D>
  definition: D
  make<T extends Data<D>>(data: T): Instance<D, T>
}

export type Setup<D extends Definition<any>> = () => D

export type Definition<Schema> = {
  [Key in keyof Schema]: Schema[Key]
}

export type Data<D extends Definition<any>> = Partial<{
  [Key in keyof D]: GetDataFieldType<D[Key]>
}>

export type Instance<D extends Definition<any>, R extends Data<D>> = {
  [Key in keyof D as ExcludeNeverFields<Key, D[Key], R, R[Key]>]: GetInstanceFieldType<D[Key], R[Key]>
}

type ExcludeNeverFields<Key, Type, R, RType> =
  Type extends Method<infer Required> ? R extends ObjectFromUnion<Required>
    ? Key
    : never
: RType extends string ? Key
: RType extends number ? Key
: RType extends boolean ? Key
: RType extends null ? Key
: RType extends object ? Key
: never

type GetDataFieldType<T extends Attrribute> =
  T extends () => HasOne<infer U> ? Data<U['definition']>
: T extends () => HasMany<infer U> ? Data<U['definition']>[]
: T extends Attr<infer U> ? Attr<U>['type'] | undefined
: never

type GetInstanceFieldType<T extends Attrribute, R> =
  T extends () => HasOne<infer U> ? Instance<U['definition'], R>
: T extends () => HasMany<infer U> ? R extends (infer V)[] ? Instance<U['definition'], V>[] : never
: T extends Method<any, infer A, infer R> ? Method<any, A, R>['fn']
: T extends Attr<infer U> ? Attr<U>['type']
: never

export function defineModel<Schema>(setup: Setup<Definition<Schema>>): Model<Definition<Schema>> {

}
