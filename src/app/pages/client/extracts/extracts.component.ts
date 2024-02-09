import { Component } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.scss'],
})
export class ExtractsComponent {
  step: any = 0;

  constructor(private conService: ConnectionService,
    private messageService: MessageService
    ) {}
  ngOnInit() {}
  nextStep() {
    this.step++;
  }

  originalDta: any;
  data: any;
  tabs: any;
  title: string;

  headers = [
    { field: 'nombre_subaux', header: 'Nombre Subaux.', pipe: null },
    { field: 'nsubcbte', header: 'Nsubcbte', pipe: null },
    { field: 'saldo_actual', header: 'Saldo Actual', pipe: 'currency' },
    { field: 'fecha_ult_liq', header: 'Fecha Ult. Liq.', pipe: null },
    { field: 'fechaproxabono', header: 'Fecha Próx. Abono', pipe: null },
    { field: 'ncuotasxpagar', header: 'Ncuotasxpagar', pipe: null },
    { field: 'mora', header: 'Mora', pipe: 'currency' },
    { field: 'intereses', header: 'Intereses', pipe: null },
    { field: 'ncuotasmora', header: 'Ncuotasmora', pipe: null },
    { field: 'otros', header: 'Otros', pipe: null },
    { field: 'capital', header: 'Capital', pipe: 'currency' },
    { field: 'pago', header: 'Pago', pipe: 'currency' },
];


  chooseExtract(extract) {
    this.conService.getOtherExtract(extract).subscribe({
      next: (response) => {
        if(response['success'] == true){
          this.originalDta = response['data'];
          this.data = response['data']['extracts']['extracto'];
          this.tabs = Object.keys(response['data']['extracts']['extracto']);
          switch (extract) {
            case 'settlement':
              this.title = 'Extracto de Liquidación';
              break;
            case 'quotas':
              this.title = 'Extracto de Cupo';
              break;
            case 'payment':
              this.title = 'Extracto de Pagos';
              break;
            default:
              break;
          }
          this.nextStep();
        }else if(response['success'] == false){
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No existen extractos'
          });
        }
        }

    });
  }

  private getHeadersForType(type: any) {
    switch (type) {
      case 'extracto':
        return this.headers;
      default:
        return [];
    }
  }

  beforeStep() {
    this.step--;
  }
}
