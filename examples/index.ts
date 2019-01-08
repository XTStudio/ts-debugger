class Foo {

    t() {
        this.f()
        console.log("Hello, World!")
    }

    f() {
        let x = 1
        let y = 2
        console.log(x + y)
    }

}

var e = new Foo().t()
