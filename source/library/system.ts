export const isConsoleMode = typeof window === 'undefined';
export const fs = isConsoleMode ? require("fs"): undefined;
export const https = isConsoleMode ? require("https"): undefined;
export const getLocale = () => isConsoleMode ?
    Intl.DateTimeFormat().resolvedOptions().locale:
    navigator.language;
export const loadNetFile = isConsoleMode ?
    (path: string) => new Promise<string>
    (
        (resolve, reject) => https.get
        (
            path, (response: any) =>
            {
                //console.log('statusCode:', response.statusCode);
                //console.log('headers:', response.headers);
                if (200 <= response.statusCode && response.statusCode < 300)
                {
                    let buffer = "";
                    response.on("data", (chunk: string) => buffer += chunk);
                    response.on("end", () => resolve(buffer));
                }
                else
                {
                    reject();
                }
            }
        )
        .on("error", () => reject())
    ):
    (path: string) => new Promise<string>
    (
        (resolve, reject) =>
        {
            const request = new XMLHttpRequest();
            request.open('GET', path, true);
            request.onreadystatechange = function()
            {
                if (4 === request.readyState)
                {
                    if (200 <= request.status && request.status < 300)
                    {
                        resolve(request.responseText);
                    }
                    else
                    {
                        reject();
                    }
                }
            };
            request.send(null);
        }
    );
export const loadLocalFile = isConsoleMode ?
    (path: string): string => fs.readFileSync(path, { encoding: "utf-8" }):
    (_path: string): string => { throw new Error("Not support to load local file on web."); };
