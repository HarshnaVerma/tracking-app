import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const contentHeader = new HttpHeaders(
  {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0'
  });

@Injectable()
export class ConfigService {

  apiBaseUrlForStorageService: string;
  imagePrefix: string;
  appProductionEnv: string;
  endPointConfiguration: any;
  apiBaseUrlForDriverService: string;
  apiBaseUrlForWarehouseService: string;
  apiBaseUrlForOrderService: string;
  apiBaseUrlForTaskService: string;

  constructor(private httpClient: HttpClient) {
  }

  async loadConfig() {
    const data = await this.httpClient.get<any>('./assets/data/json/config.json', {headers: contentHeader})
      .toPromise();
    this.apiBaseUrlForStorageService = data.apiBaseUrlForStorageService;
    this.imagePrefix = data.imagePrefix;
    this.appProductionEnv = data.appProductionEnv;
    this.apiBaseUrlForDriverService = data.apiBaseUrlForDriverService;
    this.apiBaseUrlForWarehouseService = data.apiBaseUrlForWarehouseService;
    this.apiBaseUrlForOrderService = data.apiBaseUrlForOrderService;
    this.apiBaseUrlForTaskService = data.apiBaseUrlForTaskService;
    const endPoints = await this.httpClient.get<any>('./assets/data/json/' + this.appProductionEnv + '.json' , { headers: contentHeader })
      .toPromise();

    this.endPointConfiguration = {...endPoints};

    console.log('JSOn.string' + JSON.stringify(this.endPointConfiguration));
  }

  get(url , key) {
    return url + this.endPointConfiguration[key];
  }
}
