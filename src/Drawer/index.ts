import Sprite from "./Sprite/index";
import Canvas from "./Canvas/index";
import {includeWindowVar, len, random} from "./Util/index";
import {futimes} from "fs";


export default class Drawer {

  private play: boolean = false;
  private inter: number = 0;
  private register: Array<any> = [];
  private config: object;

  constructor (props) {
    this.config = {...props};

    console.log('Drawer');
  }

  private innerRunner () {
    if (!this.play) return;

    this.inter ++;
    this.register.forEach((f) => {
      f(this.inter);
    });
    this.run();
  }

  public run () {
    window.requestAnimationFrame(this.innerRunner);
  }

  public draw (props: object, callback: any) {
    const p = { ...props };
    const f = callback.bind({ ...props });
    this.register.push(f);
    return { props: p, handler: f };
  }

}


includeWindowVar('Drawer', Drawer);
