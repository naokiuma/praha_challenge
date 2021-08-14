import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";



//-------------------------------------------ここから練習

export const somePromise = (isSuccess: string) => {
  return new Promise((resolve, reject) => {
    const err = 'error';
    const data = '成功しました';
    if(isSuccess == "success"){
      resolve(data);
    }else{
      reject(err);
    }
  });
};



export const greething = (text: string): string => {
  return text + '、こんにちは';
};



//-------------------------------------------ここから問題
//メモ

//デフォルト
// export const sumOfArray = (numbers: number[]): number => {
//   return numbers.reduce((a: number, b: number): number => a + b);
// };

export const sumOfArray = (numbers: number[]): number => {
  if(numbers.length === 0){//課題3-3に合わせ修正。配列が空の場合は0を返す
    return 0;
  }
  return numbers.reduce((a: number, b: number): number => a + b);
};


//デフォルト
export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};




//memo デフォルト
// export const asyncSumOfArraySometimesZero = (
//   numbers: number[]
// ): Promise<number> => {
//   return new Promise((resolve): void => {
//     try {
//       const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
//       database.save(numbers);
//       resolve(sumOfArray(numbers));
//     } catch (error) {
//       resolve(0);
//     }
//   });
// };

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database:any
): Promise<number> => {
  
  return new Promise((resolve): void => {
    try {
      //const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
      //database.save(numbers);
      database.save();
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};



//ーーーーーーーーーーーーーーーーーーーーーーーーーー
//
export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiService:NameApiService
): Promise<string> => {

   //const nameApiService = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  const firstName = await nameApiService.getmaxNameLength();//max文字数を返す

  if (maxNameLength > firstName) {//書き換え。
    throw new Error("first_name too long");
  }
  return 'ok';
};

// //デフォルト
// export const getFirstNameThrowIfLong = async (
//   maxNameLength: number
// ): Promise<string> => {
//   const nameApiService = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
//   const firstName = await nameApiService.getFirstName();

//   if (firstName.length > maxNameLength) {
//     throw new Error("first_name too long");
//   }
//   return firstName;
// };




