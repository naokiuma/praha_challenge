import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";




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




// 関数の仮引数にも受け入れる型を定義。
// {}の前にあるstringは関数の返す値の型を定義している。


//デフォルト
export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

// export const sumOfArray = (numbers: number[]): number => {
//   if(numbers.length === 0){//課題3-3に合わせ修正
//     return 0;
//   }
//   return numbers.reduce((a: number, b: number): number => a + b);
// };


//promiseを返すということ。デフォルト
export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};




//memo
//与える値がどうあれランダムで成功またはエラーになる状態のため、与えられた値によって結果を返すようにする必要がある
export const asyncSumOfArraySometimesZero = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

//デフォルト
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



//ーーーーーーーーーーーーーーーーーーーーーーーーーー
//一旦これでうまくいったぞ
//nameapiサービスで計る数字が4で固定してしまうと正確に測れない。
//そのため、apiからは名前だけ返す
export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiService:NameApiService
): Promise<string> => {

  //単純に制限の文字数を返すmock
 //const firstName = jest.fn().mockImplementation(() => 4);//スタンダードなファーストネームの数。4文字
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




