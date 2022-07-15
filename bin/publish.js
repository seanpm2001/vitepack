const pc = require('picocolors');
const { resolve, relative } = require('node:path');
const { copyFile, constants } = require('node:fs');

const [ arg ] = process.argv.splice(2);
const warn = pc.yellow(`warn`);
const error = pc.red(`error`);
const info = pc.blue(`info`);

if (arg !== 'publish') {
    console.error(`${error} Command "${arg}" not found.`);
    console.log(`${info} There's really only one command right now… "publish".`);
    console.log(`${info} This will stub out some build configuration files if they do not already exist.`);

    process.exit();
}

const paths = [
    [ resolve(__dirname, '../stubs/.browserslistrc'), resolve(process.cwd(), '.browserslistrc') ],
    [ resolve(__dirname, '../stubs/.env'), resolve(process.cwd(), '.env') ],
    [ resolve(__dirname, '../stubs/.eslintrc.js'), resolve(process.cwd(), '.eslintrc.js') ],
    [ resolve(__dirname, '../stubs/babel.config.js'), resolve(process.cwd(), 'babel.config.js') ],
    [ resolve(__dirname, '../stubs/postcss.config.js'), resolve(process.cwd(), 'postcss.config.js') ],
    [ resolve(__dirname, '../stubs/svelte.config.js'), resolve(process.cwd(), 'svelte.config.js') ],
    [ resolve(__dirname, '../stubs/tailwind.config.js'), resolve(process.cwd(), 'tailwind.config.js') ]
];

for (const [ src, dest ] of paths) {
    const file = pc.green(relative(process.cwd(), dest));

    copyFile(src, dest, constants.COPYFILE_EXCL, error => {
        if (error) {
            return console.warn(`${warn} ${file} already exists.`);
        }

        console.log(`${info} ${file} added to project.`);
    });
}
