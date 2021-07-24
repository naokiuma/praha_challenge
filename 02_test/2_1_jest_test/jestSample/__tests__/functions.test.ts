
// todo: ここに単体テストを書いてみましょう！

//import { somePromise } from "../functions";
const functions = require('../functions.ts');

test( 'test1' , () => {
    expect(functions.sumOfArray([5,2,2])).toBe(9);
})

// test('greethingTest',() => {
//     expect(functions.)
// })



//非同期関数の場合、通常のコールバックなら引数にdoneをいれる。
//promiseを使うなら[return]がいる
//https://qiita.com/rikegami/items/178ed17982b13535ad59
//エラー例
test( 'test2' , () => {
    return expect(functions.asyncSumOfArray([5,2,2])).toBe(9);
})

test('test3' , () => {
    //ここのthenにはsomePromiseの結果が渡る。それをthenで渡す。
    //なお、importしたときは問題なかったが、requireされたfunctionsから呼び出すと、「data」に型を指定しないと下記のエラーとなった
    //Parameter 'data' implicitly has an 'any' type.
    //参考　https://awesome-linus.com/2019/11/19/typescript-curly-bracket-type-any-error/

    return functions.somePromise('success').then((data:string) => {
        expect(data).toBe('成功しました');//ここでイコールになっているか？
    })
})


test('greething_test',() => {
    expect(functions.greething('太郎くん')).toBe('太郎くん、こんにちは');
})