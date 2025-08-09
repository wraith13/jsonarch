#! /usr/bin/env node
import * as process from "process";
import * as fs from "fs";
import { Jsonarch } from "../library";
// console.log(`process.argv: ${JSON.stringify(process.argv)}`);
// console.log(`locale:${Jsonarch.Locale.getSystemLocale()}`);
const parseCommandLineParameters = (argv: string[]) =>
{
    const result: { [key: string]: string[] } = { };
    let key = "default";
    result[key] = [];
    for(let i in argv)
    {
        const current = argv[i];
        if (current.startsWith("-"))
        {
            key = current;
            result[key] = [];
        }
        else
        {
            result[key].push(current);
        }
    }
    return result;
};
interface RegulatedCommandLineParameters
{
    template: string;
    parameter?: string;
    cache?: string;
    setting?: string;
    result?: string;
    output?: string;
}
const showUsage = () =>
{
    console.log("usage: jsonarch template.json -p parameter.json -c cache.json -s setting.json -r result.json -o output.json");
    console.log("Jsonarch Commandline Tool Reference: https://github.com/wraith13/jsonarch/blob/master/document/commandline.md");
};
const showVersion = () =>
{
    console.log(`${Jsonarch.name} v${Jsonarch.version}`);
};
const regulateCommandLineParameters = (params: { [key: string]: string[] }): RegulatedCommandLineParameters | null =>
{
    if (1 === Object.keys(params).length && 0 === params["default"].length)
    {
        showUsage();
        return null;
    }
    else
    if (2 === Object.keys(params).length && 0 === params["default"].length && undefined !== params["-v"])
    {
        showVersion();
        return null;
    }
    else
    {
        const errors: string[] = [];
        const knownParameters = [ "default", "-p", "-c", "-s", "-r", "-o", ];
        const unknownParameters = Object.keys(params).filter(i => knownParameters.indexOf(i) < 0);
        unknownParameters.forEach(i => errors.push(`"${i}" is unknown option`));
        const requireParameters = [ "-t", ];
        const lackParameters = requireParameters.filter(i => params[i]?.length <= 0);
        lackParameters.forEach(i => errors.push(`"${i}" option is required.`));
        const singleParameters = [ "default", "-p", "-c", "-s", "-r", "-o", ];
        const pluralParameters = Object.keys(params).filter(i => 0 < singleParameters.indexOf(i)).filter(i => 2 <= params[i].length);
        pluralParameters.forEach(i => errors.push(`Only one "${i}" option can be specified.`));
        const inputPathParameters = [ "default", "-p", "-c", "-s", ];
        if (2 <= inputPathParameters.filter(key => 0 <= (params[key]?.indexOf("std:in") ?? -1)).length)
        {
            errors.push(`Only one "std:in" can be specified.`);
        }
        const outputPathParameters = [ "-r", "-o", ];
        if (2 <= outputPathParameters.filter(key => 0 <= (params[key]?.indexOf("std:out") ?? -1)).length)
        {
            errors.push(`Only one "std:out" can be specified.`);
        }
        if (2 <= outputPathParameters.filter(key => 0 <= (params[key]?.indexOf("std:err") ?? -1)).length)
        {
            errors.push(`Only one "std:err" can be specified.`);
        }
        if (0 < errors.length)
        {
            errors.forEach(e => console.error(e));
            return null;
        }
        else
        {
            const result: RegulatedCommandLineParameters =
            {
                template: params["default"][0],
                parameter: params["-p"]?.[0],
                cache: params["-c"]?.[0],
                setting: params["-s"]?.[0],
                result: params["-r"]?.[0],
                output: params["-o"]?.[0],
            };
            return result;
        }
    }
};
const readOutStdIn = () => new Promise<string>
(
    resolve =>
    {
        process.stdin.setEncoding("utf8");
        let buffer = "";
        process.stdin.on
        (
            'readable', () =>
            {
                let chunk;
                while (null !== (chunk = process.stdin.read()))
                {
                    buffer += chunk;
                }
            }
        );
        process.stdin.on("end", () => resolve(buffer));
    }
);
async function commandLineArgumentToFileContext<DataType extends Jsonarch.Jsonable = Jsonarch.Jsonable>(path: string): Promise<Jsonarch.FileContext<DataType>>;
async function commandLineArgumentToFileContext<DataType extends Jsonarch.Jsonable = Jsonarch.Jsonable>(path: string | undefined): Promise<Jsonarch.FileContext<DataType> | undefined>;
async function commandLineArgumentToFileContext<DataType extends Jsonarch.Jsonable = Jsonarch.Jsonable>(path: string | undefined): Promise<Jsonarch.FileContext<DataType> | undefined>
{
    switch(path)
    {
    case undefined:
        return undefined;
    case "std:in":
        return { category: "none", data: Jsonarch.jsonParse(await readOutStdIn()), };
    default:
        return Jsonarch.commandLineArgumentToFileContext(path);
    }
}
const writeFile = (path: string, data: string) =>
{
    switch(path)
    {
    case "std:out":
        console.log(data);
        break;
    case "std::err":
        console.error(data);
        break;
    default:
        fs.writeFileSync(path, data);
        break;
    }
};
const callJsonarch = async (argv: RegulatedCommandLineParameters) =>
{
    const process: Jsonarch.Process =
    {
        template: await commandLineArgumentToFileContext(argv.template),
        parameter: await commandLineArgumentToFileContext(argv.parameter),
        cache: await commandLineArgumentToFileContext(argv.cache),
        setting: await commandLineArgumentToFileContext(argv.setting),
    };
    const result = await Jsonarch.process
    ({
        process,
        profile: Jsonarch.makeProfile(),
        handler: { }
    });
    if (argv.result)
    {
        writeFile
        (
            argv.result,
            Jsonarch.jsonToString(result, "result", result.setting)
        );
    }
    if (argv.output || ! argv.result)
    {
        writeFile
        (
            argv.output ?? "std:out",
            Jsonarch.jsonToString(result.output, "output", result.setting)
        );
    }
};
const commandLineParameters = parseCommandLineParameters(process.argv.filter((_i, ix) => 2 <= ix));
// console.log(`commandLineParameters: ${JSON.stringify(commandLineParameters)}`);
const argv = regulateCommandLineParameters(commandLineParameters);
if (argv)
{
    callJsonarch(argv);
}
