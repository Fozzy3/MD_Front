import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubTitleService {
  data = {
    title: "",
    subTitle: "",
    helpTitle: "",
    helpText: ""
  };

  dataContent = new Subject<any>();

  constructor() {
    this.dataContent.next(this.data);
  }


  updateMenu(menu){
    this.dataContent.next(menu);
  }

}
