class Foo {

    a = () => {
        return 123
    }

    b() {
        console.log("123123123", this.a())
        return "asdfghjkl"
    }

}

console.log(new Foo().b())