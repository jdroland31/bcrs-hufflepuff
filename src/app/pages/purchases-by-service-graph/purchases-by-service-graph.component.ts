import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  ItemCount = [];
  labels = [];

  constructor() { }

  ngOnInit(): void {
  }

}
