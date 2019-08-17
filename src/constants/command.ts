export interface SelectItem {
    name: string;
    desc: string;
    cmd: () => void;
}

export enum CommandType {
    default = "",
    go = "go"
}