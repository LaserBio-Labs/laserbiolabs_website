#!/bin/sh
# takes an a file as argument
# two filters separated by a comma will have the same output piped to them
jq -r '.[] | 
"
<div id=\"\(.anchor)\" class=\"product-section\">
    <div class=\"product-text-img-title-cont\">
        <div class=\"product-text-title-cont\">
            <h1 class=\"product-section-title\">\(.section)</h1>
            <p> \(.text // "" ) </p>
        </div>
        <img src=\"\(.img)\">
    </div>
",
( .products[] | "
    <div class=\"product-cont\">
        <div class=\"title-price-cont\">
            <h2 class=\"product-title\">\(.title)</h2>
            <span class=\"product-price\">\(.price)</span>
        </div>
        <h3 class=\"product-subtitle\">\(.subtitle)</h3>
        <p>\(.text)</p>
        <div class=\"product-graph-cont\">
            <img class=\"product-graph\" src=\"\(.graph // "" )\">
            <div class=\"sidetext\">\(.sidetext // "")</div>
        </div>
    </div>
"),
"</div>"
' $1
#
#( .products[].graph? | "
#    <div class=\"product-graph-cont\">
#        <img src=\"\(.)\">
#    </div>
#"),
