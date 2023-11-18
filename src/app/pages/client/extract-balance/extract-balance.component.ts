import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-extract-balance',
  templateUrl: './extract-balance.component.html',
  styleUrls: ['./extract-balance.component.scss']
})
export class ExtractBalanceComponent {

  extractBalance: any;
  extractBalanceOptions: any;

  headersSaved: string[] = [
    'Concepto de saldo',
    'N°Subcbte',
    'Saldo Anterior',
    'Consignaciones',
    'Retiros',
    'Fecha Último Movimiento',
    'Saldo Actual',
    'Cuota',
    'Abono de Capital',
    'Intereses Otros',
    'Cuotas por Pagar',
    'N°Subaux',
    'Rendimientos de Ahorros'
  ];

  headersContributions: string[] = [
    'Aportes Ordinarios',
    'N°Subcbte',
    'Saldo Anterior',
    'Consignaciones',
    'Retiros',
    'Fecha del Último Movimiento',
    'Saldo Actual',
    'Cuota',
    'Abono a Capital',
    'Intereses y Otros',
    'Cuotas por Pagar'
  ];

  headersCredits: string[] = [
    'Crédito Preferencial',
    'Número de Subcomprobante',
    'Fecha Inicial',
    'Saldo Anterior',
    'Abono a Capital',
    'Desembolsos',
    'Saldo Actual',
    'Cuota',
    'Cuotas por Pagar',
    'Cuotas en Mora',
    'Intereses y Otros',
    'Pagos'
  ];



  constructor(
    private conService: ConnectionService,
    private fb: FormBuilder,
    private utils: UtilsService
  ){
  }

      yourColumnArray: any[] = [
      { field: 'field1', header: 'Columna 1' },
      { field: 'field2', header: 'Columna 2' },
      // Agrega más columnas según tu necesidad
    ];

  ngOnInit(){


    this.extractBalance = this.fb.group({
      consultType: ['', Validators.required],
      date: ['', Validators.required],
    })

    this.extractBalanceOptions = [
      { name: 'Todos', code: 'all' },
      { name: 'Ahorros', code: 'ahorros' },
      { name: 'Créditos', code: 'creditos' },
      { name: 'Aportes', code: 'aportes' },
    ];



  }

  data: any;
  onSubmit(){
    let date = this.utils.formatDateToCustom(this.extractBalance.get('date').value)
    let extractType = this.extractBalance.get('consultType').value;
    if(extractType == 'all'){
      this.conService.getStamentBalance(date).subscribe({
        next: (response) => {
          this.data = response['data'];
        }
      })
    }else{
      this.conService.getStamentBalanceByCategory(extractType, date).subscribe({
        next: (response) => {
          this.data = response['data'];
        }
      })
    }
  }


}
