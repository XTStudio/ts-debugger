class Foo {

    t() {
        this.f()
        let a = (function () {
            return "1234567890"
        })()
        console.log("Hello, World!", a)
    }

    f() {
        let x = 1
        let y = 2
        console.log(x + y)
    }

}

var e = new Foo().t()
