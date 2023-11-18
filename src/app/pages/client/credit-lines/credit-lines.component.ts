import { Component } from '@angular/core';
import { dataTable } from '@core/data/exampleTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { ConnectionService } from '@core/services/connection.service';

@Component({
  selector: 'app-lineas-credito',
  templateUrl: './credit-lines.component.html',
  styleUrls: ['./credit-lines.component.scss'],
})
export class LineasCreditoComponent {


  headerLines = [
    'Clase T3',
    'Clase T4',
    'Cupo Máx.',
    'Clase T1',
    'Clase T2',
    'Clase T0',
    'Tipo Cupo',
    'Tipo Oblig.',
    'Cupo Mín.',
    'Plazo Máx.',
    'Tasa 1',
    'Tasa 2',
    'Libranza',
    'Tasa 0',
    'Plazo Máx. Tipo',
    'Tasa Tipo',
    'Tasa 3',
    'Subauxiliar',
    'Tasa 4',
    'N° Subaux.',
    'Garantía Adm.',
    'Tipo Cuota'
  ];

  keys: any;
  headers: any;
  title:string = "Lineas de Crédito";
  originalDta: any;
  data:any;
    constructor(
    private conService: ConnectionService
    ) {}

  ngOnInit() {
    this.conService.getCreditLines().subscribe({
      next: (response) => {
        this.originalDta = response['data']
        this.data = response['data'];
        this.keys = Object.keys(this.data[0]);
        this.headers = this.headerLines;
      },
    });
  }

  // exportPdf() {
  //   this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  //   const doc = new jsPDF('portrait', 'px', 'a4');
  //   autoTable(doc, {columns: this.exportColumns , body: this.dataSource, });
  //   doc.save('products.pdf');
  // }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //       const worksheet = xlsx.utils.json_to_sheet(this.dataSource);
  //       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       this.saveAsExcelFile(excelBuffer, "products");
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

  printPage() {
    window.print();
  }

}
