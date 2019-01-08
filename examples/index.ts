class Foo {

    static g = (((a: number) => {
        return a
    }))

    t() {
        this.f()
        let a = (function () {
            console.log('66666'); return "1234567890"
        })()
        console.log("Hello, World!", a, Foo.g(9999))
    }

    f() {
        let x = 1
        let y = 2
        console.log(x + y)
    }

}

var e = new Foo().t()
