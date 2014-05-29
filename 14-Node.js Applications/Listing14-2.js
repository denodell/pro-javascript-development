var index = 2,
    length = process.argv.length;

// We start from index 2 as the first two arguments are node itself and the filename
// we are executing
for (; index < length; index++) {
    console.log(process.argv[index]);
}