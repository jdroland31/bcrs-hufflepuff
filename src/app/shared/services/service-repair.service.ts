/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: service repair service
 ***/
//This component provides an interface for the service repair API

// file import
import { Injectable } from '@angular/core';
import { ServiceRepairItem } from '../../shared/interfaces/service-repair-item.interface';


@Injectable({
  providedIn: 'root'
})
export class ServiceRepairService {
  serviceRepairItems: ServiceRepairItem[];
  constructor() {
    this.serviceRepairItems = [
      {
        id: '101',
        title: 'Password Reset',
        price: 39.99,
        icon: 'lock_open',
        salesPitch: 'Locked out of your computer? Let us do a reset for you!'
      },
      {
        id: '102',
        title: "Spyware Removal",
        price: 99.9,
        icon: 'remove_red_eye',
        salesPitch: 'Get rid of pesky spyware!'
      },
      {
        id: '103',
        title: 'RAM Upgrade',
        price: 129.99,
        icon: 'fast_forward',
        salesPitch: 'Let us handle that tricky installation for you!'
      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99,
        icon: 'computer',
        salesPitch: "Let's get your PC in top shape!"
      },
      {
        id: '105',
        title: 'PC Tune-up',
        price: 89.99,
        icon: 'build',
        salesPitch: 'Improve performance with a RAM upgrade!'
      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.00,
        icon: 'keyboard',
        salesPitch: 'Let us vacuum up those crumbs!'
      },
      {
        id: '107',
        title: 'Disk Clean-up',
        price: 149.99,
        icon: 'storage',
        salesPitch: 'We can get your hard drive sorted!'
      },
      {
        id: '108',
        title: 'Video Card Upgrade',
        price: 749.99,
        icon: 'games',
        salesPitch: 'You deserve next-gen graphics!'
      },
    ]
  }

  getServiceRepairItems(): ServiceRepairItem[] {
    return this.serviceRepairItems;

  }
}
