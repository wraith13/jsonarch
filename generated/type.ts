import { EvilType } from "../evil-type.ts/common/evil-type";
export { EvilType };
export namespace Type
{
    export type JsonableValue = null | boolean | number | string;
    export type JsonbleObjectBody =
    {
        [ key: string ]: Type.Jsonable;
    }
    export interface JsonbleObjectConstraint
    {
        $arch: never;
    }
    export type JsonableObject = Type.JsonbleObjectBody & Type.JsonbleObjectConstraint;
    export type Jsonable = Type.JsonableValue | Type.JsonableObject | (Type.Jsonable[]);
    export type RawJsonable = Type.JsonableValue | Type.JsonbleObjectBody | (Type.RawJsonable[]);
    export interface AlphaJsonarch
    {
        $arch: string;
    }
    export interface SystemType
    {
        $arch: "type";
        type: "never" | "unknown" | "any" | "null";
    }
    export interface NullType
    {
        $arch: "type";
        type: "null";
        optional?: boolean;
    }
    export interface BooleanType
    {
        $arch: "type";
        type: "boolean";
        enum?: boolean[];
        optional?: boolean;
    }
    export type NumberType = Type.RegularNumberType | Type.EnumNumberType;
    export interface RegularNumberType
    {
        $arch: "type";
        type: "number";
        integerOnly?: boolean;
        minValue?: number;
        maxValue?: number;
        optional?: boolean;
    }
    export interface EnumNumberType
    {
        $arch: "type";
        type: "number";
        enum: number[];
        optional?: boolean;
    }
    export interface RegularStringType
    {
        $arch: "type";
        type: "string";
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        optional?: boolean;
    }
    export interface EnumStringType
    {
        $arch: "type";
        type: "string";
        enum: string[];
        optional?: boolean;
    }
    export type StringType = Type.RegularStringType | Type.EnumStringType;
    export type ValueType = Type.NullType | Type.BooleanType | Type.NumberType | Type.StringType;
    export interface ArrayType
    {
        $arch: "type";
        type: "array";
        itemType: Type.Type;
        optional?: boolean;
    }
    export interface TupleType
    {
        $arch: "type";
        type: "tuple";
        list: Type.Type[];
    }
    export interface ObjectType
    {
        $arch: "type";
        type: "tuple";
        member: { [ key: string ]: Type.Type; };
    }
    export interface OrCompositeType
    {
        $arch: "type";
        type: "or";
        list: Type.Type[];
    }
    export interface AndCompositeType
    {
        $arch: "type";
        type: "and";
        list: Type.Type[];
    }
    export type CompositeType = Type.OrCompositeType | Type.AndCompositeType;
    export interface TemplateType
    {
        $arch: "type";
        type: "template";
        parameter: Type.Type;
        return: Type.Type;
    }
    export interface MetaType
    {
        $arch: "type";
        type: "meta";
        parameter: Type.Type;
        return: Type.Type;
    }
    export type Type = Type.SystemType | Type.ValueType | Type.ArrayType | Type.TupleType | Type.ObjectType | Type.CompositeType | Type.TemplateType |
        Type.MetaType;
    export type Arch = Type.PathValue | Type.JsonValue | Type.CallValue | Type.Type;
    export interface RootConstraint
    {
        $schema: "https://raw.githubusercontent.com/wraith13/evil-type.ts/master/generated/schema/type.json#" | never;
    }
    export type Root = Type.RootConstraint & (Type.Arch | Type.Jsonable);
    export const isJsonableValue: EvilType.Validator.IsType<JsonableValue> = EvilType.Validator.isOr(EvilType.Validator.isNull, EvilType.Validator.isBoolean,
        EvilType.Validator.isNumber, EvilType.Validator.isString);
    export const isJsonbleObjectBody: EvilType.Validator.IsType<JsonbleObjectBody> = EvilType.lazy(() => EvilType.Validator.isDictionaryObject(Type.isJsonable)
        );
    export const isJsonbleObjectConstraint = EvilType.lazy(() => EvilType.Validator.isSpecificObject(jsonbleObjectConstraintValidatorObject, {
        additionalProperties: false }));
    export const isJsonableObject: EvilType.Validator.IsType<JsonableObject> = EvilType.lazy(() => EvilType.Validator.isAnd(Type.isJsonbleObjectBody,
        Type.isJsonbleObjectConstraint));
    export const isJsonable: EvilType.Validator.IsType<Jsonable> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isJsonableValue, Type.isJsonableObject,
        EvilType.Validator.isArray(Type.isJsonable)));
    export const isRawJsonable: EvilType.Validator.IsType<RawJsonable> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isJsonableValue,
        Type.isJsonbleObjectBody, EvilType.Validator.isArray(Type.isRawJsonable)));
    export const isAlphaJsonarch = EvilType.lazy(() => EvilType.Validator.isSpecificObject(alphaJsonarchValidatorObject, { additionalProperties: false }));
    export const isSystemType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(systemTypeValidatorObject, { additionalProperties: false }));
    export const isNullType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(nullTypeValidatorObject, { additionalProperties: false }));
    export const isBooleanType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(booleanTypeValidatorObject, { additionalProperties: false }));
    export const isNumberType: EvilType.Validator.IsType<NumberType> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isRegularNumberType,
        Type.isEnumNumberType));
    export const isRegularNumberType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(regularNumberTypeValidatorObject, { additionalProperties: false
        }));
    export const isEnumNumberType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(enumNumberTypeValidatorObject, { additionalProperties: false }));
    export const isRegularStringType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(regularStringTypeValidatorObject, { additionalProperties: false
        }));
    export const isEnumStringType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(enumStringTypeValidatorObject, { additionalProperties: false }));
    export const isStringType: EvilType.Validator.IsType<StringType> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isRegularStringType,
        Type.isEnumStringType));
    export const isValueType: EvilType.Validator.IsType<ValueType> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isNullType, Type.isBooleanType,
        Type.isNumberType, Type.isStringType));
    export const isArrayType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(arrayTypeValidatorObject, { additionalProperties: false }));
    export const isTupleType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(tupleTypeValidatorObject, { additionalProperties: false }));
    export const isObjectType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(objectTypeValidatorObject, { additionalProperties: false }));
    export const isOrCompositeType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(orCompositeTypeValidatorObject, { additionalProperties: false }));
    export const isAndCompositeType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(andCompositeTypeValidatorObject, { additionalProperties: false })
        );
    export const isCompositeType: EvilType.Validator.IsType<CompositeType> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isOrCompositeType,
        Type.isAndCompositeType));
    export const isTemplateType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(templateTypeValidatorObject, { additionalProperties: false }));
    export const isMetaType = EvilType.lazy(() => EvilType.Validator.isSpecificObject(metaTypeValidatorObject, { additionalProperties: false }));
    export const isType: EvilType.Validator.IsType<Type> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isSystemType, Type.isValueType, Type.isArrayType,
        Type.isTupleType, Type.isObjectType, Type.isCompositeType, Type.isTemplateType, Type.isMetaType));
    export const isArch: EvilType.Validator.IsType<Arch> = EvilType.lazy(() => EvilType.Validator.isOr(Type.isPathValue, Type.isJsonValue, Type.isCallValue,
        Type.isType));
    export const isRootConstraint = EvilType.lazy(() => EvilType.Validator.isSpecificObject(rootConstraintValidatorObject, { additionalProperties: false }));
    export const isRoot: EvilType.Validator.IsType<Root> = EvilType.lazy(() => EvilType.Validator.isAnd(Type.isRootConstraint, EvilType.Validator.isOr(
        Type.isArch, Type.isJsonable)));
    export const jsonbleObjectConstraintValidatorObject: EvilType.Validator.ObjectValidator<JsonbleObjectConstraint> = ({ $arch: { "$type": "never-type-guard"
        } as const, });
    export const alphaJsonarchValidatorObject: EvilType.Validator.ObjectValidator<AlphaJsonarch> = ({ $arch: EvilType.Validator.isString, });
    export const systemTypeValidatorObject: EvilType.Validator.ObjectValidator<SystemType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isEnum([ "never", "unknown", "any", "null" ] as const), });
    export const nullTypeValidatorObject: EvilType.Validator.ObjectValidator<NullType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("null" as const), optional: EvilType.Validator.isOptional(EvilType.Validator.isBoolean), });
    export const booleanTypeValidatorObject: EvilType.Validator.ObjectValidator<BooleanType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("boolean" as const), enum: EvilType.Validator.isOptional(EvilType.Validator.isArray(EvilType.Validator.isBoolean)), optional:
        EvilType.Validator.isOptional(EvilType.Validator.isBoolean), });
    export const regularNumberTypeValidatorObject: EvilType.Validator.ObjectValidator<RegularNumberType> = ({ $arch: EvilType.Validator.isJust("type" as const)
        , type: EvilType.Validator.isJust("number" as const), integerOnly: EvilType.Validator.isOptional(EvilType.Validator.isBoolean), minValue:
        EvilType.Validator.isOptional(EvilType.Validator.isNumber), maxValue: EvilType.Validator.isOptional(EvilType.Validator.isNumber), optional:
        EvilType.Validator.isOptional(EvilType.Validator.isBoolean), });
    export const enumNumberTypeValidatorObject: EvilType.Validator.ObjectValidator<EnumNumberType> = ({ $arch: EvilType.Validator.isJust("type" as const), type
        : EvilType.Validator.isJust("number" as const), enum: EvilType.Validator.isArray(EvilType.Validator.isNumber), optional: EvilType.Validator.isOptional(
        EvilType.Validator.isBoolean), });
    export const regularStringTypeValidatorObject: EvilType.Validator.ObjectValidator<RegularStringType> = ({ $arch: EvilType.Validator.isJust("type" as const)
        , type: EvilType.Validator.isJust("string" as const), minLength: EvilType.Validator.isOptional(EvilType.Validator.isNumber), maxLength:
        EvilType.Validator.isOptional(EvilType.Validator.isNumber), pattern: EvilType.Validator.isOptional(EvilType.Validator.isString), optional:
        EvilType.Validator.isOptional(EvilType.Validator.isBoolean), });
    export const enumStringTypeValidatorObject: EvilType.Validator.ObjectValidator<EnumStringType> = ({ $arch: EvilType.Validator.isJust("type" as const), type
        : EvilType.Validator.isJust("string" as const), enum: EvilType.Validator.isArray(EvilType.Validator.isString), optional: EvilType.Validator.isOptional(
        EvilType.Validator.isBoolean), });
    export const arrayTypeValidatorObject: EvilType.Validator.ObjectValidator<ArrayType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("array" as const), itemType: Type.isType, optional: EvilType.Validator.isOptional(EvilType.Validator.isBoolean), });
    export const tupleTypeValidatorObject: EvilType.Validator.ObjectValidator<TupleType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("tuple" as const), list: EvilType.Validator.isArray(Type.isType), });
    export const objectTypeValidatorObject: EvilType.Validator.ObjectValidator<ObjectType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("tuple" as const), member: EvilType.Validator.isDictionaryObject(Type.isType), });
    export const orCompositeTypeValidatorObject: EvilType.Validator.ObjectValidator<OrCompositeType> = ({ $arch: EvilType.Validator.isJust("type" as const),
        type: EvilType.Validator.isJust("or" as const), list: EvilType.Validator.isArray(Type.isType), });
    export const andCompositeTypeValidatorObject: EvilType.Validator.ObjectValidator<AndCompositeType> = ({ $arch: EvilType.Validator.isJust("type" as const),
        type: EvilType.Validator.isJust("and" as const), list: EvilType.Validator.isArray(Type.isType), });
    export const templateTypeValidatorObject: EvilType.Validator.ObjectValidator<TemplateType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("template" as const), parameter: Type.isType, return: Type.isType, });
    export const metaTypeValidatorObject: EvilType.Validator.ObjectValidator<MetaType> = ({ $arch: EvilType.Validator.isJust("type" as const), type:
        EvilType.Validator.isJust("meta" as const), parameter: Type.isType, return: Type.isType, });
    export const rootConstraintValidatorObject: EvilType.Validator.ObjectValidator<RootConstraint> = ({ $schema: EvilType.Validator.isOr(
        EvilType.Validator.isJust("https://raw.githubusercontent.com/wraith13/evil-type.ts/master/generated/schema/type.json#" as const),
        EvilType.Validator.isNever), });
}
