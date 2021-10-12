import axios from 'axios';

export class ZipCloudApiService {
  private END_POINT = 'https://zipcloud.ibsnet.co.jp/api/search';

  public async getPrefecture(zipCode: string): Promise<string> {
    if (!zipCode.match(/\d{7}/)) throw new Error('郵便番号はハイフンを除く数字7桁で入力してください。');

    const { data } = await axios.get(`${this.END_POINT}?zipcode=${zipCode}`);
    return data['results'][0]['address1'];
  }
}