import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-simulator',
  templateUrl: './credit-simulator.component.html',
  styleUrls: ['./credit-simulator.component.scss']
})
export class CreditSimulatorComponent {

  loanForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loanForm = this.fb.group({
      loanAmount: [1000000, [Validators.required, Validators.min(1)]],
      numberOfInstallments: [3, [Validators.required, Validators.min(1)]],
      installmentType: ['diaria', Validators.required],
      disbursementDate: ['2024-01-11', Validators.required],
      paymentDate: ['2024-01-15', Validators.required],
      interestRate: [0.025, [Validators.required, Validators.min(0)]],
      otherRate: [0.0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      // Aquí puedes manejar la lógica de guardado
      console.log(this.loanForm.value);
    }
  }

}
