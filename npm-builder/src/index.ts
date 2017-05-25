import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";

import { packageSelection } from "./package/package-selection";
import { Walker } from "./package/package-walker";
import { localPackages } from "./package/local-packages";
import { packageDir } from "./package/package-dir";

import { Task, createContext, createTask } from "./task";
import { isNullOrUndefined } from "util";


const args = ArgsQuery.value;

console.log(`Packages: ${localPackages.map(x => x.name).join(", ")}`);
const selection = packageSelection(args, localPackages);
console.log(`Package Selection: ${selection.map(x => x.name).join(", ")}`);

const tasks: Task[] = [
    createTask(createContext("clean", args, selection)),
    createTask(createContext("build", args, selection)),
];

shell.cd(root);
 const log: string[] = [];
const walker = Walker(localPackages,
    // ...
    (pkg) => {
        try {
            shell.cd(packageDir(pkg));           
            for (const task of tasks) {
                const result = task.run(pkg);
                log.push(`Package: ${pkg.name}, Task: ${task.name} -> ${result}`);
            }            
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            shell.cd(root);
        }
    },
    pkg => !isNullOrUndefined(selection.find(x => x.name === pkg.name)));

const result = walker.walk();
console.log(log.join("\n"));
console.log(result.completed.map(x => `completed: ${x.name}`).join("\n"));
process.exit(result.ok ? 1 : -1);