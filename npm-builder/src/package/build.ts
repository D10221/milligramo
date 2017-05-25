import * as shell from "shelljs";
import { Package } from "./Package";
import { TaxContext } from "./Task";

export const Build = (config: TaxContext) => {
    const { enabled, isSelectedForPackage } = config;
    const run = (pkg: Package) => {
        if (!enabled) return "disabled";
        if (!isSelectedForPackage(pkg)) return "unselected";
        if (shell.exec(`npm run build`).code !== 0) {
            throw new Error(`package ${pkg.name} build failed`);
        }
        return "completed";
    };
    return {
        name: "build",
        run
    };
};