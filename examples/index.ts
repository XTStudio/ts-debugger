/// <reference path="../node_modules/xt-studio/types/index.d.ts" />

class MainViewController extends UIViewController {

    redView = new UIView
    yellowView = new UIView
    
    viewDidLoad() {
      super.viewDidLoad()
      this.redView.backgroundColor = UIColor.red
      this.yellowView.backgroundColor = UIColor.yellow
      this.redView.addSubview(this.yellowView)
      this.view.addSubview(this.redView)
      this.sendRequest()
    }
  
    viewWillLayoutSubviews() {
      super.viewWillLayoutSubviews()
      this.redView.frame = {x: 22, y: 22, width: 88, height: 88}
      this.yellowView.frame = {x: 22, y: 22, width: 22, height: 22}
    }

    async sendRequest() {
        try {
            const data = await URLSession.shared.fetch("https://api.github.com")
            console.log(data.utf8String())
        } catch (e) {
            console.log(e)
        }
    }
  
  }

  global.main = new MainViewController