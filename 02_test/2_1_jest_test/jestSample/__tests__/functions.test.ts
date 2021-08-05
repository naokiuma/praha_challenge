// todo: ここに単体テストを書いてみましょう！

import { NameApiService } from "../nameApiService";

//import { somePromise } from "../functions";
const functions = require('../functions.ts');
const Nameapi = require('../nameApiService.ts');



//練習------------------

//ここのthenにはsomePromiseの結果が渡る。それをthenで渡す。
//なお、importしたときは問題なかったが、requireされたfunctionsから呼び出すと、「data」に型を指定しないと下記のエラーとなった
//Parameter 'data' implicitly has an 'any' type.
//参考　https://awesome-linus.com/2019/11/19/typescript-curly-bracket-type-any-error/

test('test' , () => {
    return functions.somePromise('success').then((data:string) => {
        expect(data).toBe('成功しました');//ここでイコールになっているか？
    }) 
})

//resolved、rejectedでも書いてみる
test('test2',() => {
    return functions.somePromise('success').then((data:string) => {
        return expect(Promise.resolve(data)).resolves.toBe('成功しました');  
    })
})

test('test2.5',() => {
        return expect(functions.somePromise('success')).resolves.toBe('成功しました');  
   
})


//上手くいかぬ
// test('test3',() => {
//     return functions.somePromise('失敗だあ！').then((data:string) => {
//         return expect(Promise.reject(new Error('error'))).rejects.toThrow('error');
//     })
// })
//これで上手くいくのか
test('test3',() => {
    return expect(functions.somePromise('失敗だあ！')).rejects.toMatch('error');
    
})


test('greething_test',() => {
    expect(functions.greething('太郎くん')).toBe('太郎くん、こんにちは');
})




//本番------------------

//問題1
test( 'test_sumOfArray' , () => {
    expect(functions.sumOfArray([5,2,2])).toBe(9);
})

//非同期関数の場合、通常のコールバックなら引数にdoneをいれる。
//promiseを使うなら[return]がいる
//https://qiita.com/rikegami/items/178ed17982b13535ad59
//エラー例
// test( 'TestAsyncSumOfArray' , () => {
//     return expect(functions.asyncSumOfArray([5,2,2])).toBe(9);
// })

test('test_sumOfArray_2',() => {
    expect(functions.sumOfArray([1,1])).toBe(2);
})

//空の配列は渡せない
// test('test_sumOfArray_3',() => {
//     expect(functions.sumOfArray([])).toBe();
// })


//問題2
test( 'test_asyncSumOfArray', () => {
    return functions.asyncSumOfArray([2,4]).then((data:number) => {
        return expect(Promise.resolve(data)).resolves.toBe(6);
    })
})

//問題3/成功ケース
test('test_asyncSumOfArraySometimesZeroResolve',() => {
    return expect(functions.asyncSumOfArraySometimesZero([3,5])).resolves.toBe(8);

})

//問題3/失敗ケース

test('test_asyncSumOfArraySometimesZeroReject',() => {
    return expect(functions.asyncSumOfArraySometimesZero([3,5,0])).resolves.toBe(0);

})


//問題4 
test('test_getFirstNameThrowIfLong',() => {
    return expect(functions.getFirstNameThrowIfLong(3)).resolves.toBe('ok');
})

test('test_getFirstNameThrowIfLong2',() => {
    return expect(functions.getFirstNameThrowIfLong(8)).rejects.toStrictEqual(new Error('first_name too long'));
 })


 //nameapiのテスト

 test('test_nameApiTest',() => {
     let NameApi = new NameApiService(10);
     return expect(NameApi.getFirstName()).rejects.toStrictEqual(new Error('firstName is too long!'));

 })



