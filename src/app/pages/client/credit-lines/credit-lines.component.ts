import { Component } from '@angular/core';
import { dataTable } from '@core/data/exampleTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lineas-credito',
  templateUrl: './credit-lines.component.html',
  styleUrls: ['./credit-lines.component.scss']
})
export class LineasCreditoComponent {
  dataSource: any[] = [];
  cols: any[] = [];
  exportColumns: any[] = [];
  
  constructor(){}
  
  ngOnInit() {


    this.dataSource = dataTable["datos"];
    this.cols = [
      { field: 'codigo', header: 'codigo', customExportHeader: 'Product Code' },
      { field: 'nombre', header: 'nombre' },
      { field: 'tipo_de_cuota', header: 'tipo_de_cuota' },
      { field: 'plazo_maximo', header: 'plazo_maximo' },
      { field: 'tipo_de_obligacion', header: 'tipo_de_obligacion' },
      { field: 'clase_de_tasa', header: 'clase_de_tasa' },
      { field: 'valor_minimo', header: 'valor_minimo' },
      { field: 'valor_maximo', header: 'valor_maximo' },
      { field: 'garantia', header: 'garantia' },
      { field: 'libranza', header: 'libranza' },
      { field: 'tipo_de_cupo_plazo', header: 'tipo_de_cupo_plazo' },
      { field: 'tasa', header: 'tasa' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

exportPdf() {
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  const doc = new jsPDF('portrait', 'px', 'a4');
  autoTable(doc, {columns: this.exportColumns , body: this.dataSource, });
  doc.save('products.pdf');
}

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataSource);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
}

}
