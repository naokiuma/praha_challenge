import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";






//-------------------------------------------



export const sumOfArray = (numbers: number[]): number => {
  if(numbers.length === 0){//課題3-3に合わせ修正。配列が空の場合は0を返す
    return 0;
  }
  return numbers.reduce((a: number, b: number): number => a + b);
};

//sumOfArrayのデフォルト
// export const sumOfArray = (numbers: number[]): number => {
//   return numbers.reduce((a: number, b: number): number => a + b);
// };


export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};


export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database:DatabaseMock
): Promise<number> => {
  
  return new Promise((resolve): void => {
    try {
      //const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
      //database.save(numbers);
      database.save(numbers);
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
  const firstName = await nameApiService.getFirstName();//名前を返す

  if (firstName.length > maxNameLength) {//書き換え。
    throw new Error("first_name too long");
  }
  return firstName;
};

// //デフォルトの関数は以下です
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




//課題クイズ対象の関数------------------------


//関数1
export const checkApple = (
  name:string
):string => {

  if(name === 'apple'){
    return 'りんごです';
  }else{
    return 'りんごではありません'
  }

}

//関数2
export const greething = (text: string): string => {
  return text + '、こんにちは';
};


//関数3
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



////課題クイズk-kbotさんの対象の関数------------------------


import { ZipCloudApiService } from './zipCloudClient';

export const greet = (yourName: string): string => {
  return `Hello ${yourName}!!`;
}

export const isPrimeNumber = (number: number): boolean => {
  if (number < 2) return false;
  if (number === 2) return true;

  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }

  return true;
}

export const whatPrefecture = (zipCode: string, zipCloudApiService: ZipCloudApiService): string => {
  const prefecture = zipCloudApiService.getPrefecture(zipCode);
  if (prefecture) {
    return `〒${zipCode}は${prefecture}に存在します`;
  } else {
    return `〒${zipCode}は存在しません`;
  }
}