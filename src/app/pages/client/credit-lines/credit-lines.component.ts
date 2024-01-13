import { Component } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';

@Component({
  selector: 'app-lineas-credito',
  templateUrl: './credit-lines.component.html',
  styleUrls: ['./credit-lines.component.scss'],
})
export class LineasCreditoComponent {
  headersLines: any[] = [];

  keys: any;
  headers: any;
  title: string = 'Lineas de Crédito';
  originalDta: any;
  data: any;
  selectedColumns: any;

  constructor(private conService: ConnectionService) {}

  ngOnInit() {
    this.conService.getCreditLines().subscribe({
      next: (response) => {
        this.originalDta = response['data'];
        this.data = response['data'];
        this.keys = Object.keys(this.data[0]);
      },
    });

    this.headersLines = [
      { field: 'nombre_subaux', header: 'Subauxiliar', pipe: null },
      { field: 'clasetasa3', header: 'Clase T3', pipe: null },
      { field: 'nsubaux', header: 'N° Subaux.', pipe: null },
      { field: 'clasetasa4', header: 'Clase T4', pipe: null },
      { field: 'cupo_maximo', header: 'Cupo Máx.', pipe: 'currency' },
      { field: 'clasetasa1', header: 'Clase T1', pipe: null },
      { field: 'clasetasa2', header: 'Clase T2', pipe: null },
      { field: 'clasetasa0', header: 'Clase T0', pipe: null },
      { field: 'tipocupo', header: 'Tipo Cupo', pipe: null },
      { field: 'tipo_obligacion', header: 'Tipo Oblig.', pipe: null },
      { field: 'cupo_minimo', header: 'Cupo Mín.', pipe: 'currency' },
      { field: 'plazomaximo', header: 'Plazo Máx.', pipe: 'date' },
      { field: 'tipotasa1', header: 'Tasa 1', pipe: 'percent' },
      { field: 'tipotasa2', header: 'Tasa 2', pipe: 'percent' },
      { field: 'con_libranza', header: 'Libranza', pipe: null },
      { field: 'tipotasa0', header: 'Tasa 0', pipe: 'percent' },
      { field: 'tipo_plazomaximo', header: 'Plazo Máx. Tipo', pipe: null },
      { field: 'tipo_tasa', header: 'Tasa Tipo', pipe: null },
      { field: 'tipotasa3', header: 'Tasa 3', pipe: 'percent' },
      { field: 'tipotasa4', header: 'Tasa 4', pipe: 'percent' },
      { field: 'garantia_admisible', header: 'Garantía Adm.', pipe: null },
      { field: 'tipocuota', header: 'Tipo Cuota', pipe: null },
    ];
  }

  printPage() {
    window.print();
  }
}
