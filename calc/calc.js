"use strict";
exports.__esModule = true;
var isNumber = function (expr) { return !Number.isNaN(parseFloat(expr)); };
var tokens = ['+', '-', '*', '/', '(', ')'];
var stackTopIn = function (stack, tokens) {
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (stack[stack.length - 1] === token) {
            return true;
        }
    }
    return false;
};
function splitExpreion(expreion) {
    var expr = expreion;
    for (var _i = 0, tokens_2 = tokens; _i < tokens_2.length; _i++) {
        var token = tokens_2[_i];
        expr = expr.split(token).join("|" + token + "|");
    }
    return expr.split('|').map(function (t) { return t.trim(); }).filter(function (t) { return t !== ''; });
}
function suffixArray(exprArray) {
    var outStack = [];
    var symbolStack = [];
    for (var _i = 0, exprArray_1 = exprArray; _i < exprArray_1.length; _i++) {
        var expr = exprArray_1[_i];
        if (isNumber(expr)) {
            outStack.push(expr);
            continue;
        }
        if (symbolStack.length === 0) {
            symbolStack.push(expr);
            continue;
        }
        if (expr === '*' || expr === '/') {
            while (stackTopIn(symbolStack, ['*', '/'])) {
                outStack.push(symbolStack.pop());
            }
            symbolStack.push(expr);
            continue;
        }
        if (expr === '+' || expr === '-') {
            while (stackTopIn(symbolStack, ['*', '/', '+', '-'])) {
                outStack.push(symbolStack.pop());
            }
            symbolStack.push(expr);
            continue;
        }
        if (expr === '(') {
            symbolStack.push(expr);
            continue;
        }
        if (expr === ')') {
            while (stackTopIn(symbolStack, ['*', '/', '+', '-'])) {
                outStack.push(symbolStack.pop());
            }
            symbolStack.pop();
            continue;
        }
    }
    //合并数组，
    return outStack.concat(symbolStack.reverse());
}
function clacStack(outStack) {
    var calcStack = [];
    while (outStack.length > 0) {
        var e = outStack.shift();
        if (isNumber(e)) {
            calcStack.push(parseFloat(e));
            continue;
        }
        var l = void 0, r = void 0;
        r = calcStack.pop();
        l = calcStack.pop();
        switch (e) {
            case '+':
                calcStack.push(l + r);
                break;
            case '-':
                calcStack.push(l - r);
                break;
            case '*':
                calcStack.push(l * r);
                break;
            case '/':
                calcStack.push(l / r);
                break;
        }
    }
    return calcStack.pop();
}
function calc(expreion) {
    var exprArray = splitExpreion(expreion);
    console.log(exprArray)
    var outStack = suffixArray(exprArray);
    console.log(outStack);
    return clacStack(outStack);
}
exports.calc = calc;
