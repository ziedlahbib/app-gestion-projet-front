import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StatitstiqueService } from 'src/app/service/statitstique.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public salesChart;
  public ordersChart;
  public user: User;
  public projectsPerMonth: { month: number, projects: number }[] = [];
  public years: number[] = [];
  public selectedYear: number = 2024;

  constructor(private statistique: StatitstiqueService) { }

  ngOnInit() {
    this.populateYears();
    this.getmosttaskuser();
    this.getprojectpermonth(this.selectedYear);

    const chartSales = document.getElementById('chart-sales');
    const chartOrders = document.getElementById('chart-orders');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Projets",
          data: [], // Initial data will be updated
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 5
            }
          }]
        }
      }
    });

    this.ordersChart = new Chart(chartOrders, {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Projets",
          data: [], // Initial data will be updated
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 5
            }
          }]
        }
      }
    });
  }

  getmosttaskuser() {
    this.statistique.getmostusertask().subscribe(
      data => {
        this.user = data;
        console.log(data);
      }
    );
  }

  getprojectpermonth(year: number) {
    this.statistique.getProjectsPerMonth(year).subscribe(
      data => {
        this.projectsPerMonth = data.map(item => {
          const parts = item.split(', ');
          return {
            month: parseInt(parts[0].split(': ')[1]),
            projects: parseInt(parts[1].split(': ')[1])
          };
        });
        console.log(this.projectsPerMonth);
        this.updateCharts();
      }
    );
  }

  populateYears() {
    for (let year = 2024; year <= 2060; year++) {
      this.years.push(year);
    }
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.getprojectpermonth(this.selectedYear);
  }

  updateCharts() {
    const chartData = new Array(12).fill(0);
    this.projectsPerMonth.forEach(item => {
      chartData[item.month - 1] = item.projects; // months are 1-based, array is 0-based
    });

    this.salesChart.data.datasets[0].data = chartData;
    this.salesChart.update();

    this.ordersChart.data.datasets[0].data = chartData;
    this.ordersChart.update();
  }
}
