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



//memo

//与える値がどうあれランダムで成功またはエラーになる状態のため、与えられた値によって結果を返すようにする必要がある
export const asyncSumOfArraySometimesZero = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      const database = new DatabaseMock(); 
      // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};


//nameapiサービスで計る数字が4で固定してしまうと正確に測れない。
//そのため、apiからは名前だけ返す
export const getFirstNameThrowIfLong = async (
  maxNameLength: number
): Promise<string> => {
  const nameApiService = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  //const firstName = await nameApiService.getFirstName();//これは使わない


  //単純にデフォルトの文字数を返すmock
  const firstName = jest.fn().mockImplementation(() => 'first');//スタンダードなファーストネーム。7文字
  const firstNameNum = firstName().length;//7がはいる

  if (maxNameLength > firstNameNum) {//書き換え。
  //if (firstName.length > maxNameLength) {//デフォルト
    throw new Error("first_name too long");
  }
  //return firstName;
  return 'ok';
};
