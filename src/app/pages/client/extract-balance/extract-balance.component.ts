import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-extract-balance',
  templateUrl: './extract-balance.component.html',
  styleUrls: ['./extract-balance.component.scss'],
})
export class ExtractBalanceComponent {
  headerAhorros = [
    { field: 'consignaciones', header: 'Consignac.', pipe: null },
    { field: 'cuota', header: 'Cuota', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcomp.', pipe: null },
    { field: 'saldo_actual', header: 'Saldo Actual', pipe: null },
    { field: 'intereses_otros', header: 'Intereses/Otros', pipe: null },
    { field: 'saldo_ant', header: 'Saldo Ant.', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'cuotasxpagar', header: 'Cuotas Pagar', pipe: null },
    { field: 'nsubaux', header: 'N° Subaux.', pipe: null },
    { field: 'retiros', header: 'Retiros', pipe: null },
    { field: 'abono_capital', header: 'Abono Capital', pipe: null },
    { field: 'fecha_ultmov', header: 'Fecha Últ. Mov.', pipe: null },
    { field: 'rendimientos_ahorros', header: 'Rend. Ahorros', pipe: null },
  ];

  headersAportes = [
    { field: 'consignaciones', header: 'Consignac.', pipe: null },
    { field: 'cuota', header: 'Cuota', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'cuotasxpagar', header: 'Cuotas Pagar', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcomp.', pipe: null },
    { field: 'saldo_actual', header: 'Saldo Actual', pipe: null },
    { field: 'intereses_otros', header: 'Intereses/Otros', pipe: null },
    { field: 'retiros', header: 'Retiros', pipe: null },
    { field: 'abono_capital', header: 'Abono Capital', pipe: null },
    { field: 'fecha_ultmov', header: 'Fecha Últ. Mov.', pipe: null },
    { field: 'saldo_ant', header: 'Saldo Ant.', pipe: null },
  ];

  headerCreditos = [
    { field: 'cuota', header: 'Cuota', pipe: null },
    { field: 'nombre_subaux', header: 'Nom. Subaux.', pipe: null },
    { field: 'desembolsos', header: 'Desembolsos', pipe: null },
    { field: 'cuotasxpagar', header: 'Cuotas Pagar', pipe: null },
    { field: 'nsubcbte', header: 'N° Subcomp.', pipe: null },
    { field: 'fecha_inicial', header: 'Fecha Inicial', pipe: null },
    { field: 'saldo_actual', header: 'Saldo Actual', pipe: null },
    { field: 'cuotasmora', header: 'Cuotas Mora', pipe: null },
    { field: 'intereses_otros', header: 'Intereses/Otros', pipe: null },
    { field: 'abono_capital', header: 'Abono Capital', pipe: null },
    { field: 'pagos', header: 'Pagos', pipe: null },
    { field: 'saldo_ant', header: 'Saldo Ant.', pipe: null },
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
      query = this.conService.getBalance(date);
    } else {
      query = this.conService.getBalanceByCategory(this.extractType, date);
    }
    query.subscribe({
      next: (response) => {
        if(response.success == true){

          this.originalDta = response['data'];
          this.data = response['data']['extracts'];
          this.tabs = Object.keys(response['data']['extracts']);
          this.tabs.forEach((element) => {
            this.headers[element] = this.getHeadersForType(element);
          });
          this.goTables = true;
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'No existen extractos',
            detail: ''
          });
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
