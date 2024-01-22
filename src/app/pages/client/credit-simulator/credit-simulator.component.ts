import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-credit-simulator',
  templateUrl: './credit-simulator.component.html',
  styleUrls: ['./credit-simulator.component.scss'],
})
export class CreditSimulatorComponent {
  loanForm: FormGroup;
  step = 0;
  repaymentOptions: any[] = [
    { name: 'Cuota Constante', code: 'cuota_constante' },
  ];
  rateOptions: any[] = [{ name: 'Tasa Vencida (V)', code: 'tasa_vencida' }];
  repayment: any;
  rate: any;
  todayDate = new Date();
  constructor(
    private fb: FormBuilder,
    protected conService: ConnectionService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    protected utils: UtilsService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.repayment = this.repaymentOptions[0];
    this.rate = this.rateOptions[0];
    this.initializeForm();
  }

  initializeForm(): void {
    this.loanForm = this.fb.group({
      loanAmount: [null, [Validators.required, Validators.min(1)]],
      numberOfInstallments: [null, [Validators.required, Validators.min(1)]],
      installmentType: [null, Validators.required],
      disbursementDate: [null, Validators.required],
      paymentDate: [null, Validators.required],
      interestRate: [null, [Validators.required, Validators.min(0)]],
      otherRate: [0.0, [Validators.required, Validators.min(0)]],
    });
  }

  simulatorData: any;

  simulatorHeader = [
    { field: 'balance', header: 'Balance', pipe: 'currency' },
    { field: 'datePeriod', header: 'Fecha del Período', pipe: null },
    { field: 'interest', header: 'Interés', pipe: 'currency' },
    { field: 'other', header: 'Otros', pipe: 'currency' },
    { field: 'payment', header: 'Pago', pipe: 'currency' },
    { field: 'period', header: 'Período', pipe: null },
    { field: 'quota', header: 'Cuota', pipe: 'currency' },
  ];
  goNext() {
    switch (this.step) {
      case 0:
        this.step = 1;
        break;
      case 1:
        console.log('Calcular');
        this.conService.calculateSimulator(this.loanForm.value).subscribe({
          next: (response) => {
            if (response.success == true) {
              this.messageService.add({
                severity: 'success',
                summary: 'Cálculo exitoso',
                detail: '',
              });
              this.simulatorData = response.data;
            }
          },
        });
        this.step = 2;
        break;
      default:
        break;
    }
  }

  // goBack() {
  //   debugger;
  //   console.log(this.step);
  //   switch (this.step) {
  //     case 1:
  //       this.step = 0;
  //       break;
  //     case 2:
  //       this.step = 1;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  nextBtn() {
    if (this.step == 0 || (this.step == 1 && this.loanForm.valid)) {
      return true;
    } else {
      return false;
    }
  }

  onDateSelect(event: any) {
    const formattedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
    this.loanForm.controls['disbursementDate'].setValue(formattedDate);
    this.loanForm.controls['paymentDate'].setValue(formattedDate);
  }

  printPage() {
    window.print();
  }
}
