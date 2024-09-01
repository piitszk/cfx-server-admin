import { join, isAbsolute } from "path"
import { readdirSync, statSync } from "fs"
import { FileScanProps } from "@/types/files"

export function IsRelativePath(Path: string){
    return !isAbsolute(Path) && (Path.startsWith('./') || Path.startsWith('../') || /^[a-zA-Z]:\\/.test(Path))
}

export function ProvideAbsolutePath(Path: string, RelativePath: string){
    return IsRelativePath(RelativePath) ? join(Path, RelativePath) : RelativePath
}

export default function Files(Root: string, Properties: FileScanProps, Callback: Function){
    Root = ProvideAbsolutePath(Properties.root || __dirname, Root)
    const FilesArray = readdirSync(Root)

    FilesArray.forEach(File => {
        const Path = join(Root, File)

        if (statSync(Path).isDirectory()) {
            Files(Path, Properties, Callback)
        } else if (Properties.extensions && Properties.extensions.map(type => File.endsWith(type)).filter(Content => Content == true).length > 0) {
            Callback(Path)
        }
    })
}

