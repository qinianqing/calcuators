const isNumber = (expr: string) => !Number.isNaN(parseFloat(expr))
const tokens = ['+', '-', '*', '/', '(', ')']

const stackTopIn = (stack: any[], tokens: any[]) => {
    for (let token of tokens) {
        if (stack[stack.length - 1] === token) { return true }
    }
    return false
}

function splitExpreion(expreion: string): string[] {
    let expr: string = expreion
    for (let token of tokens) {
        expr = expr.split(token).join(`|${token}|`)
    }
    return expr.split('|').map(t => t.trim()).filter(t => t !== '')
}

function suffixArray(exprArray: string[]) {
    let outStack: string[] = []
    let symbolStack: string[] = []
    for (let expr of exprArray) {
        if (isNumber(expr)) {
            outStack.push(expr)
            continue
        }

        if (symbolStack.length === 0) {
            symbolStack.push(expr)
            continue
        }

        if (expr === '*' || expr === '/') {
            while (stackTopIn(symbolStack, ['*', '/'])) {
                outStack.push(symbolStack.pop())
            }
            symbolStack.push(expr)
            continue
        }

        if (expr === '+' || expr === '-') {
            while (stackTopIn(symbolStack, ['*', '/', '+', '-'])) {
                outStack.push(symbolStack.pop())
            }
            symbolStack.push(expr)
            continue
        }

        if (expr === '(') {
            symbolStack.push(expr)
            continue
        }

        if (expr === ')') {
            while (stackTopIn(symbolStack, ['*', '/', '+', '-'])) {
                outStack.push(symbolStack.pop())
            }
            symbolStack.pop()
            continue
        }
    }
  //合并数组，
    return outStack.concat(symbolStack.reverse())
}

function clacStack(outStack: string[]): number {
    let calcStack: number[] = []
    while (outStack.length > 0) {
        let e = outStack.shift()
        if (isNumber(e)) {
            calcStack.push(parseFloat(e))
            continue
        }
        let l: number, r: number
        r = calcStack.pop()
        l = calcStack.pop()
        switch (e) {
            case '+':
                calcStack.push(l + r)
                break
            case '-':
                calcStack.push(l - r)
                break
            case '*':
                calcStack.push(l * r)
                break
            case '/':
                calcStack.push(l / r)
                break
        }
    }
    return calcStack.pop()
}


export function calc(expreion: string): number {
    let exprArray = splitExpreion(expreion)
    let outStack = suffixArray(exprArray)
    console.log(outStack)
    return clacStack(outStack)
}
