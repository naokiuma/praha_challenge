const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export class DatabaseMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //public save(_: number[]): void {
  public save(num: number[]): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしているが、これだとテストの結果が不安定になるので
    // 配列の中に0以下が入ったらエラーになるようにした
    //if (getRandomInt(10) < 2) {

    let result  = num.filter(element => element < 1);
    if(result.length > 0){//1より小さい数字が入ればエラーにする
        throw new Error("fail!");
      }
      

    }
}
