import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";


//??
export const somePromise = (isSuccess: string) => {
  return new Promise((resolve, reject) => {
    const err = new Error('error');
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

// function todaysMeal(food: string, energy: number): string {
//   return `My ${food} has ${energy} calories`
// }

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

//promiseを返すということ。デフォルト
export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

//こういうこと？
// export const asyncSumOfArray = () => {
//   return new Promise((resolve) => {
//     resolve(sumOfArray);
//   });
// };

export const asyncSumOfArraySometimesZero = (
  numbers: number[]
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number
): Promise<string> => {
  const nameApiService = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  const firstName = await nameApiService.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
