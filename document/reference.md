# Jsonarch Reference

Jsonarch is JSON to JSON processor for JavaScript/TypeScript, Commandline( requires [Node.js](https://nodejs.org/) ).

## Feature

- Secure meta programmable JSON
- Profiler ( systerm, code, data )
- Origin map ( code, data )
- Influence map ( code, data )
- Call graph ( code )

## Overview

Minimum processing flow

```mermaid
graph LR;
    T[Template JSON]-->J(Jsonarch);
    J(Jsonarch)-->O[Output JSON];
```

Maximum processing flow

```mermaid
graph LR;
    T[Template JSON]-->J(Jsonarch);
    P[Parameter JSON]-->J(Jsonarch);
    C[Cache JSON]-->J(Jsonarch);
    S[Setting JSON]-->J(Jsonarch);
    subgraph R[Result JSON]
        M((Meta data));
        O[Output JSON];
    end
    J(Jsonarch)-->M((Meta data));
    J(Jsonarch)-->O[Output JSON];
```

|File|Description|
|---|---|
|[Template JSON](#template-json)|Code.|
|[Parameter JSON](#parameter-json)|Data ( optional ).|
|[Cache JSON](#cache-json)|Cache ( optional ).|
|[Setting JSON](#setting-json)|Settings ( optional ).|
|[Result JSON](#result-json)|Output JSON with meta data( profile result, origin map, influence map, call graph, etc ).|
|[Output JSON](#output-json)|Generated JSON.|

## Template JSON

## Parameter JSON

## Cache JSON

## Setting JSON

see [Setting JSON schema reference](./schema.md#setting-json)

## Result JSON

## Output JSON

## Sequence

### Process Sequence

1. Load Setting JSON as Template JSON with boot Setting JSON.
2. Load Template JSON.
3. Load Parameter JSON.

### File Load Sequence

1. Resolve path.
2. Load from cache, if any.
3. Load by handler, if any. ( module only. Handlers cannot be specified on the command line. )
4. Load by `XMLHttpRequest` or `https` or `fs`.

## commandline tool

see [Jsonarch Commandline Tool Reference](./commandline.md)

## $arch Statements

## Functions

## Types
