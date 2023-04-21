export interface Data {
  province: string;
  province_total: number;
  isZhixia: number;
  city: string;
  city_total: number;
  conadd: number;
  conadd_str: string;
  econNum: number;
  sina_now_confirm: number;
  sina_loc_addconfirm: number;
  h5_url: string;
  newsId: string;
  routeUri: string;
  city_h5_url: string;
  city_newsId: string;
  city_routeUri: string;
}

export interface RootObject {
  data: Data[];
}