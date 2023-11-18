import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auxiliaries',
  templateUrl: './auxiliaries.component.html',
  styleUrls: ['./auxiliaries.component.scss']
})
export class AuxiliariesComponent {

  auxiliaries: FormGroup;
  consultOptions: any[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.auxiliaries = this.fb.group({
      consultType: ['', Validators.required],
      date: ['', Validators.required],
    })

    this.consultOptions = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  onSubmit(){
  }


}
