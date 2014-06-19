function counter(length) {
    var output = 0,
        index = 0;

    console.time("Loop timer " + length);

    for (; index < length; index++) {
        output = output + index;
    }

    console.timeEnd("Loop timer " + length);
}

counter(10000);
counter(100000);
counter(1000000);