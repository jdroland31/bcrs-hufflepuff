/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: API - Sprint 3
 ***/


import { LineItem } from './line-item.interface';

export interface Invoice {
  userName: string;
  lineItems: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;
}
