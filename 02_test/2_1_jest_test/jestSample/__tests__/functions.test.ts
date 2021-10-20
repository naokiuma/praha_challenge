// todo: ここに単体テストを書いてみましょう！

import { NameApiService } from "../nameApiService";

//import { somePromise } from "../functions";
const functions = require('../functions.ts');
const Nameapi = require('../nameApiService.ts');


//問題1
test( 'test_sumOfArray' , () => {
    expect(functions.sumOfArray([5,2,2])).toBe(9);
})


test('test_sumOfArray_2',() => {
    expect(functions.sumOfArray([1,1])).toBe(2);
})

test('test_sumOfArray_3',() => {
    expect(functions.sumOfArray([])).toBe(0);
})



//問題2
test( 'test_asyncSumOfArray', () => {

    return functions.asyncSumOfArray([2,4]).then((data:number) => {
        return expect(Promise.resolve(data)).resolves.toBe(6);
    })
})



//問題3
test('asyncSumOfArraySometimesZeroのモックテスト',() => {
    const DatabaseMockeSuccess = jest.fn();//モック化
    const DatabaseMockeFaile = jest.fn();//モック化
    //理想的なメソッドをmockに追加
    //https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e

    //どんな数字が入ろうがtrueを返す
    DatabaseMockeSuccess.mockImplementationOnce( () => {
        return {
            save:():Boolean => {
                return true;
            }
        };
    })

    //どんな数字が入ろうがエラーを返す
    DatabaseMockeFaile.mockImplementationOnce( () => {
        return {
            save:():Boolean => {
                throw new Error("fail!");
            }
        };
    })

    const DataBaseSaveSuccess = new DatabaseMockeSuccess;//mockをインスタンス化
    const DataBaseSaveFaile = new DatabaseMockeFaile;//mockをインスタンス化
    expect(functions.asyncSumOfArraySometimesZero([3,5],DataBaseSaveSuccess)).resolves.toBe(8);
    expect(functions.asyncSumOfArraySometimesZero([3,5],DataBaseSaveFaile)).resolves.toStrictEqual(0);


})





//問題4
// importするモジュールを変数に割り当てる
describe('getFirstNameThrowIfLongのモック化テスト', () => {
    test('モック化できているか', () => {
        //クラス全体をmock化
        const NameApiMock = jest.fn();//mockを作成
        //mockImplementationOnce()で理想的なクラスを実装
        //mockに対して、毎回同じ値、kevinを返すようにする
        NameApiMock.mockImplementationOnce(() => {
            return {
                getFirstName:() => {
                    return 'kevin';
                }
            };
        });
        const TestNameApi = new NameApiMock;//インスタンス化
        expect(functions.getFirstNameThrowIfLong(8,TestNameApi)).resolves.toBe('kevin');
        expect(functions.getFirstNameThrowIfLong(4,TestNameApi)).rejects.toStrictEqual(new Error('first_name too long'));

    });
});




////課題クイズk-kbotさんの対象のテスト関数------------------------

test( 'test_greet' , () => {
    expect(functions.greet('tarou')).toBe("Hello tarou!!");
})


test( 'test_isPrimeNumber_1' , () => {
    expect(functions.isPrimeNumber(0)).toBe(false);
})

test( 'test_isPrimeNumber_2' , () => {
    expect(functions.isPrimeNumber(2)).toBe(true);
})



describe('zipcodeのモック化', () => {
    test('郵便番号モック化', () => {
        const zipService = jest.fn();//zipコードを返すapiをmock化
        //mockImplementationOnce()で理想的なクラスを実装
        zipService.mockImplementationOnce(() => {
            return {
                getPrefecture:(ZipNumber:number) => {
                    if(ZipNumber == 1830052){
                        return '東京都';
                    }else if(ZipNumber == 1234567){
                        return null;
                    }
                }
            };
        });
        const zipServiceInstance = new zipService;//インスタンス化
        expect(functions.whatPrefecture("1830052",zipServiceInstance)).toBe('〒1830052は東京都に存在します');
        expect(functions.whatPrefecture(1234567,zipServiceInstance)).toBe('〒1234567は存在しません');
    });
});





