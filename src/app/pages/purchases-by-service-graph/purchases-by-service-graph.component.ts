/*
 ============================================
; Title:  purchases-by-service-graph.component.ts
; Author: Professor Krasso
; Date: 30 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The graph for the purchases,
; The chart shows the most sales per service title.
; Sprint - 3
;===========================================
 */

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {

    // Subscribe calls the purchases-graph API
    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      // maps the response data to the purchase variable
      this.purchases = res['data'];
      //loop over the purchases to split out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }
      console.log(this.purchases);
      //build the object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, //label for services
        datasets: [
          // graph object
          {
            // backgroundColor: [
            //   '#ED0A3F',
            //   '#FF8833',
            //   '#5FA777',
            //   '#0066CC',
            //   '#683FA0',
            //   '#AF593E',
            //   '#6CDAE7'
            // ],
            // //the hover background colors
            // hoverBackgroundColor: [
            //   '#ED0A3F',
            //   '#FF8833',
            //   '#5FA777',
            //   '#0066CC',
            //   '#683FA0',
            //   '#AF593E',
            //   '#6CDAE7'
            // ],

            //Using Hufflepuff colors and supporting colors to stay within the project's style.
            backgroundColor: [
              '#f9c02d',
              '#3e2622',
              '#a9a9a9',
              '#FF0000',
              '#6a4f4b',
              '#b68900',
              '#000000',
              '#ffeb6b'
            ],
            //the hover background colors
            hoverBackgroundColor: [
              '#f9c02d',
              '#3e2622',
              '#a9a9a9',
              '#FF0000',
              '#6a4f4b',
              '#b68900',
              '#000000',
              '#ffeb6b'
            ],
            //shows the item count of each service
            data: this.itemCount
          },
        ]
      };

      //verifies the data objects structure matches primeNG's expected format
      console.log('Data object');
      console.log(this.data);
    })
  }

  ngOnInit() {
  }

}
