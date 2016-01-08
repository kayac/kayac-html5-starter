"use strict";

import Sample from "./lib/Sample";
import $ from "jquery";

var sample = new Sample({
    name: 'world'
});

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});
