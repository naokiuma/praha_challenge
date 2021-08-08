import axios from "axios";

export class NameApiService {
  private MAX_LENGTH = 4;  
  private nameLong;//追加

  public constructor(nameLong:number) {//コンストラクタを追加
    this.nameLong = nameLong;//追加
  }

  public async getFirstName(): Promise<string> {
    const firstName = 'kevin';//基本の名前。7文字
    if (firstName.length < this.nameLong) {
      throw new Error("firstName is too long!");
    }else{
      return 'ok';
    }

    
  }



}



//デフォルト
// import axios from "axios";

// export class NameApiService {
//   private MAX_LENGTH = 4;
//   public constructor() {}

//   public async getFirstName(): Promise<string> {
//     const { data } = await axios.get(
//       "https://random-data-api.com/api/name/random_name"
//     );
//     const firstName = data.first_name as string;

//     if (firstName.length > this.MAX_LENGTH) {
//       throw new Error("firstName is too long!");
//     }

//     return firstName;
//   }
// }
