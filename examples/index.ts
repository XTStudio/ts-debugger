function t() {
    console.log("Hello, World")
    return true
}

function a(a: number, b: string): number {
    let x = 1
    let y = 2
    if (t()) {
        console.log("123123")
    }
    console.log(x + y)
    return x + y
}

var e = t()
console.log(a(20, "10"))
