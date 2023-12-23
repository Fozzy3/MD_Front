import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auxiliaries',
  templateUrl: './auxiliaries.component.html',
  styleUrls: ['./auxiliaries.component.scss'],
})
export class AuxiliariesComponent {
  headerAhorros = [
    { field: 'fecha', header: 'Fecha', pipe: null },
    { field: 'ncbte', header: 'N° Cbte', pipe: null },
    { field: 'tipocbte', header: 'Tipo Cbte', pipe: null },
    { field: 'nmovimiento', header: 'N° Movimiento', pipe: null },
    { field: 'saldonuevo', header: 'Saldo Nuevo', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'movdebitos', header: 'Mov. Débitos', pipe: null },
    { field: 'observaciones', header: 'Observaciones', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcbte', pipe: null },
    { field: 'saldoant', header: 'Saldo Ant.', pipe: null },
    { field: 'nsubaux', header: 'N° Subaux.', pipe: null },
    { field: 'movcreditos', header: 'Mov. Créditos', pipe: null }
];

  headersAportes = [
    { field: 'fecha', header: 'Fecha', pipe: null },
    { field: 'ncbte', header: 'N° Cbte', pipe: null },
    { field: 'tipocbte', header: 'Tipo Cbte', pipe: null },
    { field: 'nmovimiento', header: 'N° Movimiento', pipe: null },
    { field: 'saldonuevo', header: 'Saldo Nuevo', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'movdebitos', header: 'Mov. Débitos', pipe: null },
    { field: 'observaciones', header: 'Observaciones', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcbte', pipe: null },
    { field: 'saldoant', header: 'Saldo Ant.', pipe: null },
    { field: 'nsubaux', header: 'N° Subaux.', pipe: null },
    { field: 'movcreditos', header: 'Mov. Créditos', pipe: null }
];

  headerCreditos = [
    { field: 'fecha', header: 'Fecha', pipe: null },
    { field: 'ncbte', header: 'N° Cbte', pipe: null },
    { field: 'tipocbte', header: 'Tipo Cbte', pipe: null },
    { field: 'nmovimiento', header: 'N° Movimiento', pipe: null },
    { field: 'saldonuevo', header: 'Saldo Nuevo', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'movdebitos', header: 'Mov. Débitos', pipe: null },
    { field: 'observaciones', header: 'Observaciones', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcbte', pipe: null },
    { field: 'saldoant', header: 'Saldo Ant.', pipe: null },
    { field: 'nsubaux', header: 'N° Subaux.', pipe: null },
    { field: 'movcreditos', header: 'Mov. Créditos', pipe: null }
];

  extractBalance: any;
  extractBalanceOptions: any;
  data: any;
  goTables: boolean = false;
  headers: any;
  extractType: any;
  originalDta: any;
  title: any;
  tabs: any;

  constructor(
    private conService: ConnectionService,
    private fb: FormBuilder,
    private utils: UtilsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.extractBalance = this.fb.group({
      consultType: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.headers = {};

    this.extractBalanceOptions = [
      { name: 'Todos', code: 'all' },
      { name: 'Ahorros', code: 'ahorros' },
      { name: 'Créditos', code: 'creditos' },
      { name: 'Aportes', code: 'aportes' },
    ];
  }

  onSubmit() {
    let date = this.utils.formatDateToCustom(
      this.extractBalance.get('date').value
    );
    this.extractType = this.extractBalance.get('consultType').value;
    let query;
    if (this.extractType == 'all') {
      query = this.conService.getAuxiliary(date);
    } else {
      query = this.conService.getAuxiliaryByCategory(this.extractType, date);
    }
    query.subscribe({
      next: (response) => {
        if(response['data'] && response['data']['extracts']){
          this.originalDta = response['data'];
          this.data = response['data']['extracts'];
          this.tabs = Object.keys(response['data']['extracts']);
          this.tabs.forEach((element) => {
            this.headers[element] = this.getHeadersForType(element);
          });
          this.goTables = true;
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No existen extractos' });
        }
      },
    });
  }

  private getHeadersForType(type: any) {
    switch (type) {
      case 'ahorros':
        return this.headerAhorros;
      case 'creditos':
        return this.headerCreditos;
      case 'aportes':
        return this.headersAportes;
      default:
        return [];
    }
  }

  printPage() {
    window.print();
  }
}
