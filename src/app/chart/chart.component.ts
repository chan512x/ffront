import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { format } from 'date-fns';
import { DataService, ChartData } from '../gdata.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  @Input() fro!: string;
  @Input() to!: string;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };
  
  public lineChartType: ChartType = 'line';
  
  loading = true;
  error = false;
  
  // Raw data from service
  private rawData: ChartData | null = null;
  
  // Dataset selection state
  datasetSelections = {
    aictc: true,
    emt: true,
    mf: true
  };
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.fetchChartData();
      console.log(this.fro)

    }, 10000)
  }
  
  fetchChartData(): void {
    this.loading = true;
    this.error = false;
    
    this.dataService.getChartData().subscribe({
      next: (data) => {
        this.rawData = data;
        this.processChartData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching chart data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  toggleDataset(dataset: 'aictc' | 'emt' | 'mf'): void {
    this.datasetSelections[dataset] = !this.datasetSelections[dataset];
    this.processChartData();
  }
  
  private processChartData(): void {
    if (!this.rawData) return;
    
    // Extract dates for labels (using the first data series)
    const labels = this.rawData.aictc.map(item => format(new Date(item[0]), 'EEE, MMM d'));
    
    const datasets = [];
    
    if (this.datasetSelections.aictc) {
      datasets.push({
        data: this.rawData.aictc.map(item => item[1]),
        label: 'AICTC',
        borderColor: 'rgb(59, 130, 246)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        tension: 0.2,
        fill: true
      });
    }
    
    if (this.datasetSelections.emt) {
      datasets.push({
        data: this.rawData.emt.map(item => item[1]),
        label: 'EMT',
        borderColor: 'rgb(16, 185, 129)', // Tailwind green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        tension: 0.2,
        fill: true
      });
    }
    
    if (this.datasetSelections.mf) {
      datasets.push({
        data: this.rawData.mf.map(item => item[1]),
        label: 'MF',
        borderColor: 'rgb(239, 68, 68)', // Tailwind red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        pointBackgroundColor: 'rgb(239, 68, 68)',
        tension: 0.2,
        fill: true
      });
    }
    
    this.lineChartData = {
      labels: labels,
      datasets: datasets
    };
    
    // Update the chart if it exists
    if (this.chart) {
      this.chart.update();
    }
  }
}