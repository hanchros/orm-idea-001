import type { Model } from './Model'

export type Attrribute =
  | Attr
  | Nullable
  | Str
  | Num
  | Bool
  | Method
  | HasOne
  | HasMany

export interface Attr<T = any> {
  type: T
  nullable(): Nullable<T>
}

export type Nullable<T = any> = Attr<T | null>

export type Str = Attr<string>
export type Num = Attr<number>
export type Bool = Attr<boolean>

export interface Method<
  Required extends string = any,
  FnArgs extends any[] = any[],
  FnReturn = any
> {
  (...args: FnArgs): FnReturn
  required: Required
  fn: (...args: FnArgs) => FnReturn
}

export interface Relation<T extends Model = any> {
  type: 'one' | 'many'
  related: T
}

export interface HasOne<T extends Model = any> extends Relation<T> {
  type: 'one'
}

export interface HasMany<T extends Model = any> extends Relation<T> {
  type: 'many'
}

export type RequiredFieldsFromArray<T extends (string | Method)[]> =
  T extends (infer U)[]
    ? U extends Method<infer R> ? Method<R>['required'] : U
    : never

export function attr<T>(): Attr<T> {

}

export function str(): Str {

}

export function num(): Num {

}

export function bool(): Bool {

}

export function method<
  Required extends string | Method,
  FnArgs extends any[],
  FnReturn
>(
  required: Required[],
  fn: (...args: FnArgs) => FnReturn
): Method<RequiredFieldsFromArray<Required[]>, FnArgs, FnReturn> {

}

export function hasOne<T extends Model>(relation: T): HasOne<T> {

}

export function hasMany<T extends Model>(relation: T): HasMany<T> {

}
