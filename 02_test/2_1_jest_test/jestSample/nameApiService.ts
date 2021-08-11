import axios from "axios";

// export class NameApiService {
//   private MAX_LENGTH = 4;
//   public num:number;
//   public firstName:string ='';
//   public constructor(num?:any) {
//     this.num = num;
//   }

//   public async getFirstName(): Promise<string> {
//     if(this.num == undefined){//インスタンスに引数がない場合、ランダムになる
//       const { data } = await axios.get(
//         "https://random-data-api.com/api/name/random_name"
//       );
//       this.firstName = data.first_name as string;

//     }else{//引数がある場合
//       this.firstName = 'kevin';//基本の名前。7文字
//     }
    

//     if (this.firstName.length > this.MAX_LENGTH) {
//       throw new Error("firstName is too long!");
//     }

//     return this.firstName;
//   }
// }

//デフォルト

export class NameApiService {
  private MAX_LENGTH = 4;
  public constructor() {}

  public async getFirstName(): Promise<string> {
    const { data } = await axios.get(
      "https://random-data-api.com/api/name/random_name"
    );
    const firstName = data.first_name as string;

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }

  
  public async getmaxNameLength():Promise<number>{
    return this.MAX_LENGTH;
  }
}
