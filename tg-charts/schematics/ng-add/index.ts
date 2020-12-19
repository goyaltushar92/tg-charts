import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

const STYLE_TO_ADD = [
    'node_modules/tg-charts/pie/style/pie-default-colour.css'
];


// Just return the tree
export function ngAdd(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const installationTaskId = context.addTask(new NodePackageInstallTask());
        context.addTask(new RunSchematicTask('add-to-styles', options), [installationTaskId]);
        return tree;
    };
}

export function addToStyles(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (tree.exists('angular.json')) {
            const angularConfig = JSON.parse(
                tree.read('angular.json')!.toString()
            );
            if (angularConfig.defaultProject) {
                const architect = angularConfig.projects[angularConfig.defaultProject].architect;
                if (architect) {
                    const build = architect.build;
                    const test = architect.test;

                    addStylesToArchitect(build);
                    addStylesToArchitect(test);

                    if (build || test) {
                        tree.overwrite('angular.json', JSON.stringify(angularConfig, undefined, 2));
                    }
                }

            }
        }
        return tree;
    };
}

function addStylesToArchitect(build: any): void {
    if (build && build.options) {
        if (!build.options.styles) {
            build.options.styles = [];
        }
        for (const style of STYLE_TO_ADD) {
            if (build.options.styles.indexOf(style) === -1) {
                build.options.styles.push(style);
            }
        }
    }
}

