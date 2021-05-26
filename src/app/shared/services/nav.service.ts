import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true;
		}
	}

	public screenWidth: any;
	public collapseSidebar = false;

	MENUITEMS: Menu[] = [
    {
      path: '/dashboard/app-dashboard', title: 'Dashboard', icon: 'home' , type: 'link'
    },
    {
      path: '/driver/drivers-info', title: 'Drivers Info', icon: 'users', type: 'link'
    },
    {
      path: '/vehicle/vehicles-info', title: 'Vehicles Info', icon: 'truck', type: 'link'
    },
    {
      path: '/warehouse/warehouse-info', title: 'Warehouse Info', icon: 'home', type: 'link'
    },
    {
      path: '/orders/orders-info', title: 'Orders Info', icon: 'shopping-bag', type: 'link'
    },
    {
      title: 'Reports', icon: 'database', type: 'sub', active: false, children: [
        { path: '/reports/driver-report', title: 'Driver Report', type: 'link' }
      ]
    }
	];
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}


}
