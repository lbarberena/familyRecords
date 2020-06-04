import {Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('barChart') barChart;
  bars: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() {}

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['15/05/2020', '16/05/2020', '17/05/2020', '18/05/2020', '19/05/2020', '20/05/2020'],
        datasets: [{
          label: 'Facturas por mes',
          data: [0, 5, 1, 8, 4, 9],
          backgroundColor: '#AF7AC5',
          borderColor: '#AF7AC5',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
