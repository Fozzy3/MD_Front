import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-auxiliaries',
  templateUrl: './auxiliaries.component.html',
  styleUrls: ['./auxiliaries.component.scss']
})
export class AuxiliariesComponent {
  extractBalance: any;
  extractBalanceOptions: any;
  data: any;
  goTables: boolean = false;

  headerAhorros = [
    'Fecha',
    'N° Comp.',
    'Tipo Comp.',
    'N° Mov.',
    'Saldo Nvo.',
    'Subauxiliar',
    'Débitos',
    'Obs.',
    'N° Subcomp.',
    'Saldo Ant.',
    'N° Subaux.',
    'Créditos'
  ];

  headerCreditos = [
    'Fecha',
    'N° Comp.',
    'Tipo Comp.',
    'N° Mov.',
    'Saldo Nvo.',
    'Subauxiliar',
    'Débitos',
    'Obs.',
    'N° Subcomp.',
    'Saldo Ant.',
    'N° Subaux.',
    'Créditos'
  ];

  headersAportes = [
    'Fecha',
    'N° Comp.',
    'Tipo Comp.',
    'N° Mov.',
    'Saldo Nvo.',
    'Subauxiliar',
    'Débitos',
    'Obs.',
    'N° Subcomp.',
    'Saldo Ant.',
    'N° Subaux.',
    'Créditos'
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
      this.conService.getAuxiliary(date).subscribe({
        next: (response) => {
          this.data = response['data'];
          this.goTables = true;
        },
      });
    } else {
      this.conService.getAuxiliaryByCategory(this.extractType, date).subscribe({
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
