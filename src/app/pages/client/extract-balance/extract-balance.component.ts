import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-extract-balance',
  templateUrl: './extract-balance.component.html',
  styleUrls: ['./extract-balance.component.scss'],
})
export class ExtractBalanceComponent {
  extractBalance: any;
  extractBalanceOptions: any;
  data: any;
  goTables: boolean = false;

  headerAhorros = [
    'Consignac.',
    'Cuota',
    'N° Subcomp.',
    'Saldo Actual',
    'Intereses/Otros',
    'Saldo Ant.',
    'Nom. Subaux.',
    'Cuotas Pagar',
    'N° Subaux.',
    'Retiros',
    'Abono Capital',
    'Fecha Últ. Mov.',
    'Rend. Ahorros',
  ];



  headerCreditos: string[] = [
    'Cuota',
    'Nombre Subauxiliar',
    'Desembolsos',
    'Cuotas por Pagar',
    'N° Subcomprobante',
    'Fecha Inicial',
    'Saldo Actual',
    'Cuotas en Mora',
    'Intereses y Otros',
    'Abono de Capital',
    'Pagos',
    'Saldo Anterior'
  ];

  headersAportes: string[] = [
    'Consignaciones',
    'Cuota',
    'Nombre Subauxiliar',
    'Cuotas por Pagar',
    'N° Subcomprobante',
    'Saldo Actual',
    'Intereses y Otros',
    'Retiros',
    'Abono de Capital',
    'Fecha Último Movimiento',
    'Saldo Anterior'
  ];
  constructor(
    private conService: ConnectionService,
    private fb: FormBuilder,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.extractBalance = this.fb.group({
      consultType: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.extractBalanceOptions = [
      { name: 'Todos', code: 'all' },
      { name: 'Ahorros', code: 'ahorros' },
      { name: 'Créditos', code: 'creditos' },
      { name: 'Aportes', code: 'aportes' },
    ];
  }


  keys: any;
  headers: any;
  extractType: any;
  originalDta: any;

  onSubmit() {
    let date = this.utils.formatDateToCustom(this.extractBalance.get('date').value);
    this.extractType = this.extractBalance.get('consultType').value;

    if (this.extractType == 'all') {
      this.conService.getBalance(date).subscribe({
        next: (response) => {
          this.data = response['data'];
          this.goTables = true;
        },
      });
    } else {
      this.conService.getBalanceByCategory(this.extractType, date).subscribe({
        next: (response) => {
          if (response['success'] == true) {
            this.originalDta = response['data']
            this.data = response['data']['extracts']['categoriesData'][this.extractType];
            this.keys = Object.keys(this.data[0]);
            this.headers = this.getHeadersForType(this.extractType);
            this.goTables = true;
          }
        },
      });
    }
  }

  private getHeadersForType(type: string): string[] {
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
