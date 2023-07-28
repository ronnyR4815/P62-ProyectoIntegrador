import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { CanvasJSChart } from '@canvasjs/angular-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

declare var CanvasJS: any;

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent implements OnInit {

  // Grafico lineas
  TempChart: any;
  HumdChart: any;
  SoilHumdChart: any;

  // Grafico barras
  TempBarChart: any;
  HumdBarChart: any;
  SoilHumdBarChart: any;

  // Grafico pastel
  TempPieChart: any;
  HumdPieChart: any;
  SoilHumdPieChart: any;

  // Variables grafico linea
  dataTemp: any[] = [];
  dataHumd: any[] = [];
  dataSoilHumd: any[] = [];

  // Variables grafico barras
  dataTempBar: any[] = [];
  dataHumdBar: any[] = [];
  dataSoilHumdBar: any[] = [];

  // Variables grafico pastel
  dataTempPie: any[] = [];
  dataHumdPie: any[] = [];
  dataSoilHumdPie: any[] = [];

  yTempVal: number = 0;
  yHumdVal: number = 0;
  updateInterval: number = 5000;
  time: Date = new Date();
  url = 'http://localhost:3000/api';
  currentIndex: number = 0;

  // Validacion de usuario y admin
  userLoginOn: boolean = false;
  userAdmin: boolean = false;

  chartPositions: any = {};

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    // Se reinicia el login siempre en false
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!userLoginOn) {
          this.router.navigateByUrl('/inicio');
        }
      }
    })
    // Se verifica si el usuario es admin
    this.loginService.currentAdmin.subscribe({
      next: (userAdmin) => {
        this.userAdmin = userAdmin;
        console.log(this.userAdmin);
      }
    })
    // Lee la configuracion personalizada del localstorage
    /*
    const savedConfig = localStorage.getItem('chartConfig');
    if (savedConfig) {
      this.chartPositions = JSON.parse(savedConfig);
    } */

    this.TempChart = new CanvasJS.Chart("TempChartContainer", {
      zoomEnabled: true,
      title: {
        text: "Temperatura"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        title: "Gráfica de temperatura del ambiente"
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        name: "temp",
        dataPoints: this.dataTemp
      }],
    });
    this.HumdChart = new CanvasJS.Chart("HumdChartContainer", {
      zoomEnabled: true,
      title: {
        text: "Humedad"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        title: "Gráfica de humedad del ambiente"
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        name: "humd",
        dataPoints: this.dataHumd
      }],
    });
    this.SoilHumdChart = new CanvasJS.Chart("SoilHumdChartContainer", {
      zoomEnabled: true,
      title: {
        text: "Humedad del suelo"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        title: "Gráfica de humedad del suelo"
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        name: "humedad-suelo",
        dataPoints: this.dataSoilHumd
      }],
    });

    this.TempBarChart = new CanvasJS.Chart("TempBarChartContainer", {
      title: {
        text: "Temperatura (Gráfico de barras)"
      },
      axisX: {
        title: "Lectura de sensores"
      },
      axisY: {
        title: "Temperatura"
      },
      data: [{
        type: "column",
        name: "Temperatura",
        dataPoints: this.dataTempBar
      }]
    });
    this.HumdBarChart = new CanvasJS.Chart("HumdBarChartContainer", {
      title: {
        text: "Humedad (Gráfico de barras)"
      },
      axisX: {
        title: "Lectura de sensores"
      },
      axisY: {
        title: "Humedad"
      },
      data: [{
        type: "column",
        name: "Humedad",
        dataPoints: this.dataHumdBar
      }]
    });
    this.SoilHumdBarChart = new CanvasJS.Chart("SoilHumdBarChartContainer", {
      title: {
        text: "Humedad del suelo (Gráfico de barras)"
      },
      axisX: {
        title: "Lectura de sensores"
      },
      axisY: {
        title: "Humedad del suelo"
      },
      data: [{
        type: "column",
        name: "Humedad del suelo",
        dataPoints: this.dataSoilHumdBar
      }]
    })

    this.TempPieChart = new CanvasJS.Chart("TempPieChartContainer", {
      title: {
        text: "Temperatura (Gráfico de pastel)"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%", // Etiqueta que muestra el porcentaje
        showInLegend: true,
        legendText: "{label}",
        dataPoints: this.dataTempPie
      }]
    });
    this.HumdPieChart = new CanvasJS.Chart("HumdPieChartContainer", {
      title: {
        text: "Humedad (Gráfico de pastel)"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%", // Etiqueta que muestra el porcentaje
        showInLegend: true,
        legendText: "{label}",
        dataPoints: this.dataHumdPie
      }]
    });
    this.SoilHumdPieChart = new CanvasJS.Chart("SoilHumdPieChartContainer", {
      title: {
        text: "Humedad del suelo (Gráfico de pastel)"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%", // Etiqueta que muestra el porcentaje
        showInLegend: true,
        legendText: "{label}",
        dataPoints: this.dataSoilHumdPie
      }]
    })

    this.updateCharts();
    // this.updateChartPositions();
  }

  updateCharts() {
    this.http.get<any[]>(`${this.url}/datos`).subscribe(data => {
      const tempElement = document.getElementById("temp") as HTMLInputElement;
      const humdElement = document.getElementById("humd") as HTMLInputElement;
      const soilHumdElement = document.getElementById("soilHumd") as HTMLInputElement;

      if (tempElement) {
        tempElement.value = data[data.length - 1].dhtTemp;
      }

      if (humdElement) {
        humdElement.value = data[data.length - 1].dhtHum;
      }

      if (soilHumdElement) {
        soilHumdElement.value = data[data.length - 1].hwHum;
      }

      console.log(data[data.length - 1].dhtTemp);
      console.log(data[data.length - 1].dhtHum);
      console.log(data[data.length - 1].hwHum);

      const yTempVal = parseFloat(data[data.length - 1].dhtTemp);
      const yHumdVal = parseFloat(data[data.length - 1].dhtHum);
      const ySoilHumdVal = parseFloat(data[data.length - 1].hwHum);

      // PUSH GRAFICO LINEAS  
      this.dataTemp.push({
        x: this.time.getTime(),
        y: yTempVal
      });
      this.dataHumd.push({
        x: this.time.getTime(),
        y: yHumdVal
      });
      this.dataSoilHumd.push({
        x: this.time.getTime(),
        y: ySoilHumdVal
      });

      // PUSH GRAFICO BARRAS
      this.dataTempBar.push({
        label: `Lectura ${this.dataTempBar.length + 1}`,
        y: yTempVal
      });
      this.dataHumdBar.push({
        label: `Lectura ${this.dataHumdBar.length + 1}`,
        y: yHumdVal
      });
      this.dataSoilHumdBar.push({
        label: `Lectura ${this.dataSoilHumdBar.length + 1}`, // Etiqueta para el eje X (opcional)
        y: ySoilHumdVal
      });

      // PUSH GRAFICO PASTEL
      const soilHumdPercentage = (ySoilHumdVal / 1024) * 100; // Calcula el porcentaje
      const tempPercentage = (yTempVal / 1024) * 100; // Reemplaza MAX_TEMP con el valor máximo de la temperatura que estás midiendo
      const humdPercentage = (yHumdVal / 1024) * 100; // Reemplaza MAX_HUMD con el valor máximo de la humedad que estás midiendo

      this.dataSoilHumdPie.push({
        label: `Lectura ${this.dataSoilHumdPie.length + 1}`,
        y: soilHumdPercentage
      });
      this.dataTempPie.push({
        label: `Lectura ${this.dataTempPie.length + 1}`,
        y: tempPercentage
      });
      this.dataHumdPie.push({
        label: `Lectura ${this.dataHumdPie.length + 1}`,
        y: humdPercentage
      });


      // Borrar los puntos mas antiguos
      if (this.dataTemp.length > 20) {
        this.dataTemp.shift();
      }
      if (this.dataHumd.length > 20) {
        this.dataHumd.shift();
      }
      if (this.dataSoilHumd.length > 20) {
        this.dataSoilHumd.shift();
      }
      // Borrar datos antiguos del gráfico de barras
      if (this.dataSoilHumdBar.length > 30) {
        this.dataSoilHumdBar.shift();
      }
      if(this.dataHumdBar.length > 30){
        this.dataHumdBar.shift();
      }
      if(this.dataTempBar.length > 30){
        this.dataTempBar.shift();
      }
      // Borrar datos antiguos del gráfico de pastel
      if (this.dataSoilHumdPie.length > 20) {
        this.dataSoilHumdPie.shift();
      }
      if(this.dataHumdPie.length > 20){
        this.dataHumdPie.shift();
      }
      if(this.dataTempPie.length > 20){
        this.dataTempPie.shift();
      }


      this.time.setTime(this.time.getTime() + this.updateInterval);
      //RENDER GRAFICO LINEAS
      this.TempChart.render();
      this.HumdChart.render();
      this.SoilHumdChart.render();
      //RENDER GRAFICO BARRAS
      this.SoilHumdBarChart.render();
      this.TempBarChart.render();
      this.HumdBarChart.render();
      //RENDER GRAFICO PASTEL
      this.SoilHumdPieChart.render();
      this.TempPieChart.render();
      this.HumdPieChart.render();

      setTimeout(() => this.updateCharts(), this.updateInterval);
    });
  }

  // Metodo para descargar reporte de datos de sensores CSV
  descargarReporteCSV() {
    // Realizar una petición GET al backend para obtener los datos de los sensores
    this.http.get<any[]>(`${this.url}/datos`).subscribe(data => {
      // Crear el contenido del reporte a partir de los datos recibidos
      let contenidoReporte = 'Fecha, Hora, AmbienteTemp, AmbienteHum, SueloHum\n';
      data.forEach(dato => {
        const fecha = new Date(dato.createdAt);
        const temperatura = dato.dhtTemp;
        const humedad = dato.dhtHum;
        const suelo = dato.hwHum;
        contenidoReporte += `${fecha.toLocaleString()}, ${temperatura}, ${humedad}, ${suelo}\n`;
      });

      // Crear el blob con el contenido del reporte y guardar el archivo
      const blob = new Blob([contenidoReporte], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'reporte_sensores.csv');
    });
  }
  // Metodo para descargar reporte de datos de sensores PDF
  descargarReportePDF() {
    // Realizar una petición GET al backend para obtener los datos de los sensores
    this.http.get<any[]>(`${this.url}/datos`).subscribe(data => {
      // Crear el objeto jspdf
      const pdf = new jsPDF();

      // Establecer el título del reporte
      pdf.setFontSize(18);
      pdf.text("Reporte de Datos de Sensores", 15, 15);

      // Crear la tabla con los datos
      const columns = ["Fecha", "Hora", "AmbieteTemp", "AmbienteHum", "SueloHum"];
      const rows: any[] = [];
      data.forEach(dato => {
        const fecha = new Date(dato.createdAt);
        const temperatura = dato.dhtTemp;
        const humedad = dato.dhtHum;
        const suelo = dato.hwHum;
        const row = [fecha.toLocaleDateString(), fecha.toLocaleTimeString(), temperatura, humedad, suelo];
        rows.push(row);
      });

      autoTable(pdf, {
        head: [columns],
        body: rows,
        startY: 25, // Establecer la posición de inicio de la tabla para que esté debajo del título
        margin: { top: 20 }
      });

      // Descargar el PDF
      pdf.save('reporte_sensores.pdf');
    });
  }



  // Método para guardar la configuración personalizada en el almacenamiento local
  saveConfiguration() {
    localStorage.setItem('chartConfig', JSON.stringify(this.chartPositions));
    alert('Configuración guardada correctamente.');
  }

  // Método para actualizar las posiciones de los gráficos
  updateChartPositions() {
    if (this.userAdmin) { // Verificar si el usuario es administrador
      const tempSection = document.getElementById('temperatura');
      const humdSection = document.getElementById('humedad');

      if (this.chartPositions.temp && this.chartPositions.temp.position) {
        if (tempSection) {
          tempSection.style.order = this.chartPositions.temp.position;
        }
      }

      if (this.chartPositions.humd && this.chartPositions.humd.position) {
        if (humdSection) {
          humdSection.style.order = this.chartPositions.humd.position;
        }
      }
    }
  }

  // Métodos para que el administrador pueda cambiar la posición de los gráficos
  moveTempUp() {
    if (this.userAdmin) { // Verificar si el usuario es administrador
      if (!this.chartPositions.temp) {
        this.chartPositions.temp = {};
      }
      this.chartPositions.temp.position = this.chartPositions.temp.position - 1 || 0;
      this.updateChartPositions();
    }
  }

  moveTempDown() {
    if (this.userAdmin) { // Verificar si el usuario es administrador
      if (!this.chartPositions.temp) {
        this.chartPositions.temp = {};
      }
      this.chartPositions.temp.position = this.chartPositions.temp.position + 1 || 1;
      this.updateChartPositions();
    }
  }

  moveHumdUp() {
    if (this.userAdmin) { // Verificar si el usuario es administrador
      if (!this.chartPositions.humd) {
        this.chartPositions.humd = {};
      }
      this.chartPositions.humd.position = this.chartPositions.humd.position - 1 || 0;
      this.updateChartPositions();
    }
  }

  moveHumdDown() {
    if (this.userAdmin) { // Verificar si el usuario es administrador
      if (!this.chartPositions.humd) {
        this.chartPositions.humd = {};
      }
      this.chartPositions.humd.position = this.chartPositions.humd.position + 1 || 1;
      this.updateChartPositions();
    }
  }

  /**
   * Este metodo de prueba funciona leyendo todos los datos
   * que se encuentren actualmente en la base de datos
   * desde el mas antiguo al mas nuevo
   */
  /*
  updateCharts() {
    this.http.get<any[]>(`${this.url}/datos`).subscribe(data => {
      const tempElement = document.getElementById("temp") as HTMLInputElement;
      const humdElement = document.getElementById("humd") as HTMLInputElement;

      if (tempElement) {
        tempElement.value = data[this.currentIndex].dhtTemp;
      }

      if (humdElement) {
        humdElement.value = data[this.currentIndex].dhtHum;
      }

      console.log(data[this.currentIndex]);

      const yTempVal = parseInt(data[this.currentIndex].dhtTemp);
      const yHumdVal = parseInt(data[this.currentIndex].dhtHum);

      this.dataTemp.push({
        x: this.time.getTime(),
        y: yTempVal
      });

      this.dataHumd.push({
        x: this.time.getTime(),
        y: yHumdVal
      });

      this.currentIndex++; // Incrementar el índice para apuntar al siguiente registro

      this.time.setTime(this.time.getTime() + this.updateInterval);
      this.TempChart.render();
      this.HumdChart.render();

      if (this.currentIndex >= data.length) {
        this.currentIndex = 0;
      }

      setTimeout(() => this.updateCharts(), this.updateInterval);
    });
  }
  */

}